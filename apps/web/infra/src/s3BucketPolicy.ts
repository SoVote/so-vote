import * as pulumi from '@pulumi/pulumi';
import { BucketPolicy } from "@pulumi/aws/s3";
import { webAssetsBucket } from "./s3";
import { webDistribution } from "./cloudfront";
import {resourcePrefix} from "./variables";


export const webBucketPolicy = new BucketPolicy(`${resourcePrefix}-bucket-policy`, {
  bucket: webAssetsBucket.id,
  policy: {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          Service: 'cloudfront.amazonaws.com',
        },
        Action: 's3:GetObject',
        Resource: [
          webAssetsBucket.arn,
          pulumi.interpolate`${webAssetsBucket.arn}/*`
        ],
        'Condition': {
          'StringEquals': {
            'AWS:SourceArn': webDistribution.arn
          }
        }
      }
    ]
  }
})
