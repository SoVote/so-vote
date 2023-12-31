import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
export const branchName = config.require('branch-name')
export const isMain = branchName === 'main'
export const prNumber = config.require('pr-number')
export const resourcePrefix = `rh-${isMain ? 'main' : `pr-${prNumber}`}-web`
export const webDomain = isMain ? 'sovote.com' : `dev-${prNumber}.sovote.com`
export const envResourcePrefix = `rh-${isMain ? 'main' : `pr-${prNumber}`}`