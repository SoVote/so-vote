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
      const isMain = branch !== 'main'
      console.log(`${isMain ? 'Deploying' : 'Previewing'} global infrastructure`)
      if (options.troubleshoot){
        console.log('Where we are:')
        exec('pwd')
      }
      exec(`pulumi stack select global -c`)
      if(isMain){
        exec('pulumi up --yes')
      } else {
        exec('pulumi preview')
      }
      pulumiOutputsToGitHubAction()
      console.log('Done')
    })
}