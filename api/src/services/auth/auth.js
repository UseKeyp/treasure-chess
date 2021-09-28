import { context } from '@redwoodjs/api'
import { keccak256 } from '@ethersproject/keccak256'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import { getLoginUrl, handleOauthCodeGrant } from 'src/lib/oAuth/oAuth'
import { requireAuth } from 'src/lib/auth'
import { refreshChessTokens } from 'src/lib/oAuth/chessDotCom'

export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  rules.skip({ only: ['loginUrl', 'oauthCodeGrant'] })
}

export const loginUrl = (input) => getLoginUrl(input)

export const oauthCodeGrant = (input) => handleOauthCodeGrant(input)

export const refreshToken = async () => {
  try {
    // Only allow JWT renewal for the most recet session
    if (
      keccak256(context.currentUser.idToken) !==
      context.currentUser.hashedIdToken
    )
      throw new AuthenticationError(
        'Your session has expired. Please log in again.'
      )
    console.log(context)
    const { idToken: jwt } = await refreshChessTokens(
      context.currentUser.refreshToken
    )
  } catch (e) {
    console.log(e)
  }
  return { jwt }
}
