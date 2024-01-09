import { Command } from "commander";
import { exec, set } from "shelljs";
import fs from "fs/promises";
import InfraConfig from "./InfraConfig";
import { pulumiOutputsToGitHubAction } from "./pulumiOutputsToGitHubAction";

export const defineSharedDeployScript = (program: Command) => {
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
      const stack = branch === 'main' ? `prod-${config.name}` : `dev-${config.name}`
      exec(`pulumi stack select ${stack} -c`)
      exec(`pulumi config set branch-name "${branch}"`)
      exec('pulumi up --yes')
      pulumiOutputsToGitHubAction(config)
      console.log('Done')
    })
}