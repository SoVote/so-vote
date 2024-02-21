import { parseAuthEmailToken } from "../authEmailTokenOperations";
import { differenceInMilliseconds } from "date-fns";
import '../../webCryptoPolyfill'
import { createJWT } from 'oslo/jwt'
import { TimeSpan } from "oslo";

const secret = 'VeTp5P0pUlfN5JPgP1pLbgEJogaQWMgY0Ev3dd2pYJV1rbvvZNZzG+mayLHxrTon5+RWrRsLIAc1p/Qkt3dXGGz4ZqVFgwpcZSSoqW5Cy4wEd3KDYO377CulpiGmTPSVdCivpWXZThWHuXNDSfUf1vb9/pt5B7VMEX1utTkoWoTaq/LA+p0fu7eJ3QUlXtC89ofLHnGskrmiirkMDH3X93p7sygO1t+HZNlWgJvGe2cddrMOxc8yhvIQ3b2FRaVUTXLfPk7Noq7Vuvxr3tuHxPonbqk0A4AWyFVUTANCbbblBvPXbcR+PQBvaE+ROKyR1bRWjfaTQX5Klr9cHHza7w=='

const tokenTtl = 1000 * 60 * 15
export const completeLogin = async (loginToken: string) => {
  let response;
  try {
    const tokenBody = parseAuthEmailToken(loginToken)
    const ms = differenceInMilliseconds(Date.now(), tokenBody.issued)
    if (ms > tokenTtl) {
      console.log('Token expired')
      response = {
        result: 'invalid',
        reason: 'Token expired'
      }
    } else {
      console.log('Token valid')
      const encodedSecret = new TextEncoder().encode(secret);

      const accessJwt = await createJWT('HS256', encodedSecret.buffer, { email: tokenBody?.email }, {
        expiresIn: new TimeSpan(30, 'd')
      })

      const refreshJwt = await createJWT('HS256', encodedSecret.buffer, { email: tokenBody?.email }, {
        expiresIn: new TimeSpan(365, 'd')
      })

      response = {
        result: 'valid',
        accessToken: accessJwt,
        refreshToken: refreshJwt
      }
    }
  } catch (err) {
    console.log('Error parsing token')
    response = {
      result: 'invalid',
      reason: err
    }
  }

  console.log({ response })
  return response
}