import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { fetchMember } from 'src/lib/members'

export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  rules.skip({ only: ['member', 'members'] })
}

export const members = () => {
  return db.member.findMany()
}

export const member = ({ id }) => {
  return fetchMember(id)
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
