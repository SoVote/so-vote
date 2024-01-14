import { Command } from "commander";
import { exec, set } from "shelljs";
import { pulumiOutputsToGitHubAction } from "./utils/pulumiOutputsToGitHubAction";
import { logTroubleshootingInfo } from "./utils/logTroubleshootingInfo";
import { getBranch } from "./utils/getBranch";
import { getPulumiOutputs } from "./utils/getPulumiOutputs";

export const defineGlobalDeployScript = (program: Command) => {
  program.command('deploy-global')
    .option('--config', 'The path to the config file', 'infra.config.json')
    .option('--troubleshoot', 'Runs the script in troubleshooting mode', false)
    .action(async (options) => {
      set('-e')
      if (options.troubleshoot) logTroubleshootingInfo()
      const branch = getBranch()
      const isMain = branch !== 'main'
      console.log(`${isMain ? 'Deploying' : 'Previewing'} global infrastructure`)
      exec(`pulumi stack select global -c`)
      if(isMain){
        exec('pulumi up --yes')
      } else {
        exec('pulumi preview')
      }
      pulumiOutputsToGitHubAction(getPulumiOutputs())
      console.log('Done')
    })
}