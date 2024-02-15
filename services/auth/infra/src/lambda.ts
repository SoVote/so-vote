import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import {authApiLambdaRole} from "./iam";
import { resourcePrefix, authApiSuffix } from "./variables";

const authCode = new pulumi.asset.AssetArchive({
  '.': new pulumi.asset.FileArchive('../code/dist'),
})

const authApiLambdaName = `${resourcePrefix}${authApiSuffix}`
export const authApiLambda = new aws.lambda.Function(authApiLambdaName, {
  name: authApiLambdaName,
  architectures: ["x86_64"],
  environment: {
    variables: {
      BRANCH: process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || '',
      PR_NUMBER: process.env.PR_NUMBER || ''
    },
  },
  ephemeralStorage: {
    size: 512,
  },
  handler: "api.handle",
  packageType: "Zip",
  role: authApiLambdaRole.arn,
  runtime: "nodejs18.x",
  code: authCode,
  timeout: 25,
  tracingConfig: {
    mode: "PassThrough",
  },
});

