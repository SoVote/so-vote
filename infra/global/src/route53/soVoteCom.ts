import * as aws from "@pulumi/aws";
import * as enums from "@pulumi/aws/types/enums";

export const soVoteComZone = new aws.route53.Zone(`rainbow-husky-sovote.com`, {
  name: 'sovote.com',
});

export const soVoteComEmailRecord = new aws.route53.Record(`rainbow-husky-sovote.com-record-email`, {
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

export const soVoteComSpfRecord = new aws.route53.Record(`rainbow-husky-sovote.com-record-spf`, {
  name: soVoteComZone.name,
  type: enums.route53.RecordType.TXT,
  zoneId: soVoteComZone.zoneId,
  records: [
    'v=spf1 mx a:relay.mymailcheap.com -all'
  ],
  ttl: 300,
});

// export const soVoteComDmarc = new aws.route53.Record(`rainbow-husky-sovote.com-record-dmarc`, {
//   name: soVoteComZone.name,
//   type: enums.route53.RecordType.TXT,
//   zoneId: soVoteComZone.zoneId,
//   records: [
//     'v=DMARC1; p=quarantine; pct=100'
//   ],
//   ttl: 300,
// });
//
// export const soVoteComDkim = new aws.route53.Record(`rainbow-husky-sovote.com-record-dkim`, {
//   name: soVoteComZone.name,
//   type: enums.route53.RecordType.TXT,
//   zoneId: soVoteComZone.zoneId,
//   records: [
//     'v=DKIM1; h=sha256; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDpc7TgzcasbLXbG6No9uUkhWqHe69avaF7hD/eAacUaAeqlw/hkyyK5Nptzqhq2JzlzpVDiqg4zZY/q83OW9kaS/K9W3rTMvk0uqexwmlbRREWAGt9IRviOQM3cgYmnxOhOFBe3YiFeuYRKu41aUJRPNL2hcJ1n05S/preCPuiJwIDAQAB'
//   ],
//   ttl: 300,
// });
