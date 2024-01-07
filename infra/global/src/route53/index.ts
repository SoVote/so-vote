import * as aws from '@pulumi/aws';
import {soVoteComCert, soVoteCoUkCert, soDashVoteComCert, soDashVoteCoUkCert} from '../acm'
import {Zone} from "@pulumi/aws/route53";
import {Certificate} from "@pulumi/aws/acm";
import {soVoteComZone} from "./soVoteCom";
import {soVoteCoUkZone} from "./soVoteCoUk";
import {soDashVoteComZone} from "./soDashVoteCom";
import {soDashVoteCoUkZone} from "./soDashVoteCoUk";

export * from "./soVoteCom";
export * from "./soVoteCoUk";
export * from "./soDashVoteCom";
export * from "./soDashVoteCoUk";

validateDomain('sovote.com', soVoteComZone, soVoteComCert)
validateDomain('sovote.co.uk', soVoteCoUkZone, soVoteCoUkCert)
validateDomain('so-vote.com', soDashVoteComZone, soDashVoteComCert)
validateDomain('so-vote.co.uk', soDashVoteCoUkZone, soDashVoteCoUkCert)

function validateDomain(domainName: string, zone: Zone, cert: Certificate){
  cert.domainValidationOptions.apply(domainValidationOptions => {
    const wildcardDomainValidationOption = domainValidationOptions.find(option => option.domainName.startsWith('*'))
    const certValidationRecord = new aws.route53.Record(`rainbow-husky-validation-record-${domainName}-${wildcardDomainValidationOption.domainName}`, {
      name: wildcardDomainValidationOption.resourceRecordName,
      type: wildcardDomainValidationOption.resourceRecordType,
      zoneId: zone.zoneId,
      records: [wildcardDomainValidationOption.resourceRecordValue],
      ttl: 60,
    });
    new aws.acm.CertificateValidation(`rainbow-husky-validation-${domainName}-${wildcardDomainValidationOption.domainName}`, {
      certificateArn: cert.arn,
      validationRecordFqdns: [certValidationRecord.fqdn],
    });
  })
}
