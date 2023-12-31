import { MagicLinkEmail } from "@rainbow-husky/email-templates";
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { render } from "@react-email/render";

const client = new SESv2Client();

export const initiateLogin = async (email: string) => {
  const htmlContent = render(<MagicLinkEmail firstTime={false} />)
  const input = { // SendEmailRequest
    FromEmailAddress: "test@sovote.com",
    Destination: { // Destination
      ToAddresses: [ // EmailAddressList
        "jon@node28.com",
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
