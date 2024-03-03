import * as aws from "@pulumi/aws";
import { sharedResourcePrefix } from "./variables";

const authSecretName = `${sharedResourcePrefix}-auth-secret`
export const authSecret = new aws.ssm.Parameter(authSecretName, {
  name: authSecretName,
  type: "SecureString",
  value: generateKey(),
  description: "Auth secret used to sign JWTs",
});

async function generateKey(){
  const cryptoKey: CryptoKey = await crypto.subtle.generateKey(
    {
      name: "HMAC",
      hash: 'SHA-256'
    },
    true,
    ["sign"]
  );
  const key = await crypto.subtle.exportKey("raw", cryptoKey);
  return new TextDecoder().decode(key)
}