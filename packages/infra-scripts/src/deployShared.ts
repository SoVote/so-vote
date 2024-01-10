import { Command } from "commander";
import { exec, set } from "shelljs";
import { pulumiOutputsToGitHubAction } from "./pulumiOutputsToGitHubAction";
import { getServiceName } from "./getServiceName";

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
      if(branch !== 'main'){
        throw new Error(`Shared infrastructure can only be deployed from main branch but current is "${branch}"`)
      }
      console.log(`Deploying shared infrastructure`)
      if (options.troubleshoot){
        console.log('Where we are:')
        exec('pwd')
      }
      const stack = branch === 'main' ? `prod-shared` : `dev-shared`
      exec(`pulumi stack select ${stack} -c`)
      exec(`pulumi config set branch-name "${branch}"`)
      exec('pulumi up --yes')
      pulumiOutputsToGitHubAction()
      console.log('Done')
    })
}