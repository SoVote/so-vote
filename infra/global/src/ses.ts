import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { soVoteComZone } from "./route53";
import { globalResourcePrefix } from "./variables";

export const soVoteSesDomainIdentity = new aws.ses.DomainIdentity(`${globalResourcePrefix}-domain-identity`, {domain: "sovote.com"});
export const soVoteSesVerificationRecord = new aws.route53.Record(`${globalResourcePrefix}-verification-record`, {
  zoneId: soVoteComZone.zoneId,
  name: pulumi.interpolate`_amazonses.${soVoteSesDomainIdentity.id}`,
  type: "TXT",
  ttl: 600,
  records: [soVoteSesDomainIdentity.verificationToken],
});
export const soVoteSesDomainIdentityVerification = new aws.ses.DomainIdentityVerification(`${globalResourcePrefix}-domain-identify-verification`, {
  domain: soVoteSesDomainIdentity.id
}, {
  dependsOn: [soVoteSesVerificationRecord],
});