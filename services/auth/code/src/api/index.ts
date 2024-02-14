import { initiateLogin } from "./handlers/initiateLogin";
import { validateToken } from "./handlers/validateToken";

export const handle = (event: { op: string, payload: any }) => {
  console.log({ event })
  switch(event.op){
    case 'initiate-login': return initiateLogin(event.payload.email);
    case 'validate-token': return validateToken(event.payload.token);
  }
}
