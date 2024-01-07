import { Command } from "commander";
import { exec, set } from "shelljs";
import fs from "fs/promises";
import InfraConfig from "./InfraConfig";
import { pulumiOutputsToGitHubAction } from "./pulumiOutputsToGitHubAction";

export const defineGlobalDeployScript = (program: Command) => {
  program.command('deploy-global')
    .option('--config', 'The path to the config file', 'infra.config.json')
    .option('--troubleshoot', 'Runs the script in troubleshooting mode', false)
    .action(async (options) => {
      set('-e')
      if (options.troubleshoot) exec('export')
      let branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME
      if (process.env.CI !== 'true') {
        branch = exec('git rev-parse --abbrev-ref HEAD')
      }
      if(branch !== 'main'){
        throw new Error(`Global infrastructure can only be deployed from main branch but current is "${branch}"`)
      }
      const configString = await fs.readFile(`./${options.config}`, 'utf-8')
      const config = JSON.parse(configString) as InfraConfig;
      console.log(`Deploying with config: ${JSON.stringify(config)}`)
      if (options.troubleshoot){
        console.log('Where we are:')
        exec('pwd')
      }
      exec(`pulumi stack select ${config.name} -c`)
      exec('pulumi up --yes')
      pulumiOutputsToGitHubAction(config)
      console.log('Done')
    })
}