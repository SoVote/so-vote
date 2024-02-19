import { getEnvironment } from "@/getEnvironment";
import { authApiFunction } from "@/serviceApiFunctions";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
const lambdaClient = new LambdaClient();

export default async function LoginCompleteTokenPage({ params }: { params: { token: string } }) {
  const tokenBody = await parseToken(params.token)
  return (
    <>
      <div>The token: {params.token}</div>
      <div>The token body: <pre>{JSON.stringify(tokenBody, null, 2)}</pre></div>
    </>
    )

}

async function parseToken(token: string){

  const payload = { op: 'parse-token', payload: { token } }
  console.log(`Parsing auth token with auth service ${authApiFunction}...`)
  const result = await lambdaClient.send(
    new InvokeCommand({ FunctionName: authApiFunction, Payload: JSON.stringify(payload) }),
  );
  console.log({result})
  return JSON.parse(Buffer.from(result.Payload as any).toString('utf-8'));
}