import Sentry from 'src/lib/sentry'
import { AuthenticationError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'

import { fetchMember } from 'src/lib/members'
import { getTorusPublicAddress } from 'src/lib/torus/torus'

export const handleChessLogin = async ({ refreshToken, decoded }) => {
  try {
    // Create member if needed, and get current avatar
    const member = await fetchMember(decoded.preferred_username, true)
    if (member.banned) {
      throw new AuthenticationError('user is banned')
    }
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

    // NOTE: Get Torus wallet address if needed.
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
    return member
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw new AuthenticationError()
  }
}
