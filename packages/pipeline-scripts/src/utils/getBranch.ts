import { exec } from "shelljs";

export const getBranch = () => {
  let branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME
  if (process.env.CI !== 'true') {
    branch = exec('git rev-parse --abbrev-ref HEAD')
  }
  return branch
}