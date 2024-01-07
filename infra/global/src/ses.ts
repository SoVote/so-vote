import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { soVoteComZone } from "./route53";
import { resourcePrefix } from "@rainbow-husky/www-app-infra/src/variables";

const soVoteSesDomainIdentity = new aws.ses.DomainIdentity(`${resourcePrefix}-domain-identity`, {domain: "sovote.com"});
const soVoteSesVerificationRecord = new aws.route53.Record(`${resourcePrefix}-verification-record`, {
  zoneId: soVoteComZone.zoneId,
  name: pulumi.interpolate`_amazonses.${soVoteSesDomainIdentity.id}`,
  type: "TXT",
  ttl: 600,
  records: [soVoteSesDomainIdentity.verificationToken],
});
const soVoteSesDomainIdentityVerification = new aws.ses.DomainIdentityVerification(`${resourcePrefix}-domain-identify-verification`, {
  domain: soVoteSesDomainIdentity.id
}, {
  dependsOn: [soVoteSesVerificationRecord],
});