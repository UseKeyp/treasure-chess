import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { getUsdcBalance as getUsdcBal } from 'src/lib/web3/tokens.js'

export const members = () => {
  return db.member.findMany()
}

export const member = ({ usernameOrAddress }) => {
  return fetchMember(usernameOrAddress)
}

export const profile = () => {
  // TODO: Need to add more data here? Or do this in downstream requests?
  return fetchMember(context.currentUser.username)
}

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

export const memberBalance = async () => {
  const usdcBalance = await getUsdcBal(context.currentUser.address)
  return {
    usdcBalance,
    mintCreditBalance: context.currentUser.mintCredits,
  }
}

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
}
