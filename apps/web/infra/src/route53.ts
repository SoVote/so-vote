import * as aws from '@pulumi/aws';
import { isMain, prNumber, resourcePrefix } from './variables';
import { globalStack } from './stacks';
import { webDistribution } from './cloudfront';

const aRecords = isMain ? ['sovote.com', '*.sovote.com'] : [`dev-${prNumber}.sovote.com`];

export const webRecords = aRecords.map((aRecord,i) => new aws.route53.Record(`${resourcePrefix}-record-${i+1}`, {
  zoneId: globalStack.requireOutput('SO_VOTE_COM_ZONE_ID'),
  name: aRecord,
  type: 'A',
  aliases: [{
    name: webDistribution.domainName,
    zoneId: webDistribution.hostedZoneId,
    evaluateTargetHealth: true,
  }],
}));
