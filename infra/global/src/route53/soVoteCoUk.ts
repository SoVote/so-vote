import * as aws from "@pulumi/aws";
import * as enums from "@pulumi/aws/types/enums";

export const soVoteCoUkZone = new aws.route53.Zone(`rainbow-husky-sovote.co.uk`, {
  name: 'sovote.co.uk',
});

// export const soVoteCoUkNsRecord = new aws.route53.Record(`rainbow-husky-sovote.co.uk-record-ns`, {
//   name: soVoteCoUkZone.name,
//   type: enums.route53.RecordType.NS,
//   zoneId: soVoteCoUkZone.zoneId,
//   records: [
//     'ns-1269.awsdns-30.org.',
//     'ns-835.awsdns-40.net.',
//     'ns-198.awsdns-24.com.',
//     'ns-1747.awsdns-26.co.uk.'
//   ],
//   ttl: 172800,
// });
// export const soVoteCoUkSoaRecord = new aws.route53.Record(`rainbow-husky-sovote.co.uk-record-soa`, {
//   name: soVoteCoUkZone.name,
//   type: enums.route53.RecordType.SOA,
//   zoneId: soVoteCoUkZone.zoneId,
//   records: [
//     'ns-1269.awsdns-30.org. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400',
//   ],
//   ttl: 900,
// });
