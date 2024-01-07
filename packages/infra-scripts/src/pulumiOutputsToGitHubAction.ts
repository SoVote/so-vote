import InfraConfig from "./InfraConfig";
import { exec } from "shelljs";

export const pulumiOutputsToGitHubAction = (config: InfraConfig) => {
  if (config.outputs){
    console.log('Outputting Pulumi outputs from the step')
    const pulumiOutputs = JSON.parse(exec('pulumi stack output --json'))
    config.outputs.forEach((output) => {
      const value = pulumiOutputs[output.pulumiOutputKey]
      if (typeof value === 'undefined') throw new Error(`Missing output. Service configuration specifies there should be a pulumi output "${output.pulumiOutputKey}" but it was not found in: ${JSON.stringify(pulumiOutputs, null, 2)}`)
      const exportLine = `${output.githubOutputKey}=${value}`
      console.log(`Outputting: ${exportLine}`)
      exec(`echo "${exportLine}" >> ${process.env.GITHUB_OUTPUT}`)
    })
  }
}