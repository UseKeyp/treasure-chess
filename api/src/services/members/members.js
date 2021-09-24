import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { fetchMember } from 'src/lib/members'
import { isHexAddress } from 'src/lib/helpers'

export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const members = () => {
  return db.member.findMany()
}

export const member = ({ id }) => {
  return fetchMember(id)
  // const member = await db.member.findUnique({ where: { id } })
  // return { ...member, }
}

export const createMember = ({ input }) => {
  return db.member.create({
    data: input,
  })
}

export const updateMember = ({ id, input }) => {
  return db.member.update({
    data: input,
    where: { id },
  })
}

export const deleteMember = ({ id }) => {
  return db.member.delete({
    where: { id },
  })
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
