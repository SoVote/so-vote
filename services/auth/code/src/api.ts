import { initiateLogin } from "./initiateLogin";

export const handle = (event: { op: string, body: { email: string } }) => {
  switch(event.op){
    case 'initiate-login': return initiateLogin(event.body.email)
  }
}
