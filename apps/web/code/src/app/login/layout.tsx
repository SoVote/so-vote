
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { Logo } from "@rainbow-husky/common-components";
import { ReactNode,  } from "react";

const client = new SESv2Client();

export default function LoginLayout({ children }: { children: ReactNode }){
  return (
    <div className='container flex justify-center m-auto h-screen items-center content-center'>
      <div className='w-[300px] self-center'>
        <Logo className='m-auto' />
        {children}
      </div>
    </div>
  )
}
