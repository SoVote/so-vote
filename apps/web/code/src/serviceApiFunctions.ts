
let branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME
const isMain = branch === 'main'
export const authApiFunction = `rh-${isMain ? 'main' : `pr-${process.env.PR_NUMBER}`}-auth-api`