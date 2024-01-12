import './ses'
import { globalSoDashVoteComCert, globalSoDashVoteCoUkCert, globalSoVoteComCert, globalSoVoteCoUkCert } from './acm';
import { soDashVoteComZone, soDashVoteCoUkZone, soVoteComZone, soVoteCoUkZone } from './route53';

export const GLOBAL_SO_VOTE_COM_CERT_ARN = globalSoVoteComCert.arn
export const GLOBAL_SO_VOTE_CO_UK_CERT_ARN = globalSoVoteCoUkCert.arn
export const GLOBAL_SO_DASH_VOTE_COM_CERT_ARN = globalSoDashVoteComCert.arn
export const GLOBAL_SO_DASH_VOTE_CO_UK_CERT_ARN = globalSoDashVoteCoUkCert.arn

export const SO_VOTE_COM_ZONE_ID = soVoteComZone.id
export const SO_VOTE_CO_UK_ZONE_ID = soVoteCoUkZone.id
export const SO_DASH_VOTE_COM_ZONE_ID = soDashVoteComZone.id
export const SO_DASH_VOTE_CO_UK_ZONE_ID = soDashVoteCoUkZone.id

