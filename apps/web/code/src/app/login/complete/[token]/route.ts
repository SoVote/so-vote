import { authApiFunction } from "@/serviceApiFunctions";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { cookies } from "next/headers";
import { redirect, RedirectType } from 'next/navigation'

const lambdaClient = new LambdaClient();
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, { params }: { params: { token: string } }) {
  await parseToken(params.token)

}

async function parseToken(token: string) {
  'use server'
  const payload = { op: 'complete-login', payload: { token } }
  console.log(`Parsing auth token with auth service ${authApiFunction}...`)
  const result = await lambdaClient.send(
    new InvokeCommand({ FunctionName: authApiFunction, Payload: JSON.stringify(payload) }),
  );
  console.log(Buffer.from(result.Payload as any).toString('utf-8'))
  const response = JSON.parse(Buffer.from(result.Payload as any).toString('utf-8'));
  if (response.result === 'invalid') {
    if(response.reason === 'Token expired'){
      redirect('/login/failed/expired', RedirectType.replace)
    }
  }
  console.log({ response })
  cookies().set({
    name: 'access_token',
    value: response.accessToken,
    httpOnly: true,
    secure: true,
    path: '/',
  })
  redirect('/login/complete', RedirectType.replace)
}