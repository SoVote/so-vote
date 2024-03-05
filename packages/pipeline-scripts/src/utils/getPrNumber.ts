import { exec } from "shelljs";

export const getPrNumber = () => {
  if (process.env.CI !== 'true') {
    if(!process.env.PR_NUMBER) throw new Error('Missing required PR_NUMBER env var when running locally')
    //TODO: Find PR number by querying the GitHub API
  }
  return process.env.PR_NUMBER
}