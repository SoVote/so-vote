import { parseAuthEmailToken } from "../authEmailTokenOperations";
import { differenceInMilliseconds } from "date-fns";

const tokenTtl = 1000 * 60 * 15
export const completeLogin = (loginToken: string) => {
  let loginTokenParseResult;
  try {
    const result = parseAuthEmailToken(loginToken)
    const ms = differenceInMilliseconds(Date.now(), result.issued)
    if(ms > tokenTtl) loginTokenParseResult = { state: 'invalid', reason: 'Token expired' }
    else loginTokenParseResult = { state: 'valid', body: result }
  } catch (err) {
    loginTokenParseResult = { state: 'invalid', reason: err }
  }
  console.log('Result of auth token parse: ', loginTokenParseResult)

  return loginTokenParseResult
}