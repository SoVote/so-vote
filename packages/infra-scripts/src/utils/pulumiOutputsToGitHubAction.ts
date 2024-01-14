import { exec } from "shelljs";

export const pulumiOutputsToGitHubAction = (pulumiOutputs: { [key: string]: unknown }) => {
  console.log('Outputting Pulumi outputs from the step')
  // Output all pulumi outputs to the github actions output
  console.log(`Outputting: ${JSON.stringify(pulumiOutputs, null, 2)}`)
  Object.entries(pulumiOutputs).forEach(([key, value]) => {
    exec(`echo "${key}=${value}" >> ${process.env.GITHUB_OUTPUT}`)
  })
}