import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as cloudfront from '@pulumi/aws/cloudfront';
import * as inputs from '@pulumi/aws/types/input';
import {
  webHostTransformViewerRequestCfFunction,
  webImageOptimisationLambdaUrl,
  webServerLambdaUrl
} from './lambda';
import { webAssetsBucket } from './s3';
import { isMain, prNumber, resourcePrefix } from './variables';
import { globalStack } from './stacks';

const webStaticAssetsOac = new aws.cloudfront.OriginAccessControl(`${resourcePrefix}-static-assets`, {
  description: 'Web Static Assets S3 Origin Access Control',
  originAccessControlOriginType: 's3',
  signingBehavior: 'always',
  signingProtocol: 'sigv4',
});
const webStaticAssetsOrigin: inputs.cloudfront.DistributionOrigin = {
  originId: 'static-assets',
  domainName: webAssetsBucket.bucketRegionalDomainName,
  originAccessControlId: webStaticAssetsOac.id
}


const serverLambdaOrigin: inputs.cloudfront.DistributionOrigin = {
  originId: 'server',
  domainName: webServerLambdaUrl.functionUrl.apply(url => url.slice(8, -1)),
  customOriginConfig: {
    httpPort: 80,
    httpsPort: 443,
    originProtocolPolicy: 'match-viewer',
    originSslProtocols: ['TLSv1.2']
  },
}

const imageOptimisationLambdaOrigin: inputs.cloudfront.DistributionOrigin = {
  originId: 'image-optimisation',
  domainName: webImageOptimisationLambdaUrl.functionUrl.apply(url => url.slice(8, -1)),
  customOriginConfig: {
    httpPort: 80,
    httpsPort: 443,
    originProtocolPolicy: 'match-viewer',
    originSslProtocols: ['TLSv1.2']

  },
}

const webServerCachePolicy = new aws.cloudfront.CachePolicy(`${resourcePrefix}-server-cache-policy`, {
  defaultTtl: 0,
  parametersInCacheKeyAndForwardedToOrigin: {
    cookiesConfig: {
      cookieBehavior: 'all',
    },
    enableAcceptEncodingBrotli: true,
    enableAcceptEncodingGzip: true,
    headersConfig: {
      headerBehavior: 'whitelist',
      headers: {
        items: [
          'accept',
          'rsc',
          'next-router-prefetch',
          'next-router-state-tree',
          'next-url',
          'x-op-middleware-response-headers',
          'x-middleware-prefetch',
          'x-op-middleware-request-headers',
          'x-nextjs-data'
        ],
      },
    },
    queryStringsConfig: {
      queryStringBehavior: 'all',
    },
  },
});

const webStaticCachePolicy = new aws.cloudfront.CachePolicy(`${resourcePrefix}-static-cache-policy`, {
  defaultTtl: 0,
  parametersInCacheKeyAndForwardedToOrigin: {
    cookiesConfig: {
      cookieBehavior: 'none',
    },
    enableAcceptEncodingBrotli: true,
    enableAcceptEncodingGzip: true,
    headersConfig: {
      headerBehavior: 'whitelist',
      headers: {
        items: [
          'accept',
          'rsc',
          'next-router-prefetch',
          'next-router-state-tree',
          'next-url',
        ],
      },
    },
    queryStringsConfig: {
      queryStringBehavior: 'all',
    },
  },
});


const webOriginRequestPolicy = new aws.cloudfront.OriginRequestPolicy(`${resourcePrefix}-origin-request-policy`, {
  comment: 'Policy to forward all parameters in viewer requests except for the Host header',
  cookiesConfig: {
    cookieBehavior: 'all',
  },
  headersConfig: {
    headerBehavior: 'allExcept',
    headers: {
      items: ['host'],
    },
  },
  queryStringsConfig: {
    queryStringBehavior: 'all',
  },
});

export const webDistribution = new cloudfront.Distribution(`${resourcePrefix}-cdn`, {
  comment: `${resourcePrefix}-cdn`,
  enabled: true,
  priceClass: 'PriceClass_100',
  aliases: isMain ? ['sovote.com', '*.sovote.com'] : [`dev-${prNumber}.sovote.com`],
  origins: [
    webStaticAssetsOrigin,
    serverLambdaOrigin,
    imageOptimisationLambdaOrigin
  ],
  viewerCertificate: {
    acmCertificateArn: globalStack.requireOutput('GLOBAL_SO_VOTE_COM_CERT_ARN'),
    sslSupportMethod: 'sni-only'
  },
  restrictions: {
    geoRestriction: {
      restrictionType: 'none'
    }
  },
  defaultCacheBehavior: {
    minTtl: 0,
    defaultTtl: 0,
    maxTtl: 31536000,
    targetOriginId: serverLambdaOrigin.originId,
    viewerProtocolPolicy: 'redirect-to-https',
    allowedMethods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'DELETE'],
    cachedMethods: ['GET', 'HEAD', 'OPTIONS'],
    compress: true,
    originRequestPolicyId: webOriginRequestPolicy.id,
    cachePolicyId: webServerCachePolicy.id,
    fieldLevelEncryptionId: '',
    functionAssociations:[
      {
        eventType: 'viewer-request',
        functionArn: webHostTransformViewerRequestCfFunction.arn
      }
    ],
    lambdaFunctionAssociations: [],
    realtimeLogConfigArn: '',
    responseHeadersPolicyId: '',
    smoothStreaming: false,
    trustedSigners: [],
    trustedKeyGroups: [],
  },
  orderedCacheBehaviors: [
    {
      targetOriginId: serverLambdaOrigin.originId,
      viewerProtocolPolicy: 'https-only',
      pathPattern: 'api/*',
      allowedMethods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'DELETE'],
      cachedMethods: ['GET', 'HEAD', 'OPTIONS'],
      compress: true,
      originRequestPolicyId: webOriginRequestPolicy.id,
      cachePolicyId: webServerCachePolicy.id
    },
    {
      targetOriginId: serverLambdaOrigin.originId,
      viewerProtocolPolicy: 'https-only',
      pathPattern: '_next/data/*',
      allowedMethods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'DELETE'],
      cachedMethods: ['GET', 'HEAD', 'OPTIONS'],
      compress: true,
      originRequestPolicyId: webOriginRequestPolicy.id,
      cachePolicyId: webServerCachePolicy.id
    },
    {
      targetOriginId: imageOptimisationLambdaOrigin.originId,
      viewerProtocolPolicy: 'https-only',
      pathPattern: '_next/image*',
      allowedMethods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'DELETE'],
      cachedMethods: ['GET', 'HEAD', 'OPTIONS'],
      compress: true,
      originRequestPolicyId: webOriginRequestPolicy.id,
      cachePolicyId: webServerCachePolicy.id
    },
    {
      targetOriginId: webStaticAssetsOrigin.originId,
      viewerProtocolPolicy: 'https-only',
      pathPattern: '_next/*',
      allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
      cachedMethods: ['HEAD', 'GET', 'OPTIONS'],
      compress: true,
      cachePolicyId: webStaticCachePolicy.id
    },
    {
      targetOriginId: webStaticAssetsOrigin.originId,
      viewerProtocolPolicy: 'https-only',
      pathPattern: 'favicon.ico',
      allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
      cachedMethods: ['HEAD', 'GET', 'OPTIONS'],
      compress: true,
      cachePolicyId: webStaticCachePolicy.id
    },
    {
      targetOriginId: webStaticAssetsOrigin.originId,
      viewerProtocolPolicy: 'https-only',
      pathPattern: '/images/*',
      allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
      cachedMethods: ['HEAD', 'GET'],
      compress: true,
      cachePolicyId: webStaticCachePolicy.id
    },
  ],
});
