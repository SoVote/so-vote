export const getEnvironment = () => {
  if(process.env.NODE_ENV === 'development') return 'local'
  return process.env.NEXT_PUBLIC_ENVIRONMENT
}