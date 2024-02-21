import { MagicLinkEmail } from "@rainbow-husky/email-templates";
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { render } from "@react-email/render";
import crypto from 'crypto'
import { generateAuthEmailToken } from "../authEmailTokenOperations";

const client = new SESv2Client();

export const initiateLogin = async (email: string, environment: 'prod' | 'dev' | 'local') => {
  let baseUrl
  if(environment === 'prod' && process.env.BRANCH === 'main'){
    baseUrl = 'https://sovote.com'
  } else if(environment === 'dev' && process.env.BRANCH !== 'main'){
    baseUrl = `https://dev-${process.env.PR_NUMBER}.sovote.com`
  } else if(environment === 'local' && process.env.BRANCH !== 'main'){
    baseUrl = 'http://localhost:3000'
  } else throw new Error(`Unrecognised environment "${environment}" for branch "${process.env.BRANCH}"`)

  const token = generateAuthEmailToken(email)

  const htmlContent = render(<MagicLinkEmail firstTime={false} token={token} baseUrl={baseUrl} />)
  const input = { // SendEmailRequest
    FromEmailAddress: "test@sovote.com",
    Destination: { // Destination
      ToAddresses: [ // EmailAddressList
        email,
      ],
    },
    ReplyToAddresses: [
      "test@sovote.com",
    ],
    Content: { // EmailContent
      Simple: { // Message
        Subject: { // Content
          Data: "This is a so vote test"
        },
        Body: { // Body
          Text: {
            Data: "Hi, welcome to the first sovote.com test",
          },
          Html: {
            Data: htmlContent,
          },
        },
      },
    }
  };
  const command = new SendEmailCommand(input);
  const response = await client.send(command);
}
