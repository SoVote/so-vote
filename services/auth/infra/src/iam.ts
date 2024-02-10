import * as aws from "@pulumi/aws";
import * as pulumi from '@pulumi/pulumi';
import {lambdaLogGroup} from "./cloudwatch";
import {resourcePrefix} from "./variables";

export const userApiLambdaRole = new aws.iam.Role(`${resourcePrefix}-api-lambda-role`, {
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

export const userApiLambdaRolePolicy = new aws.iam.RolePolicy(`${resourcePrefix}-api-lambda-role-policy`, {
  role: userApiLambdaRole.id,
  policy: JSON.stringify({
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
          lambdaLogGroup.arn.apply(arn => arn),
          lambdaLogGroup.arn.apply(arn => `${arn}/*`)
        ]
      },
    ],
  }),
});