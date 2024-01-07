import * as aws from "@pulumi/aws";
import * as enums from "@pulumi/aws/types/enums";
import { globalResourcePrefix } from "../variables";

export const soDashVoteCoUkZone = new aws.route53.Zone(`${globalResourcePrefix}-so-vote.co.uk`, {
  name: 'so-vote.co.uk',
});