import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { fetchMember } from 'src/lib/members'
import { getUsdcBalance as getUsdcBal } from 'src/lib/web3/tokens.js'

export const member = ({ usernameOrAddress }) => {
  try {
    return fetchMember(usernameOrAddress)
  } catch (e) {
    logger.error(e)
    return null
  }
}

export const profile = () => fetchMember(context.currentUser.username)

export const usernames = async ({ query }) => {
  const members = await db.member.findMany({
    take: 6,
    where: {
      username: {
        contains: query,
      },
    },
  })
  return members.map((member) => member.username)
}

export const userLocale = async ({ locale }) => {
  try {
    const member = await db.member.update({
      where: { id: context.currentUser.id },
      data: { locale: locale },
    })
    return member
  } catch (e) {
    throw `userLocale() ${e}`
  }
}

export const memberBalance = async () => {
  const usdcBalance = await getUsdcBal(context.currentUser.address)
  return {
    usdcBalance,
    mintCreditBalance:
      context.currentUser.mintCredits *
      process.env.WYRE_MINT_USD_PURCHASE_AMOUNT,
  }
}

export const memberRamps = async () => {
  const member = await db.member.findUnique({
    where: { id: context.currentUser.id },
  })

  return {
    coinbaseWithdrawAddress: member.coinbaseWithdrawAddress,
    wyreWithdrawAddress: member.wyreWithdrawAddress,
  }
}
// export const memberActivity = (usernameOrAddress) => getMemberActivity()

export const Member = {
  treasuresOwned: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresOwned(),
  treasuresMinted: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresMinted(),
  treasuresPlayedWhite: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresPlayedWhite(),
  treasuresPlayedBlack: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresPlayedBlack(),
  treasuresWon: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresWon(),
  locale: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).locale(),
}
