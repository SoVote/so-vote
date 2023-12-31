import { render } from '@testing-library/react'
import { initiateLogin } from "./initiateLogin";
import { mockClient } from 'aws-sdk-client-mock';
import 'aws-sdk-client-mock-jest';
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";

const mockSesV2Client = mockClient(SESv2Client as any)

describe('initiateLogin', () => {
  it('should render correctly the first time a user tries to log in', async () => {
    await initiateLogin('some@email.com')
    const commands = mockSesV2Client.calls()
    expect(commands.length).toBe(1)
    expect(commands[0].args[0].input).toMatchSnapshot()

  })
  it('should render correctly subsequent log ins', () => {

  })
})
