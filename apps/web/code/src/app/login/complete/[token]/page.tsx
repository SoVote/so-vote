export default function LoginCompleteTokenPage({ params }: { params: { token: string } }) {
  return <div>The token: {params.token}</div>
}