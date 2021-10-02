import { context } from '@redwoodjs/graphql-server'
import { id } from '@ethersproject/hash'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import { getLoginUrl, handleOauthCodeGrant } from 'src/lib/oAuth/oAuth'
import { refreshChessTokens } from 'src/lib/oAuth/chessDotCom'

export const loginUrl = (input) => getLoginUrl(input)

export const oauthCodeGrant = (input) => handleOauthCodeGrant(input)
