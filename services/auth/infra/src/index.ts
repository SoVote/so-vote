import { authApiLambda } from  './lambda'
import './cloudwatch'
import './iam'

export const AUTH_SERVICE_API_FUNCTION_NAME = authApiLambda.name