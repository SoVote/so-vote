import { authApiLambda } from  './lambda'
import './cloudwatch'
import './iam'

export const API_FUNCTION_NAME = authApiLambda.name