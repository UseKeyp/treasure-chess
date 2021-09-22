import { AuthenticationError, parseJWT } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { v4 as uuidv4 } from 'uuid'
import pkceChallenge, { verifyChallenge } from 'pkce-challenge'

import {
  CHESS_SCOPE,
  getChessAccessTokenFromCode,
} from 'src/lib/oAuth/chessDotCom'
import { getChessMember } from 'src/lib/chessDotCom'

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
  // console.log(url.href.split('&'))
  return {
    text: 'success',
    type: 'redirect',
    url: url.href,
  }
}

export const handleOauthCodeGrant = async ({ state, code }) => {
  try {
    // console.log('handleOauthCodeGrant')
    // console.log({ state, code })
    const oAuth = await db.oAuth.findUnique({ where: { state } })
    if (!oAuth) throw 'State not valid'

    // Check expiration
    if (new Date() - new Date(oAuth.createdAt) > 10 * 60 * 1000)
      throw 'Sorry, authentication must be completed within 10 minutes.'

    // Verify the code challenge is correct
    // if (!verifyChallenge(oAuth.code_verifier, oAuth.code_challenge))
    //   throw 'Challenge could not be verified'

    // Exchange code for token from Chess.com

    const { accessToken, refreshToken, expiration, idToken, user } =
      await getChessAccessTokenFromCode(code, oAuth.codeVerifier)
    console.log({ accessToken })
    console.log({ refreshToken })
    console.log({ expiration })
    console.log({ user })

    // // Delete the OAuth Item
    // await db.oAuth.delete({ where: { state } })
    //
    // // Get member from Chess.com
    // const memberDetails = await getChessMember(accessToken)
    // const { username, id } = memberDetails
    //
    // // Create or update member
    // const member = await db.member.upsert({
    //   where: { id },
    //   create: { id: user.id, accessToken, refreshToken, expiration },
    //   update: { accessToken, refreshToken, expiration, idToken },
    // })
    // Get token from torus? Maybe wait until later when doing transaction stuff.

    // Save the Discord auth credentials and update state
  } catch (e) {
    throw new AuthenticationError(`handleOauthCodeGrant() ${e}`)
  }
}
