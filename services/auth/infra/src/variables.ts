import * as pulumi from "@pulumi/pulumi";
import {envResourcePrefix, isMain, prNumber} from "../variables";

export const resourcePrefix = `${envResourcePrefix}-auth`

export const authApiSuffix = '-auth-api'
