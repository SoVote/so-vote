import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

const client = new SESv2Client();
const lambdaClient = new LambdaClient();

export default async function LoginPage() {

  async function login(formData: FormData) {
    'use server';
    const payload = { op: 'initiate-login', payload: { email: formData.get('email') }}
    const { Payload } = await lambdaClient.send(
      new InvokeCommand({ FunctionName: process.env.AUTH_API_FUNCTION_NAME, Payload: JSON.stringify(payload) }),
    );
    const resultPayload = JSON.parse(Buffer.from(Payload as any).toString('utf-8'));
    if (resultPayload?.errorType) {
      console.error(resultPayload);
      throw new Error(
        `${resultPayload?.errorType}: ${resultPayload?.errorMessage}
Lambda Stack Trace:
${resultPayload.trace?.join('\r\n')}
`,
        { cause: resultPayload },
      );
    }
  }

  return (
    <>
      <div className='py-10 text-center'>Login using your email address</div>

      <form action={login}>
        <input type='email' className='w-full block bg-skipper-blue rounded my-2 p-4' placeholder='email' name='email'/>
        <button className='w-full bg-plum-jam rounded p-4' type='submit'>Send Magic Link</button>
        <button className='w-full p-4'>Cancel</button>
      </form>

    </>
  )
}
