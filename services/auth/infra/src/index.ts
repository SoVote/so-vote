import { authApiLambda } from  './lambda'
import './cloudwatch'
import { authApiLambdaRolePolicy } from './iam'

export const API_FUNCTION_NAME = authApiLambda.name
export const API_LAMBDA_ROLE_POLICY_ID = authApiLambdaRolePolicy.id