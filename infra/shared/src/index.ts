import { createAuthSecret } from "./ssm";

export default async function(){
  const authSecret = await createAuthSecret()
  return {
    authSecretArn: authSecret.arn
  }
}