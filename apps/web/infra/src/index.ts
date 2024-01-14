import * as cf from './cloudfront'
export * as lambda from './lambda'
import * as s3 from './s3'
export * as s3BucketPolicy from './s3BucketPolicy'
export * as dynamoDb from './dynamoDb'
export * as route53 from './route53'

export const WEB_ASSETS_BUCKET = s3.webAssetsBucket.bucket
export const WEB_CACHE_BUCKET = s3.webCacheBucket.bucket
export const WEB_IMAGE_BUCKET = s3.webImageBucket.bucket

export const WEB_CLOUDFRONT_ID = cf.webDistribution.id