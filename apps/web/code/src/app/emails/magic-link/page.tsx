import { MagicLinkEmail } from "@rainbow-husky/email-templates";

export default async function MagicLinkEmailPage() {
  return (
    <MagicLinkEmail token='some-token' baseUrl='http://localhost' />
  )
}
