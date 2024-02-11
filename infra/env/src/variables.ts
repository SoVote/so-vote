import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
export const branchName = config.require('branch-name')
export const isMain = branchName === 'main'
export const prNumber = config.require('pr-number')
export const resourcePrefix = `rh-${isMain ? 'main' : `pr-${prNumber}`}-env`
