export interface InfraOutputConfig {
  pulumiOutputKey: string,
  githubOutputKey: string
}
export default interface InfraConfig {
  name: string,
  outputs: Array<InfraOutputConfig>
}