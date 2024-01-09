import * as aws from "@pulumi/aws";
import * as enums from "@pulumi/aws/types/enums";
import { globalResourcePrefix } from "../variables";

export const soVoteComZone = new aws.route53.Zone(`${globalResourcePrefix}-sovote.com`, {
  name: 'sovote.com',
});

export const soVoteComEmailRecord = new aws.route53.Record(`${globalResourcePrefix}-sovote.com-record-email`, {
  name: soVoteComZone.name,
  type: enums.route53.RecordType.MX,
  zoneId: soVoteComZone.zoneId,
  records: [
    '10 mail8.mymailcheap.com',
    '20 alt1.mymailcheap.com',
    '30 alt2.mymailcheap.com'
  ],
  ttl: 300,
});

export const soVoteComSpfRecord = new aws.route53.Record(`${globalResourcePrefix}-sovote.com-record-spf`, {
  name: soVoteComZone.name,
  type: enums.route53.RecordType.TXT,
  zoneId: soVoteComZone.zoneId,
  records: [
    'v=spf1 mx a:relay.mymailcheap.com -all'
  ],
  ttl: 300,
});
