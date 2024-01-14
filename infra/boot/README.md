# Boot

Creates the bare minimum resources to get a pipeline set up and deploying

## Usage
With a working pulumi setup. Run:

1. `pulumi stack select boot -c`
2. `pulumi up --yes`
3. `pulumi stack output GH_ACTIONS_ROLE_ARN` - make a note of this value
4. In your browser navigate to `https://github.com/[YOUR_ORG]/[YOUR_REPO]/settings/secrets/actions` and create a repo secret with key `GH_ACTIONS_ROLE_ARN` and value from the previous step
5. Create a PR and that will kick off the pipeline

## Currently
* Creates the IAM Role that is used by GitHub actions to deploy

## Roadmap
* Create the Pulumi state s3 bucket (?)
* Script that
  * Adds the Role ARN to the GitHub repo Action secrets