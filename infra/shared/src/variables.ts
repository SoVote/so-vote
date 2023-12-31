import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
export const branchName = config.require('branch-name')

export const isMain = branchName === 'main'

export const sharedResourcePrefix = `rh-shared-${isMain ? 'prod' : `dev`}`
