import { Command } from "commander";
import { set } from "shelljs";
import { getServiceName } from "./utils/getServiceName";
import { getBranch } from "./utils/getBranch";
import { getPrNumber } from "./utils/getPrNumber";
import fs from "fs";

export const defineGenerateWebEnvVarsScript = (program: Command) => {
  program.command('generate-web-env-vars')
  .action(async () => {
    set('-e')
    const branch = getBranch()
    const prNumber = getPrNumber()
    console.log(`Generating web app environment variables`)
    const envVars = [
      `NEXT_PUBLIC_ENVIRONMENT=${branch === 'main' ? 'prod' : 'dev'}`,
      `NEXT_PUBLIC_BRANCH=${branch}`,
      `NEXT_PUBLIC_PR_NUMBER=${prNumber}`
    ]
    fs.writeFileSync('.env', envVars.join('\r\n'))
    console.log('Done')
  })
}