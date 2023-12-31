import * as aws from "@pulumi/aws";

export const globalProvider = new aws.Provider('global-provider', { region: 'us-east-1' })
