import { parseAuthEmailToken } from "../authEmailTokenOperations";
import { differenceInMilliseconds } from "date-fns";

const tokenTtl = 1000 * 60 * 15
export const validateToken = (token: string) => {
  try {
    const result = parseAuthEmailToken(token)
    const ms = differenceInMilliseconds(Date.now(), result.issued)
    if(ms > tokenTtl) return { state: 'invalid', reason: 'Token expired' }
    return { state: 'valid' }
  } catch (err) {
    return { state: 'invalid', reason: err }
  }
}