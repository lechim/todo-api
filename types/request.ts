import { UserAccessTokenType } from '@/utils/createTokens'
import { Request } from 'express'

export type RequestWithUser = Request & UserAccessTokenType
