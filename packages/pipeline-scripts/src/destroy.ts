import { Command } from "commander";
import { exec, set } from "shelljs";
import { getServiceName } from "./utils/getServiceName";
import { logTroubleshootingInfo } from "./utils/logTroubleshootingInfo";

export const defineDestroyScript = (program: Command) => {
  program.command('destroy')
  .option('--config', 'The path to the config file', 'infra.config.json')
  .option('--troubleshoot', 'Runs the script in troubleshooting mode', false)
  .action(async (options) => {
    set('-e')
    if (options.troubleshoot) logTroubleshootingInfo()
    let branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME
    let prNumber = process.env.PR_NUMBER
    if (process.env.CI !== 'true') {
      branch = exec('git rev-parse --abbrev-ref HEAD')

      if(!prNumber) throw new Error('Missing required PR_NUMBER env var when running locally')
      //TODO: Find PR number by querying the GitHub API
    }
    const serviceName = await getServiceName()
    console.log(`Destroying ${serviceName}`)
    if (!branch) throw new Error('Current branch is not specified')
    if (branch !== 'main' && !prNumber) throw new Error('PR number is required to destroy non-prod envs')
    const stack = branch === 'main' ? `prod-${serviceName}` : `dev-${prNumber}-${serviceName}`
    exec(`pulumi stack select ${stack} -c`)
    exec(`pulumi config set branch-name "${branch}"`)
    exec(`pulumi config set pr-number "${prNumber}"`)
    exec('pulumi down --yes --remove')
    console.log('Done')
  })
}