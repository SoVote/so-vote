import * as aws from "@pulumi/aws";
import * as pulumi from '@pulumi/pulumi';
import {lambdaLogGroup} from "./cloudwatch";
import { accountNumber, isMain, resourcePrefix } from "./variables";

export const authApiLambdaRole = new aws.iam.Role(`${resourcePrefix}-api-lambda-role`, {
  assumeRolePolicy: {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          Service: 'lambda.amazonaws.com'
        },
        Action: 'sts:AssumeRole'
      }
    ]
  },
  inlinePolicies: [
    {
      name: 'logs',
      policy: lambdaLogGroup.arn.apply(arn => JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Action: [
              "logs:CreateLogGroup",
              "logs:CreateLogStream",
              "logs:PutLogEvents",
            ],
            Effect: "Allow",
            Resource: [
              arn,
              `${arn}*`
            ]
          },
        ],
      })),
    },
    {
      name: 'ses',
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Action: [
              "ses:SendEmail",
            ],
            Effect: "Allow",
            Resource: [
              `arn:aws:ses:eu-west-1:${accountNumber}:identity/*`
            ]
          },
        ],
      }),
    },
    {
      name: 'ssm',
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Action: [
              "ssm:GetParameter",
            ],
            Effect: "Allow",
            Resource: [
              `arn:aws:ssm:eu-west-1:${accountNumber}:parameter/rh-shared-${isMain ? 'prod' : 'dev'}-auth-secret`
            ]
          },
        ],
      }),
    },
  ]
});
//
// export const authApiLambdaRolePolicy = new aws.iam.RolePolicy(`${resourcePrefix}-api-lambda-role-policy`, {
//   role: authApiLambdaRole.id,
//   policy:
// });