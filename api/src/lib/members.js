import { formatEther } from '@ethersproject/units'

import Sentry from 'src/lib/sentry'
import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'
import { fetchChessMember } from 'src/lib/chessCom/chessCom'
import { logger } from 'src/lib/logger'

import { refreshChessTokens } from 'src/lib/oAuth/providers/chess'

import { web3Provider } from 'src/lib/web3/helpers'
import { getUsdcBalance } from 'src/lib/web3/tokens'

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

export const fetchMemberAndUpdateBetaAccess = async (
  username,
  shouldGrantAccess
) => {
  const member = await db.member.findUnique({
    where: { username: username.toLowerCase() },
  })
  if (member) {
    return await db.member.update({
      where: { id: member.id },
      data: { betaAccess: shouldGrantAccess },
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
        betaAccess: shouldGrantAccess,
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
      ? (address = usernameOrAddress.toLowerCase())
      : (username = usernameOrAddress.toLowerCase())
    member = await db.member.findUnique({
      where: {
        ...(address && { address }),
        ...(username && { username }),
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
              data: { username },
            })
          } else {
            member = await db.member.create({
              data: {
                id: chessData.player_id.toString(),
                username: chessData.username,
                mintCredits: Number(process.env.MINT_CREDITS_NEW_MEMBER),
                ...(chessData.avatar && { imageSrc: chessData.avatar }),
                ...(chessData.title && {
                  masterTitle: chessData.title,
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
          id: address,
          username: address,
          address: address,
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

// NOTE: For internal use only!
// Currently used only for Chester Discord bot
export const getMemberRawData = async (username) => {
  let member = await db.member.findUnique({
    where: { username },
    include: {
      treasuresOwned: true,
      treasuresMinted: true,
      marketSalesSold: { include: { buyer: { select: { username: true } } } },
      marketSalesPurchased: {
        include: { seller: { select: { username: true } } },
      },
      mintPurchases: {
        include: { staleTransactions: true, transaction: true },
      },
      depositOrders: true,
    },
  })
  if (!member) throw 'Member not found'
  const details = {
    treasuresOwned: member.treasuresOwned,
    treasuresMinted: member.treasuresMinted,
    marketSalesSold: member.marketSalesSold,
    marketSalesPurchased: member.marketSalesPurchased,
    mintPurchases: member.mintPurchases,
    depositOrders: member.depositOrders,
  }
  Object.keys(details).map((key) => delete member[key])
  delete member.refreshToken

  let usdcBalance
  let etherBalance
  try {
    usdcBalance = await getUsdcBalance(member.address)
    etherBalance = await web3Provider.getBalance(member.address)
    etherBalance = formatEther(etherBalance)
  } catch {
    // Do nothing
  }
  let ramps = await db.ramp.findMany({
    where: { memberId: member.id },
    orderBy: { createdAt: 'desc' },
    include: { RampWithdraw: { include: { transaction: true } } },
  })
  ramps = ramps.map((ramp) => ({
    ...ramp,
    accessToken: 'REDACTED',
    refreshToken: 'REDACTED',
  }))
  return {
    member: { ...member, accessToken: 'REDACTED', refreshToken: 'REDACTED' },
    web3: { etherBalance, usdcBalance },
    ...details,
    ramps,
  }
}

export const getAccessToken = async () => {
  const member = await db.member.findUnique({
    where: { id: context.currentUser.id },
    select: { accessToken: true, refreshToken: true },
  })
  if (!member) throw 'No member found'
  let accessToken = member.accessToken
  if (!accessToken) {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await refreshChessTokens(member.refreshToken)
    await db.member.update({
      where: { id: context.currentUser.id },
      data: {
        refreshToken: newRefreshToken,
        accessToken: newAccessToken,
      },
    })
    accessToken = newAccessToken
  }
  return accessToken
}
