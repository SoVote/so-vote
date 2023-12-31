export interface ServiceDeploymentOutput {
  pulumiOutputKey: string,
  githubOutputKey: string
}
export default interface ServiceDeploymentConfig {
  name: string,
  outputs: Array<ServiceDeploymentOutput>
}