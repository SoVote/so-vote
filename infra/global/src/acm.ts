import * as aws from '@pulumi/aws';

const globalProvider = new aws.Provider('global-provider', {
  region: 'us-east-1'
})

export const soVoteComCert = new aws.acm.Certificate("rainbow-husky-cert-sovote.com", {
  domainName: "*.sovote.com",
  subjectAlternativeNames: ['sovote.com'],
  tags: {},
  validationMethod: "DNS",
});
export const soVoteCoUkCert = new aws.acm.Certificate("rainbow-husky-cert-sovote.co.uk", {
  domainName: "*.sovote.co.uk",
  subjectAlternativeNames: ['sovote.co.uk'],
  tags: {},
  validationMethod: "DNS",
});
export const soDashVoteComCert = new aws.acm.Certificate("rainbow-husky-cert-so-vote.com", {
  domainName: "*.so-vote.com",
  subjectAlternativeNames: ['so-vote.com'],
  tags: {},
  validationMethod: "DNS",
});
export const soDashVoteCoUkCert = new aws.acm.Certificate("rainbow-husky-cert-so-vote.co.uk", {
  domainName: "*.so-vote.co.uk",
  subjectAlternativeNames: ['so-vote.co.uk'],
  tags: {},
  validationMethod: "DNS",
});




// Global certs for use with CloudFront distros
export const globalSoVoteComCert = new aws.acm.Certificate("rainbow-husky-global-cert-sovote.com", {
  domainName: "*.sovote.com",
  subjectAlternativeNames: ['sovote.com'],
  tags: {},
  validationMethod: "DNS",
}, { provider: globalProvider });
export const globalSoVoteCoUkCert = new aws.acm.Certificate("rainbow-husky-global-cert-sovote.co.uk", {
  domainName: "*.sovote.co.uk",
  subjectAlternativeNames: ['sovote.co.uk'],
  tags: {},
  validationMethod: "DNS",
}, { provider: globalProvider });
export const globalSoDashVoteComCert = new aws.acm.Certificate("rainbow-husky-global-cert-so-vote.com", {
  domainName: "*.so-vote.com",
  subjectAlternativeNames: ['so-vote.com'],
  tags: {},
  validationMethod: "DNS",
}, { provider: globalProvider });
export const globalSoDashVoteCoUkCert = new aws.acm.Certificate("rainbow-husky-global-cert-so-vote.co.uk", {
  domainName: "*.so-vote.co.uk",
  subjectAlternativeNames: ['so-vote.co.uk'],
  tags: {},
  validationMethod: "DNS",
}, { provider: globalProvider });
