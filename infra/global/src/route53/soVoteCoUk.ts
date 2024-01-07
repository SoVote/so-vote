import * as aws from "@pulumi/aws";
import * as enums from "@pulumi/aws/types/enums";
import { globalResourcePrefix } from "../variables";

export const soVoteCoUkZone = new aws.route53.Zone(`${globalResourcePrefix}-sovote.co.uk`, {
  name: 'sovote.co.uk',
});