import { Command } from "commander";
import { exec, set } from "shelljs";
import { pulumiOutputsToGitHubAction } from "./pulumiOutputsToGitHubAction";
import { getServiceName } from "./getServiceName";

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
      console.log(`Deploying global infrastructure`)
      if (options.troubleshoot){
        console.log('Where we are:')
        exec('pwd')
      }
      exec(`pulumi stack select global -c`)
      exec('pulumi up --yes')
      pulumiOutputsToGitHubAction()
      console.log('Done')
    })
}