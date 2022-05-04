import Sentry from 'src/lib/sentry'
import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'
import { fetchChessMember } from 'src/lib/chessCom/chessCom'
import { logger } from 'src/lib/logger'

export const fetchMemberAndGiveCredits = async (username, creditsToGive) => {
  const member = await db.member.findUnique({
    where: { username: username.toLowerCase() },
  })
  if (member) {
    return await db.member.update({
      where: { id: member.id },
      data: { mintCredits: { increment: creditsToGive } },
    })
  } else if (!member) {
    // Created the member
    const chessData = await fetchChessMember(username)
    if (!chessData.username) throw `Couldn't fetch user ${username}`
    let country = 'US'
    try {
      country = chessData.country.split('country/')[1]
    } catch (e) {
      /* eslint-disable-next-line no-console */
      logger.error('Error calculating member country', e)
    }
    return await db.member.create({
      data: {
        id: chessData.player_id.toString(),
        username: chessData.username,
        mintCredits:
          Number(process.env.MINT_CREDITS_NEW_MEMBER) + creditsToGive,
        ...(chessData.avatar && { imageSrc: chessData.avatar }),
        ...(chessData.masterTitle && {
          masterTitle: chessData.masterTitle,
        }),
        country,
        banned: true,
      },
    })
  }
}

export const fetchMemberAndUpdateBan = async (username, shouldBan) => {
  const member = await db.member.findUnique({
    where: { username: username.toLowerCase() },
  })
  if (member) {
    return await db.member.update({
      where: { id: member.id },
      data: { banned: shouldBan },
    })
  } else if (!member) {
    // Created the member
    const chessData = await fetchChessMember(username)
    if (!chessData.username) throw `Couldn't fetch user ${username}`
    let country = 'US'
    try {
      country = chessData.country.split('country/')[1]
    } catch (e) {
      /* eslint-disable-next-line no-console */
      logger.error('Error calculating member country', e)
    }
    return await db.member.create({
      data: {
        id: chessData.player_id.toString(),
        username: chessData.username,
        mintCredits: Number(process.env.MINT_CREDITS_NEW_MEMBER),
        ...(chessData.avatar && { imageSrc: chessData.avatar }),
        ...(chessData.masterTitle && {
          masterTitle: chessData.masterTitle,
        }),
        country,
        banned: shouldBan,
      },
    })
  }
}

export const fetchMemberAndBlock = async (username, shouldIgnoreAddress) => {
  try {
    const member = await db.member.findUnique({
      where: { username: username.toLowerCase() },
    })
    if (member && (!member.address || shouldIgnoreAddress) && !member.blocked) {
      // Member exist, but should be blocked
      return await db.member.update({
        where: { id: member.id },
        data: { blocked: true },
      })
    } else if (member && !member.address && !member.blocked) {
      // Member didn't get marked blocked correctly
      return await db.member.update({
        where: { id: member.id },
        data: { blocked: true },
      })
    } else if (member && member.blocked) {
      return member
    } else if (!member) {
      // Created the member
      const chessData = await fetchChessMember(username)
      if (!chessData.username) throw `Couldn't fetch user ${username}`
      let country = 'US'
      try {
        country = chessData.country.split('country/')[1]
      } catch (e) {
        /* eslint-disable-next-line no-console */
        logger.error('Error calculating member country', e)
      }
      try {
        return await db.member.create({
          data: {
            id: chessData.player_id.toString(),
            username: chessData.username,
            mintCredits: Number(process.env.MINT_CREDITS_NEW_MEMBER),
            ...(chessData.avatar && { imageSrc: chessData.avatar }),
            ...(chessData.masterTitle && {
              masterTitle: chessData.masterTitle,
            }),
            country,
            blocked: true,
          },
        })
      } catch (e) {
        logger.error(`Error creating user ${username} ${e}`)
      }
    }
    // For members who have signed in, do not change block status
  } catch (e) {
    logger.error(`Error updating user ${username} ${e}`)
  }
}

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
          const memberWithChangedUsername = await db.member.findUnique({
            where: { id: chessData.player_id.toString() },
          })
          if (memberWithChangedUsername) {
            // Update the new username for the member
            member = await db.member.update({
              where: { id: chessData.player_id.toString() },
              data: { username: username.toLowerCase() },
            })
          } else {
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
          }
        } catch (e) {
          // Fixes race condition for creating members
          logger.debug(`Attempts: ${attempts}`)
          if (attempts > 5)
            throw `Error fetching member ${username} ${JSON.stringify(
              chessData
            )} ${e}`
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
