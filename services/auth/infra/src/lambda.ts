import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import {userApiLambdaRole} from "./iam";
import { resourcePrefix, authApiSuffix } from "./variables";

const authCode = new pulumi.asset.AssetArchive({
  '.': new pulumi.asset.FileArchive('../../services/auth/code/dist'),
})

export const authApiLambda = new aws.lambda.Function(`${resourcePrefix}${authApiSuffix}`, {
  architectures: ["x86_64"],
  environment: {
    variables: { },
  },
  ephemeralStorage: {
    size: 512,
  },
  handler: "api.handle",
  packageType: "Zip",
  role: userApiLambdaRole.arn,
  runtime: "nodejs18.x",
  code: authCode,
  timeout: 25,
  tracingConfig: {
    mode: "PassThrough",
  },
});

