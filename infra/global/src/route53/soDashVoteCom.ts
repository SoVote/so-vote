import * as aws from "@pulumi/aws";
import * as enums from "@pulumi/aws/types/enums";

export const soDashVoteComZone = new aws.route53.Zone(`rainbow-husky-so-vote.com`, {
  name: 'so-vote.com',
});

// export const soVoteDashComNsRecord = new aws.route53.Record(`rainbow-husky-so-vote.com-record-ns`, {
//   name: soDashVoteComZone.name,
//   type: enums.route53.RecordType.NS,
//   zoneId: soDashVoteComZone.zoneId,
//   records: [
//     'ns-1752.awsdns-27.co.uk.',
//     'ns-278.awsdns-34.com.',
//     'ns-1374.awsdns-43.org.',
//     'ns-655.awsdns-17.net.',
//   ],
//   ttl: 172800,
// });
// export const soVoteDashComSoaRecord = new aws.route53.Record(`rainbow-husky-so-vote.com-record-soa`, {
//   name: soDashVoteComZone.name,
//   type: enums.route53.RecordType.SOA,
//   zoneId: soDashVoteComZone.zoneId,
//   records: [
//     'ns-1752.awsdns-27.co.uk. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400',
//   ],
//   ttl: 900,
// });
