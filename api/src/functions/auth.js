/* eslint-disable-next-line no-unused-vars */
import Sentry from 'src/lib/sentry'

import { DbAuthHandler } from '@redwoodjs/api'
import { InputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { handleOauthCodeGrant } from 'src/lib/oAuth/oAuth'

export const handler = async (event, context) => {
  const authHandler = new DbAuthHandler(event, context, {
    db: db,
    authModelAccessor: 'member',
    authFields: {
      id: 'id',
      username: 'username',
    },
    login: {
      handler: (user) => {
        return user
      },
      errors: {
        usernameOrPasswordMissing: 'Both username and password are required',
        usernameNotFound: 'Username ${username} not found',
        incorrectPassword: 'Username ${username} not found',
      },
      expires: 60 * 60 * 24 * 30, // 30 days
    },
    signup: {
      handler: () => {
        throw new InputError('signUp is not implemented')
      },
    },
  })

  authHandler.login = async () => {
    const { code, state } = authHandler.params
    if (!code || !state)
      throw new InputError('logIn() Code or state not provided.')

    const user = await handleOauthCodeGrant({ state, code })

    const sessionData = { id: user[authHandler.options.authFields.id] }

    // TODO: this needs to go into graphql somewhere so that each request makes
    // a new CSRF token and sets it in both the encrypted session and the
    // csrf-token header
    const csrfToken = DbAuthHandler.CSRF_TOKEN

    const response = [
      sessionData,
      {
        'csrf-token': csrfToken,
        ...authHandler._createSessionHeader(sessionData, csrfToken),
      },
    ]
    return response
  }

  return await authHandler.invoke()
}
