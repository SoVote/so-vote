import { initiateLogin } from "./handlers/initiateLogin";
import { completeLogin } from "./handlers/completeLogin";

export const handle = async (event: { op: string, payload: any }) => {
  console.log({ event })
  switch(event.op){
    case 'initiate-login': return await initiateLogin(event.payload.email, event.payload.environment);
    case 'complete-login': return await completeLogin(event.payload.token);
  }
}
