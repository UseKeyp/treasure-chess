import Sentry from 'src/lib/sentry'
import { AuthenticationError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'

import { fetchMember } from 'src/lib/members'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { logger } from 'src/lib/logger'

export const onConnected = async ({ refreshToken, decoded }) => {
  try {
    if (!decoded) throw 'no decoded'
    logger.debug(`decoded keys ${Object.keys(decoded).toString()}`)
    logger.debug(`decoded type ${typeof decoded}`)
    const { preferred_username, user_id } = decoded
    logger.debug(`preferred_username ${preferred_username}`)
    logger.debug({ custom: decoded }, 'decoded')
    // Create member if needed, and get current avatar
    const member = await fetchMember(preferred_username, true)
    if (member.banned) {
      throw new AuthenticationError('user is banned')
    }
    if (user_id !== member.id)
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

    // NOTE: Get Torus wallet address if needed.
    if (!member.address) {
      try {
        const publicAddress = await getTorusPublicAddress(member.id)
        await db.member.update({
          where: { id: member.id },
          data: { address: publicAddress },
        })
      } catch (e) {
        logger.error(e, "Error fetching user's wallet from Torus")
      }
    }
    return member
  } catch (e) {
    logger.error(e)
    Sentry.captureException(e)
    throw `onConnected() ${e}`
  }
}
