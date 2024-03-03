import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { sharedResourcePrefix } from "./variables";
import { HMAC } from "oslo/crypto";

export const createAuthSecret = async () => {
  const secret = await new HMAC("SHA-256").generateKey();

  const authSecretName = `${sharedResourcePrefix}-auth-secret`
  return new aws.ssm.Parameter(authSecretName, {
    name: authSecretName,
    type: "SecureString",
    value: new TextDecoder().decode(secret),
    description: "Auth secret used to sign JWTs",
  });
}
