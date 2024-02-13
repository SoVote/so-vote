import * as aws from "@pulumi/aws";
import * as pulumi from '@pulumi/pulumi';
import {lambdaLogGroup} from "./cloudwatch";
import {resourcePrefix} from "./variables";

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
      policy: JSON.stringify({
        Version: "2012-10-17",
      })
    },
  ]
});

export const authApiLambdaRolePolicy = new aws.iam.RolePolicy(`${resourcePrefix}-api-lambda-role-policy`, {
  role: authApiLambdaRole.id,
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
});