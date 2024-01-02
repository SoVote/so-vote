#!/usr/bin/env node

import { Command } from 'commander'
import { exec, pwd, ls, set, env } from 'shelljs'
import fs from 'fs/promises'
import ServiceDeploymentConfig from "./ServiceDeploymentConfig";

const program = new Command()

program
  .name('service-deployment')
  .description('Deploys a service')

program.command('deploy')
  .option('--config', 'The path to the config file', 'service.config.json')
  .action(async (options) => {
    set('-e')
    exec('export')
    let branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME
    if (process.env.CI !== 'true') {
      branch = exec('git rev-parse --abbrev-ref HEAD')
    }
    env['PULUMI_CONFIG_PASSPHRASE'] = ''
    const configString = await fs.readFile(`./${options.config}`, 'utf-8')
    const config = JSON.parse(configString) as ServiceDeploymentConfig;
    console.log(`Deploying with config: ${JSON.stringify(config)}`)
    if (!branch) throw new Error('Current branch is not specified')
    if (branch !== 'main' && !process.env.PR_NUMBER) throw new Error('PR number is required to deploy non-prod envs')
    const stack = branch === 'main' ? `prod-${config.name}-service` : `dev-${process.env.PR_NUMBER}-${config.name}-service`
    exec(`pulumi stack select ${stack} -c`)
    exec(`pulumi config set branch-name "${branch}"`)
    exec(`pulumi config set pr-number "${process.env.PR_NUMBER}"`)
    exec('pulumi up --yes')
    if (config.outputs){
      console.log('Outputting Pulumi outputs from the step')
      const pulumiOutputs = JSON.parse(exec('pulumi stack output --json'))
      config.outputs.forEach((output) => {
        const value = pulumiOutputs[output.githubOutputKey]
        if (!value) throw new Error(`Missing output. Service configuration specifies there should be a pulumi output ${output.pulumiOutputKey} but it was not found in: ${JSON.stringify(pulumiOutputs, null, 2)}`)
        const exportLine = `${output.githubOutputKey}=${value}`
        console.log(`Outputting: ${exportLine}`)
        exec(`echo "${exportLine}" >> ${process.env.GITHUB_OUTPUT}`)
      })
    }
    console.log('Done')
  })

program.parse()


// const { Command } = require('commander');
// const program = new Command();
//
// program
//   .name('string-util')
//   .description('CLI to some JavaScript string utilities')
//   .version('0.8.0');
//
// program.command('split')
//   .description('Split a string into substrings and display as an array')
//   .argument('<string>', 'string to split')
//   .option('--first', 'display just the first substring')
//   .option('-s, --separator <char>', 'separator character', ',')
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });
//
// program.parse();