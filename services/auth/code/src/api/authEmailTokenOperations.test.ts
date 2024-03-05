import { generateAuthEmailToken, parseAuthEmailToken } from "./authEmailTokenOperations";
import { ssm } from '@rainbow-husky/common-backend'

jest.mock('@rainbow-husky/common-backend')

const mockGetCachedSsmParameter = ssm.getCachedSsmParameter as jest.MockedFunction<any>

beforeEach(() => {
  jest.resetAllMocks()
  jest.useFakeTimers({ now: new Date('2024-01-01') })
  mockGetCachedSsmParameter.mockResolvedValue('8039ace2aea257276dc0fedcfd720a221f5d86603f0a951cbe2d87feca8ece8f')
})

afterAll(() => {
  jest.useRealTimers()
})

describe('authEmailTokenOperations', () => {
  it('should encrypt and decrypt valid tokens correctly', async () => {
    const encryptedData = await generateAuthEmailToken('some@email.address')
    const decryptedDataObject = parseAuthEmailToken(encryptedData)
    expect(decryptedDataObject).toMatchSnapshot()
  })
  it('should throw an error if the token is invalid', async () => {
    const mangledToken = '13d01a9ecb107ed564ec1423e499d26c2781d413f92949c7973f09be7924d82ae8aaa1a34bd439b08174f2b7affcbbf452f5d19c3a6f660ffbc080ae2c938292c85eb9652798761c6e7afbf8cc75e75686db'
    await expect(() => parseAuthEmailToken(mangledToken)).rejects.toThrowErrorMatchingSnapshot()
  })
})