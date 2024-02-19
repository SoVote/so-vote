import { initiateLogin } from "./handlers/initiateLogin";
import { parseToken } from "./handlers/parseToken";

export const handle = async (event: { op: string, payload: any }) => {
  console.log({ event })
  let result;
  if (event.op === 'initiate-login') {
    result = await initiateLogin(event.payload.email, event.payload.environment);
  } else if (event.op === 'parse-token') {
    result = parseToken(event.payload.token);
  }
  console.log({ result })
  return result
}
