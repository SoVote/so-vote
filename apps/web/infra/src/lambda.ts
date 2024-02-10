import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { resourcePrefix, webDomain } from "./variables";
import {webCacheBucket, webImageBucket} from "./s3";
import {webCacheRevalidationQueue} from "./sqs";
import {webCacheRevalidationTable} from "./dynamoDb";
import { globalProvider } from "./providers";

export const webLambdaRole = new aws.iam.Role(`${resourcePrefix}-lambda-role`, {
  assumeRolePolicy: {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          Service: 'lambda.amazonaws.com'
        },
        Action: 'sts:AssumeRole',
      },
    ],
  },
});


const webServerLambdaName = `${resourcePrefix}-server`
export const webServerLambda = new aws.lambda.Function(webServerLambdaName, {
  name: webServerLambdaName,
  description: 'Server Lambda for Next CloudFront distribution',
  role: webLambdaRole.arn,
  architectures: ['arm64'],
  handler: 'index.handler',
  runtime: 'nodejs18.x',
  memorySize: 1024,
  timeout: 10,
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive('../code/.open-next/server-function'),
  }),
  environment: {
    variables: {
      CACHE_BUCKET_NAME: webCacheBucket.bucket,
      CACHE_BUCKET_REGION: webCacheBucket.region,
      REVALIDATION_QUEUE_URL: webCacheRevalidationQueue.url,
      REVALIDATION_QUEUE_REGION: webCacheBucket.region,
      CACHE_DYNAMO_TABLE: webCacheRevalidationTable.name,
    }
  }
});

export const webServerLambdaUrl = new aws.lambda.FunctionUrl(`${resourcePrefix}-server-url`, {
  functionName: webServerLambda.name,
  authorizationType: 'NONE',
})


const webImageOptimizationLambdaName = `${resourcePrefix}-image-optimization`
export const webImageOptimizationLambda = new aws.lambda.Function(webImageOptimizationLambdaName, {
  name: webImageOptimizationLambdaName,
  description: 'Image Lambda for Next CloudFront distribution',
  role: webLambdaRole.arn,
  architectures: ['arm64'],
  handler: 'index.handler',
  runtime: 'nodejs18.x',
  memorySize: 1024,
  timeout: 10,
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive('../code/.open-next/image-optimization-function'),
  }),
  environment: {
    variables: {
      'BUCKET_NAME': webImageBucket.bucket
    }
  }
});

export const webImageOptimisationLambdaUrl = new aws.lambda.FunctionUrl(`${resourcePrefix}-default-url`, {
  functionName: webImageOptimizationLambda.name,
  authorizationType: 'NONE',
})


const webCacheRevalidationLambdaName = `${resourcePrefix}-cache-revalidation`
export const webCacheRevalidationLambda = new aws.lambda.Function(webCacheRevalidationLambdaName, {
  name: webCacheRevalidationLambdaName,
  description: 'Lambda to revalidate the cache',
  role: webLambdaRole.arn,
  architectures: ['arm64'],
  handler: 'index.handler',
  runtime: 'nodejs18.x',
  memorySize: 512,
  timeout: 10,
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive('../code/.open-next/revalidation-function'),
  }),
});
export const webCacheRevalidationLambdaMapping = new aws.lambda.EventSourceMapping(`${resourcePrefix}-cache-revalidation-mapping`, {
  functionName: webCacheRevalidationLambda.arn,
  eventSourceArn: webCacheRevalidationQueue.arn,
  batchSize: 10, // Adjust as needed
});


export const webWarmerLambda = new aws.lambda.Function(`${resourcePrefix}-lambda-warmer`, {
  description: 'Lambda to warm the lambda',
  role: webLambdaRole.arn,
  architectures: ['arm64'],
  handler: 'index.handler',
  runtime: 'nodejs18.x',
  memorySize: 512,
  timeout: 10,
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive('../code/.open-next/warmer-function'),
  }),
  environment: {
    variables: {
      FUNCTION_NAME: webServerLambda.name,
      CONCURRENCY: '1'
    }
  }
});

// TODO: Use separate role per lambda
const webLambdaPolicy = new aws.iam.Policy(`${resourcePrefix}-lambda-policy`, {
  description: "A policy for all web lambdas",
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        Effect: "Allow",
        Resource: "arn:aws:logs:*:*:*"
      },
      {
        Effect: 'Allow',
        Action: 'lambda:InvokeFunctionUrl',
        Resource: [
          webServerLambda.arn,
          webImageOptimizationLambda.arn
        ],
        Condition: {
          StringEquals: {
            'lambda:FunctionUrlAuthType': 'NONE'
          }
        }
      },
      {
        Effect: 'Allow',
        Action: [
          's3:GetObject',
          's3:PutObject',
          's3:ListBucket',
        ],
        Resource: [
          webImageBucket.arn,
          pulumi.interpolate`${webImageBucket.arn}/*`,
          webCacheBucket.arn,
          pulumi.interpolate`${webCacheBucket.arn}/*`,
        ]
      },
      {
        Effect: 'Allow',
        Action: [
          'sqs:SendMessage',
        ],
        Resource: [
          webCacheRevalidationQueue.arn
        ]
      },
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
        ],
        Resource: [
          webCacheRevalidationTable.arn,
          pulumi.interpolate`${webCacheRevalidationTable.arn}/*`
        ]
      }
    ],
  },
});

new aws.iam.RolePolicyAttachment(`${resourcePrefix}-lambda-role-policy-attachment`, {
  role: webLambdaRole.name,
  policyArn: webLambdaPolicy.arn,
});
new aws.iam.RolePolicyAttachment("my-lambda-sqs-policy", {
  role: webLambdaRole.name,
  policyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole",
});

// CF Functions
export const webHostTransformViewerRequestCfFunction = new aws.cloudfront.Function(`${resourcePrefix}-host-transform-viewer-request-function`, {
  code: `
function handler(event) {
    var request = event.request;
    request.headers["x-forwarded-host"] = request.headers.host;

    return request;
}
`,
  runtime: "cloudfront-js-1.0"
}, {
  provider: globalProvider
});

// CF edge lambdas
//
// const lambdaEdgeRole = new aws.iam.Role(`${resourcePrefix}`, {
//   assumeRolePolicy: JSON.stringify({
//     Version: "2012-10-17",
//     Statement: [
//       {
//         Effect: "Allow",
//         Principal: {
//           Service: ["lambda.amazonaws.com", "edgelambda.amazonaws.com"],
//         },
//         Action: "sts:AssumeRole",
//       },
//     ],
//   }),
// });
//
// // Attach the AWSLambdaBasicExecutionRole policy to the role
// new aws.iam.RolePolicyAttachment("lambdaEdgeRolePolicyAttachment", {
//   role: lambdaEdgeRole,
//   policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
// });
//
// export const webHostTransformViewerRequestLambda = new aws.lambda.CallbackFunction(`${resourcePrefix}-host-transform-viewer-request-lambda`, {
//   callback: (event: any) => {
//     const request = event.request
//     request.headers["x-forwarded-host"] = request.headers.host;
//     return request;
//   },
//   timeout: 5,
//   runtime: aws.lambda.Runtime.NodeJS18dX,
//   publish: true,
//   role: lambdaEdgeRole.arn
// }, {
//   provider: globalProvider
// })


