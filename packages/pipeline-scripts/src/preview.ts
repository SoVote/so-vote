import { Command } from "commander";
import { exec, set } from "shelljs";
import { pulumiOutputsToGitHubAction } from "./utils/pulumiOutputsToGitHubAction";
import { getServiceName } from "./utils/getServiceName";
import { logTroubleshootingInfo } from "./utils/logTroubleshootingInfo";
import { getBranch } from "./utils/getBranch";
import { getPrNumber } from "./utils/getPrNumber";
import { getPulumiOutputs } from "./utils/getPulumiOutputs";

export const definePreviewScript = (program: Command) => {
  program.command('preview')
    .option('--config', 'The path to the config file', 'infra.config.json')
    .option('--troubleshoot', 'Runs the script in troubleshooting mode', false)
    .action(async (options) => {
      set('-e')
      if (options.troubleshoot) logTroubleshootingInfo()
      const branch = getBranch()
      const prNumber = getPrNumber()
      const serviceName = await getServiceName()
      console.log(`Deploying ${serviceName}`)
      if (!branch) throw new Error('Current branch is not specified')
      if (branch !== 'main' && !prNumber) throw new Error('PR number is required to deploy non-prod envs')
      const stack = branch === 'main' ? `prod-${serviceName}` : `dev-${prNumber}-${serviceName}`
      exec(`pulumi stack select ${stack} -c`)
      exec(`pulumi config set branch-name "${branch}"`)
      exec(`pulumi config set pr-number "${prNumber}"`)
      exec('pulumi preview --diff')
      pulumiOutputsToGitHubAction(getPulumiOutputs())
      console.log('Done')
    })
}