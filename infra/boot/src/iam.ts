import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi'

const resourcePrefix = 'rh-boot'

const oidcIamProvider = new aws.iam.OpenIdConnectProvider(`${resourcePrefix}-gh-actions-oidc-iam-provider`, {
  clientIdLists: ['sts.amazonaws.com'],
  thumbprintLists: ['ffffffffffffffffffffffffffffffffffffffff'],
  url: 'https://token.actions.githubusercontent.com',
});


export const ghActionsRole = new aws.iam.Role(`${resourcePrefix}-gh-actions-role`, {
  assumeRolePolicy: JSON.stringify({
    'Statement': [
      {
        Action: 'sts:AssumeRoleWithWebIdentity',
        Condition: {
          StringEquals: {
            'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com'
          },
          StringLike: {
            'token.actions.githubusercontent.com:sub': 'repo:SoVote/so-vote:*'
          }
        },
        Effect: 'Allow',
        Principal: {
          Federated: 'arn:aws:iam::519396255280:oidc-provider/token.actions.githubusercontent.com'
        }
      }
    ],
    'Version': '2008-10-17'
  }),
  inlinePolicies: [{
    name: 'github-actions-deploy-policy',
    policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Action: [
            's3:*',
            'iam:*',
            'logs:*',
            'lambda:*',
            'ses:*',
            'route53:*',
            'acm:*',
            'route53:*',
            'dynamodb:*',
            'cloudfront:*',
            'sqs:*',
            'ssm:*'
          ],
          Effect: 'Allow',
          Resource: '*',
          Sid: ''
        }
      ]
    }),
  }],
});
