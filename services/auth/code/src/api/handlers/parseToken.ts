import { parseAuthEmailToken } from "../authEmailTokenOperations";
import { differenceInMilliseconds } from "date-fns";

const tokenTtl = 1000 * 60 * 15
export const parseToken = (token: string) => {
  let response;
  try {
    const result = parseAuthEmailToken(token)
    const ms = differenceInMilliseconds(Date.now(), result.issued)
    if(ms > tokenTtl) response = { state: 'invalid', reason: 'Token expired' }
    else response = { state: 'valid', body: result }
  } catch (err) {
    response = { state: 'invalid', reason: err }
  }
  console.log('Result of auth token parse: ', response)
  return response
}