import { authApiLambda } from  './lambda'
import './cloudwatch'
import * as iam from './iam'

export const API_FUNCTION_NAME = authApiLambda.name