import * as github from "@pulumi/github";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

export const repo = new github.Repository("rainbow-husky", {
  name: 'rainbow-husky',
  description: "The Rainbow Husky repo",
  visibility: "public",
  hasIssues: true,
  allowAutoMerge: true,
  allowMergeCommit: false,
  allowRebaseMerge: false,
  allowSquashMerge: true,
});

// export const publicKey = github.getActionsPublicKey({
//   repository: "rainbow-husky",
// });
export const assAccessKeyId = new github.ActionsSecret("rainbow-huskey-aws-access-key-id", {
  repository: repo.name,
  secretName: "AWS_ACCESS_KEY_ID",
  plaintextValue: config.getSecret("aws-access-key-id"),
});
export const awsSecretAccessKey = new github.ActionsSecret("rainbow-huskey-aws-secret-access-key", {
  repository: repo.name,
  secretName: "AWS_SECRET_ACCESS_KEY",
  plaintextValue: config.getSecret("aws-secret-access-key"),
});
