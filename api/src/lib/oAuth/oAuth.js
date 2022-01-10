import { AuthenticationError } from '@redwoodjs/graphql-server'
import { v4 as uuidv4 } from 'uuid'
import pkceChallenge from 'pkce-challenge'
import Sentry from 'src/lib/sentry'

import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { getTorusPublicAddress } from 'src/lib/torus/torus'

import {
  CHESS_SCOPE,
  getChessAccessTokenFromCode,
} from 'src/lib/oAuth/chessDotCom'

export const getLoginUrl = async () => {
  const state = uuidv4()
  const pkce = pkceChallenge()
  await db.oAuth.create({
    data: {
      state,
      codeVerifier: pkce.code_verifier,
      codeChallenge: pkce.code_challenge,
    },
  })
  const url = new URL('authorize', process.env.CHESS_OAUTH_URL)
  url.searchParams.set('client_id', process.env.CHESS_CLIENT_ID)
  url.searchParams.set('code_challenge', pkce.code_challenge) // eg. 3uWDl1fX2ioAqf38eSOFlKnxVEl_VyfaYKG2GyLndKs
  url.searchParams.set('code_challenge_method', 'S256')
  url.searchParams.set(
    'redirect_uri',
    process.env.PUBLIC_REDIRECT_URL + '/chess'
  )
  url.searchParams.set('scope', CHESS_SCOPE)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('state', state)
  url.searchParams.set('prompt', 'none')
  // console.log(url.href.split('&'))
  return {
    text: 'success',
    type: 'redirect',
    url: url.href,
  }
}

export const handleOauthCodeGrant = async ({ state, code }) => {
  try {
    // Delete the OAuth Item
    const oAuth = await db.oAuth.delete({ where: { state } })
    if (!oAuth) throw 'State not valid'

    // Check expiration
    if (new Date() - new Date(oAuth.createdAt) > 10 * 60 * 1000)
      throw 'Sorry, authentication must be completed within 10 minutes.'

    // Exchange code for token from Chess.com
    const { refreshToken, decoded } = await getChessAccessTokenFromCode(
      code,
      oAuth.codeVerifier
    )

    // Create member if needed, and get current avatar
    const member = await fetchMember(decoded.preferred_username, true)
    // TODO: Don't convert to string once type is changed in JWT (waiting on Chess.com)
    if (decoded.user_id.toString() !== member.id)
      throw new AuthenticationError(
        `user_id in JWT doesn't match player_id from API`
      )

    await db.member.update({
      where: { id: member.id },
      data: {
        refreshToken,
        // NOTE: Updates user with their current avatar and country
        imageSrc: member.imageSrc,
        country: member.country,
        ...(member.masterTitle && { masterTitle: member.masterTitle }),
      },
    })

    // NOTE: Get Torus wallet address if needed
    if (!member.address) {
      try {
        const publicAddress = await getTorusPublicAddress(member.id)
        await db.member.update({
          where: { id: member.id },
          data: { address: publicAddress },
        })
      } catch (e) {
        /* eslint-disable no-console */
        console.log("Error fetching user's wallet from Torus")
        console.log(e)
        /* eslint-enable no-console */
      }
    }

    // Save the Discord auth credentials and update state
    return member
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw new AuthenticationError()
  }
}
