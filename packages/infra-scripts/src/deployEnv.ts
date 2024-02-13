import { Command } from "commander";
import { set } from "shelljs";

export const defineDeployEnvScript = (program: Command) => {
  program.command('deploy-env')
  .option('--config', 'The path to the config file', 'infra.config.json')
  .option('--troubleshoot', 'Runs the script in troubleshooting mode', false)
  .action(async (options) => {
    set('-e')

  })
}