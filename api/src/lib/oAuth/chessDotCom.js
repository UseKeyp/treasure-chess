import fetch from 'cross-fetch'
import { AuthenticationError } from '@redwoodjs/api'

const API_URL = process.env.CHESS_OAUTH_URL

export const CHESS_SCOPE = 'openid profile'

const getExpiration = (expiresIn) =>
  new Date(new Date(Date.now() + expiresIn * 1000))

export const getChessAccessTokenFromCode = async (code: string) => {
  const body = {
    client_id: process.env.CHESS_CLIENT_ID,
    client_secret: process.env.CHESS_CLIENT_SECRET,
    redirect_uri: process.env.PUBLIC_REDIRECT_URL + '/chess',
    grant_type: 'authorization_code',
    scope: CHESS_SCOPE,
    code,
  }
  const encodedBody = Object.keys(body)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&')
  const response = await fetch(API_URL + '/token', {
    method: 'post',
    body: encodedBody,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  }).then((res) => res.json())
  return {
    accessToken: response?.access_token,
    refreshToken: response?.refresh_token,
    expiration: getExpiration(response?.expires_in),
  }
}
