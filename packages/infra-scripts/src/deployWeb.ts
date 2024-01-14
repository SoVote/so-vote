import { Command } from "commander";
import { exec, set } from "shelljs";
import { getServiceName } from "./utils/getServiceName";
import { pulumiOutputsToGitHubAction } from "./utils/pulumiOutputsToGitHubAction";
import { logTroubleshootingInfo } from "./utils/logTroubleshootingInfo";
import { getBranch } from "./utils/getBranch";
import { getPrNumber } from "./utils/getPrNumber";
import { getPulumiOutputs } from "./utils/getPulumiOutputs";

export const defineDeployWebScript = (program: Command) => {
  program.command('deploy-web')
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
    exec('pulumi up --yes')

    const plOutputs = getPulumiOutputs()

    // Assets
    console.log(`Clearing assets from Web S3 asset bucket ${plOutputs.WEB_ASSETS_BUCKET}`)
    exec(`aws s3 rm "s3://${plOutputs.WEB_ASSETS_BUCKET}/" --recursive`)

    console.log(`Uploading static assets to Web S3 asset bucket ${plOutputs.WEB_ASSETS_BUCKET}`)
    exec(`aws s3 cp "../code/.open-next/assets" "s3://${plOutputs.WEB_ASSETS_BUCKET}" --recursive`)

    // Cache
    console.log(`Clearing cached files from Web S3 cache bucket ${plOutputs.WEB_CACHE_BUCKET}`)
    exec(`aws s3 rm "s3://${plOutputs.WEB_CACHE_BUCKET}/" --recursive`)

    console.log(`Uploading cached files to Web S3 cache bucket ${plOutputs.WEB_CACHE_BUCKET}`)
    exec(`aws s3 cp "../code/.open-next/cache" "s3://${plOutputs.WEB_CACHE_BUCKET}" --recursive`)

    // Public images
    console.log(`Clearing cached files from Web S3 cache bucket ${plOutputs.WEB_IMAGE_BUCKET}`)
    exec(`aws s3 rm "s3://${plOutputs.WEB_IMAGE_BUCKET}/" --recursive`)

    console.log(`Uploading public files to Web S3 images bucket ${plOutputs.WEB_IMAGE_BUCKET}`)
    exec(`aws s3 cp "../code/public/images" "s3://${plOutputs.WEB_IMAGE_BUCKET}/images" --recursive`)

    // Invalidate Cache
    console.log(`Invalidating CF (${plOutputs.WEB_CLOUDFRONT_ID}) cache...`)
    exec(`aws cloudfront create-invalidation --distribution-id "${plOutputs.WEB_CLOUDFRONT_ID}" --paths "/*"`)


    pulumiOutputsToGitHubAction(getPulumiOutputs())

    console.log('Done')
  })
}