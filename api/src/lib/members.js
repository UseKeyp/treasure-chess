import Sentry from 'src/lib/sentry'
import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'
import { fetchChessMember } from 'src/lib/chessCom/chessCom'
import { logger } from 'src/lib/logger'

export const fetchMember = async (
  usernameOrAddress,
  includeChessData,
  attempts = 0
) => {
  try {
    let member
    let chessData
    let username
    let address
    isHexAddress(usernameOrAddress)
      ? (address = usernameOrAddress)
      : (username = usernameOrAddress)
    member = await db.member.findUnique({
      where: {
        ...(address && { address }),
        ...(username && { username: username.toLowerCase() }),
      },
    })
    // Not in our db, but we have username. Or, we want extra data from chess.com
    if ((!member && username) || includeChessData) {
      chessData = await fetchChessMember(username)
      if (!chessData.username) return null
      let country = 'US'
      try {
        country = chessData.country.split('country/')[1]
      } catch (e) {
        /* eslint-disable-next-line no-console */
        logger.error('Error calculating member country', e)
      }
      if (!member) {
        // Create member if they don't exist (relationship required for treasures)
        try {
          member = await db.member.create({
            data: {
              id: chessData.player_id.toString(),
              username: chessData.username,
              mintCredits: Number(process.env.MINT_CREDITS_NEW_MEMBER),
              ...(chessData.avatar && { imageSrc: chessData.avatar }),
              ...(chessData.masterTitle && {
                masterTitle: chessData.masterTitle,
              }),
              country,
            },
          })
        } catch (e) {
          // Fixes race condition for creating members
          logger.debug(`Attempts: ${attempts}`)
          if (attempts > 5) throw 'Error fetching member'
          return fetchMember(usernameOrAddress, includeChessData, attempts + 1)
        }
      }
      return {
        ...member,
        refreshToken: 'REDACTED',
        ...chessData,
        // Overwrite with current values from chess.com
        imageSrc: chessData.avatar,
        masterTitle: chessData.title,
        country,
      }
    } else if (!member && address) {
      // Create external wallet user
      member = await db.member.create({
        data: {
          id: address.toLowerCase(),
          username: address.toLowerCase(),
          address: address.toLowerCase(),
          mintCredits: 0,
          country: 'ETHER',
        },
      })
    }
    return {
      ...member,
      refreshToken: 'REDACTED',
    }
  } catch (e) {
    logger.error(e)
    Sentry.captureException(e)
    throw `fetchMember() ${e}`
  }
}
