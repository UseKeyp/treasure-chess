import { AuthenticationError } from '@redwoodjs/graphql-server'

import { CHESS } from 'src/lib/oAuth/providers/chess'

const APPROVED_LOGIN_PROVIDERS = [CHESS]

export const validateLoginRequest = ({ type }) => {
  if (!APPROVED_LOGIN_PROVIDERS.includes(type)) {
    throw new AuthenticationError('OAuth provider not available for login.')
  }
}
