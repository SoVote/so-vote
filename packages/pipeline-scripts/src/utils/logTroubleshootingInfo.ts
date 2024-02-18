import { exec } from "shelljs";

export const logTroubleshootingInfo = () => {
  console.log('Exports:')
  exec('export')
  console.log('Where we are:')
  exec('pwd')
  // console.log('Code directory contains:')
  // exec('find ../code')
  console.log('Pulumi stacks:')
  exec('pulumi stack ls -a')
}