import * as aws from "@pulumi/aws";
import { sharedResourcePrefix } from "./variables";

export async function createAuthSecret() {
  const { HMAC } = await import('oslo/crypto')
  const secret = await new HMAC("SHA-256").generateKey();

  const authSecretName = `${sharedResourcePrefix}-auth-secret`
  return new aws.ssm.Parameter(authSecretName, {
    name: authSecretName,
    type: "SecureString",
    value: new TextDecoder().decode(secret),
    description: "Auth secret used to sign JWTs",
  });
}