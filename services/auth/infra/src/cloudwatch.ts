import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { resourcePrefix, authApiSuffix } from "./variables";

export const lambdaLogGroup = new aws.cloudwatch.LogGroup(`${resourcePrefix}${authApiSuffix}`, {
  name: pulumi.interpolate`/aws/lambda/${resourcePrefix}${authApiSuffix}`,
  retentionInDays: 90,
});
