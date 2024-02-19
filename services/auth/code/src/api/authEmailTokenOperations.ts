import crypto from "crypto";

const key = Buffer.from('8039ace2aea257276dc0fedcfd720a221f5d86603f0a951cbe2d87feca8ece8f' as string, 'hex');
const iv = Buffer.from('fa646872cfa756d22966c1934f3a8ae3f9fdae6a', 'hex');
const authTagLength = 16

interface TokenBody {
  email: string,
  issued: string
}

export const generateAuthEmailToken = (email: string) => {
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv, { authTagLength })
  const body: TokenBody = { email, issued: new Date().toISOString() }
  return Buffer.concat([ cipher.update(JSON.stringify(body)), cipher.final(), cipher.getAuthTag()]).toString('hex')
}

export const parseAuthEmailToken = (token: string): TokenBody => {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv, { authTagLength });
  const tokenBuffer = Buffer.from(token, 'hex')
  const bodyCutoffPosition = tokenBuffer.length - authTagLength
  const encryptedBody = tokenBuffer.subarray(0, bodyCutoffPosition)
  const authTag = tokenBuffer.subarray(bodyCutoffPosition, tokenBuffer.length)
  decipher.setAuthTag(authTag);
  return JSON.parse(Buffer.concat([ decipher.update(encryptedBody), decipher.final()]).toString('utf-8'))
}