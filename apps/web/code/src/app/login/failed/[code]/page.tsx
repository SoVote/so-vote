import Link from "next/link";
export default async function LoginFailedPage({ params }: { params: { code: 'expired' } }){
  return (
    <div>
      <div>Login failed</div>
      <p>{{
        'expired': <>The token has expired. <Link href='/login'>Click Here</Link> to start again.</>
      }[params.code]}</p>
    </div>
  )
}