import { AuthenticationError } from '@redwoodjs/graphql-server'

import { types } from 'src/lib/oAuth/providers'

const APPROVED_LOGIN_PROVIDERS = [types.CHESS]

export const validateLoginRequest = ({ type }) => {
  if (!APPROVED_LOGIN_PROVIDERS.includes(type)) {
    throw new AuthenticationError('OAuth provider not avaialble for login.')
  }
}
