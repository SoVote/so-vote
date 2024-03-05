
const isMain = process.env.NEXT_PUBLIC_BRANCH === 'main'
export const authApiFunction = `rh-${isMain ? 'main' : `pr-${process.env.NEXT_PUBLIC_PR_NUMBER}`}-auth-api`