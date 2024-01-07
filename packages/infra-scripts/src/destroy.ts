import { Command } from "commander";
import { exec, set } from "shelljs";
import fs from "fs/promises";
import InfraConfig from "./InfraConfig";

export const defineDestroyScript = (program: Command) => {
  program.command('destroy')
  .option('--config', 'The path to the config file', 'service.config.json')
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
    console.log(`Destroying with config: ${JSON.stringify(config)}`)
    if (options.troubleshoot){
      console.log('Where we are:')
      exec('pwd')
      console.log('Code directory contains:')
      exec('find ../code')
    }
    if (!branch) throw new Error('Current branch is not specified')
    if (branch !== 'main' && !process.env.PR_NUMBER) throw new Error('PR number is required to destroy non-prod envs')
    const stack = branch === 'main' ? `prod-${config.name}-service` : `dev-${process.env.PR_NUMBER}-${config.name}-service`
    exec(`pulumi stack select ${stack} -c`)
    exec(`pulumi config set branch-name "${branch}"`)
    exec(`pulumi config set pr-number "${process.env.PR_NUMBER}"`)
    exec('pulumi down --yes --remove')
    console.log('Done')
  })
}