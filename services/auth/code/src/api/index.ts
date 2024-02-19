import { initiateLogin } from "./handlers/initiateLogin";
import { parseToken } from "./handlers/parseToken";

export const handle = async (event: { op: string, payload: any }) => {
  console.log({ event })
  switch(event.op){
    case 'initiate-login': return await initiateLogin(event.payload.email, event.payload.environment);
    case 'parse-token': return parseToken(event.payload.token);
  }
}
