import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { sharedResourcePrefix } from "./variables";
import { HMAC } from "oslo/crypto";
const secret = await new HMAC("SHA-256").generateKey();


export const secretParameter = new aws.ssm.Parameter(`${sharedResourcePrefix}-auth-secret`, {
  type: "SecureString",
  value: new TextDecoder().decode(secret),
  description: "Auth secret used to sign JWTs",
});