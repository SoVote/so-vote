import * as aws from "@pulumi/aws";
import * as enums from "@pulumi/aws/types/enums";
import { globalResourcePrefix } from "../variables";

export const soDashVoteComZone = new aws.route53.Zone(`${globalResourcePrefix}-so-vote.com`, {
  name: 'so-vote.com',
});