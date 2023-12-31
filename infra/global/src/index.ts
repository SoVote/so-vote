import {repo} from "./github";
import './ses'
import { globalSoDashVoteComCert, globalSoDashVoteCoUkCert, globalSoVoteComCert, globalSoVoteCoUkCert } from "./acm";
import { soDashVoteComZone, soDashVoteCoUkZone, soVoteComZone, soVoteCoUkZone } from "./route53";

export const gitCloneUrl = repo.gitCloneUrl

export const globalSoVoteComCertArn = globalSoVoteComCert.arn
export const globalSoVoteCoUkCertArn = globalSoVoteCoUkCert.arn
export const globalSoDashVoteComCertArn = globalSoDashVoteComCert.arn
export const globalSoDashVoteCoUkCertArn = globalSoDashVoteCoUkCert.arn

export const soVoteComZoneId = soVoteComZone.id
export const soVoteCoUkZoneId = soVoteCoUkZone.id
export const soDashVoteComZoneId = soDashVoteComZone.id
export const soDashVoteCoUkZoneId = soDashVoteCoUkZone.id
