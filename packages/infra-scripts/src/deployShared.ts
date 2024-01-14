import { Command } from "commander";
import { exec, set } from "shelljs";
import { pulumiOutputsToGitHubAction } from "./pulumiOutputsToGitHubAction";
import { logTroubleshootingInfo } from "./utils/logTroubleshootingInfo";
import { getBranch } from "./utils/getBranch";

export const defineSharedDeployScript = (program: Command) => {
  program.command('deploy-shared')
    .option('--config', 'The path to the config file', 'infra.config.json')
    .option('--troubleshoot', 'Runs the script in troubleshooting mode', false)
    .action(async (options) => {
      set('-e')
      if (options.troubleshoot) logTroubleshootingInfo()
      const branch = getBranch()
      const isMain = branch !== 'main'
      console.log(`${isMain ? 'Deploying' : 'Previewing'} shared infrastructure`)
      const stack = branch === 'main' ? `prod-shared` : `dev-shared`
      exec(`pulumi stack select ${stack} -c`)
      exec(`pulumi config set branch-name "${branch}"`)
      if(isMain){
        exec('pulumi up --yes')
      } else {
        exec('pulumi preview')
      }
      pulumiOutputsToGitHubAction()
      console.log('Done')
    })
}