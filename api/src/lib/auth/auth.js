import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'
import Sentry from 'src/lib/sentry'

import { db } from 'src/lib/db'

export const getCurrentUser = async (session) => {
  let member
  if (process.env.IMPERSONATE_USERNAME) {
    member = await db.member.findUnique({
      where: { username: process.env.IMPERSONATE_USERNAME },
      // Warning: don't send any confidential data here
      select: {
        id: true,
        username: true,
        twitchUsername: true,
        address: true,
        imageSrc: true,
        locale: true,
        mintCredits: true,
        country: true,
        banned: true,
        betaAccess: true,
      },
    })
  } else {
    member = await db.member.findUnique({
      where: { id: session.id },
      // Warning: don't send any confidential data here
      select: {
        id: true,
        username: true,
        twitchUsername: true,
        address: true,
        imageSrc: true,
        locale: true,
        mintCredits: true,
        country: true,
        banned: true,
        betaAccess: true,
      },
    })
  }
  if (!member) return null
  // WARNING: Returned values here are exposed to the FE
  // Don't include any Chess.com access tokens here

  if (member.banned) {
    throw new Error('user is banned')
  }

  Sentry.setUser(member)
  return member
}

export const isAuthenticated = () => {
  return !!context.currentUser
}

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param {string | string[]} roles - A single role or list of roles to check if the user belongs to
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = ({ roles }) => {
  if (!isAuthenticated()) {
    return false
  }
  if (roles) {
    if (Array.isArray(roles)) {
      return context.currentUser.roles?.some((r) => roles.includes(r))
    }
    if (typeof roles === 'string') {
      return context.currentUser.roles?.includes(roles)
    }
    // roles not found
    return false
  }
  return true
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param {string= | string[]=} roles - A single role or list of roles to check if the user belongs to
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 * @throws {ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ roles } = {}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError('You must be logged in to do that.')
  }

  if (!hasRole({ roles })) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}

/**
 * Checks if currentUser is a member of the beta program and will throw an error if not
 *
 * @throws {ForbiddenError} If the currentUser is not a member of the beta program
 */
export const betaAccess = () => {
  if (!context.currentUser.betaAccess) {
    throw new ForbiddenError("You don't have access to that")
  }
}
