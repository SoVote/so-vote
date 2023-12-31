import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi'

const soVoteComEmailIdentity = new aws.sesv2.EmailIdentity("rainbow-husky-email-identity-sovote.com", {
  emailIdentity: "sovote.com",
});

// const soVoteComEmailIdentityMailFromAttributes = new aws.sesv2.EmailIdentityMailFromAttributes("rainbow-husky-email-identity-mail-from-attributes-sovote.com", {
//   emailIdentity: soVoteComEmailIdentity.emailIdentity,
//   behaviorOnMxFailure: "REJECT_MESSAGE",
//   mailFromDomain: soVoteComEmailIdentity.emailIdentity,
// });
