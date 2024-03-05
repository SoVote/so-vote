import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const client = new SSMClient()

const cache = new Map<string, string>()

export const getCachedSsmParameter = async (name: string) => {
  const cachedValue = cache.get(name)
  if(cachedValue) return cachedValue
  const response = await client.send(new GetParameterCommand({
    Name: name
  }))
  if(!response.Parameter?.Value) throw new Error(`Couldn't find "${name}" SSM parameter`)
  cache.set(name, response.Parameter.Value)
  return response.Parameter.Value
}