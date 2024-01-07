import { Command } from "commander";
import { exec, set } from "shelljs";
import fs from "fs/promises";
import InfraConfig from "./InfraConfig";

export const defineDeployScript = (program: Command) => {
  program.command('deploy-shared')
    .option('--config', 'The path to the config file', 'infra.config.json')
    .option('--troubleshoot', 'Runs the script in troubleshooting mode', false)
    .action(async (options) => {
      set('-e')
      if (options.troubleshoot) exec('export')
      let branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME
      if (process.env.CI !== 'true') {
        branch = exec('git rev-parse --abbrev-ref HEAD')
      }
      const configString = await fs.readFile(`./${options.config}`, 'utf-8')
      const config = JSON.parse(configString) as InfraConfig;
      console.log(`Deploying shared infra with config: ${JSON.stringify(config)}`)
      if (options.troubleshoot){
        console.log('Where we are:')
        exec('pwd')
      }
      if (!branch) throw new Error('Current branch is not specified')
      if (branch !== 'main' && !process.env.PR_NUMBER) throw new Error('PR number is required to deploy non-prod envs')
      const stack = branch === 'main' ? `prod-${config.name}` : `dev-${config.name}`
      exec(`pulumi stack select ${stack} -c`)
      exec(`pulumi config set branch-name "${branch}"`)
      exec('pulumi up --yes')
      if (config.outputs){
        console.log('Outputting Pulumi outputs from the step')
        const pulumiOutputs = JSON.parse(exec('pulumi stack output --json'))
        config.outputs.forEach((output) => {
          const value = pulumiOutputs[output.pulumiOutputKey]
          if (typeof value === 'undefined') throw new Error(`Missing output. Service configuration specifies there should be a pulumi output "${output.pulumiOutputKey}" but it was not found in: ${JSON.stringify(pulumiOutputs, null, 2)}`)
          const exportLine = `${output.githubOutputKey}=${value}`
          console.log(`Outputting: ${exportLine}`)
          exec(`echo "${exportLine}" >> ${process.env.GITHUB_OUTPUT}`)
        })
      }
      console.log('Done')
    })
}