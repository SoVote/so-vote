import * as aws from "@pulumi/aws";
import * as enums from "@pulumi/aws/types/enums";

export const soDashVoteCoUkZone = new aws.route53.Zone(`rainbow-husky-so-vote.co.uk`, {
  name: 'so-vote.co.uk',
});

// export const soDashVoteCoUkNsRecord = new aws.route53.Record(`rainbow-husky-so-vote.co.uk-record-ns`, {
//   name: soDashVoteCoUkZone.name,
//   type: enums.route53.RecordType.NS,
//   zoneId: soDashVoteCoUkZone.zoneId,
//   records: [
//     'ns-1774.awsdns-29.co.uk.',
//     'ns-157.awsdns-19.com.',
//     'ns-1043.awsdns-02.org.',
//     'ns-621.awsdns-13.net.'
//   ],
//   ttl: 172800,
// });
// export const soDashVoteCoUkSoaRecord = new aws.route53.Record(`rainbow-husky-so-vote.co.uk-record-soa`, {
//   name: soDashVoteCoUkZone.name,
//   type: enums.route53.RecordType.SOA,
//   zoneId: soDashVoteCoUkZone.zoneId,
//   records: [
//     'ns-1774.awsdns-29.co.uk. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400',
//   ],
//   ttl: 900,
// });
