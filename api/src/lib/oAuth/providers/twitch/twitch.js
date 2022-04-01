import fetch from 'cross-fetch'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { isDevelopment } from 'src/lib/helpers'
import Sentry from 'src/lib/sentry'

import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'

export const TWITCH = 'TWITCH'
export const TWITCH_OAUTH_URL_AUTHORIZE =
  'https://id.twitch.tv/oauth2/authorize'

const TWITCH_OAUTH_URL_TOKEN = 'https://id.twitch.tv/oauth2/token'
const TWITCH_SCOPE = 'user:read:email'
const TWITCH_REDIRECT_URI = isDevelopment
  ? 'http://localhost:8910/redirect/twitch'
  : process.env.APP_DOMAIN + '/redirect/twitch'

const params = {
  client_id: process.env.TWITCH_CLIENT_ID,
  scope: TWITCH_SCOPE,
  redirect_uri: TWITCH_REDIRECT_URI,
  force_verify: true,
}

export const onSubmitCode = async (code, { memberId }) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      redirect_uri: TWITCH_REDIRECT_URI,
      code,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(TWITCH_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      if (res.status != 200)
        throw `Twitch API failed for /token. ${res.status} - ${res.statusText}`
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`
    logger.debug({ custom: response }, 'Twitch submitCodeGrant')
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiration,
    } = response

    if (!refreshToken) throw 'Failed to get refresh_token from Twitch'
    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      refreshToken,
      memberId,
    }
  } catch (e) {
    Sentry.captureException(e)
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({ accessToken, memberId }) => {
  try {
    const usersList = await fetch(`https://api.twitch.tv/helix/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID,
      },
    }).then((res) => {
      if (res.status != 200)
        throw 'Twitch authorization failed, or secret invalid'
      return res.json()
    })
    logger.debug({ custom: usersList }, 'Twitch user details')
    await db.member.update({
      where: { id: memberId },
      data: { twitchUsername: usersList.data[0].login },
    })
    return { status: 'SUCCESS' }
  } catch (e) {
    Sentry.captureException(e)
    throw `onConnected() ${e}`
  }
}

export const provider = {
  urlAuthorize: TWITCH_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
}
