import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'
import { getChessMember } from 'src/lib/chessDotCom'

export const fetchMember = async (idOrAddress, includeChessData) => {
  let member
  let memberDetails
  const address = isHexAddress(idOrAddress) ? idOrAddress : null
  const id = !isHexAddress(idOrAddress) ? idOrAddress : null
  member = await db.member.findUnique({
    where: {
      ...(address && { address }),
      ...(id && { id }),
    },
  })
  if (!member && id) {
    // If we have ID, check if exists on Chess.com
    memberDetails = await getChessMember({ accessToken, member })
    if (memberDetails)
      member = await db.member.create({
        data: { id: memberDetails.id, ...memberDetails },
      })
  }

  // Member is not in our database, and cannot find a Chess.com user
  // TODO: Delete this and return null?
  if (!member)
    return {
      address: idOrAddress,
      id: '',
      dateJoined: new Date(0),
      treasuresOwned: (_obj, { root }) => [],
      treasuresMinted: (_obj, { root }) => [],
      treasuresPlayedWhite: (_obj, { root }) => [],
      treasuresPlayedBlack: (_obj, { root }) => [],
      treasuresWon: (_obj, { root }) => [],
      rating: 0,
      imageSrc: '',
      country: '',
    }

  if (includeChessData && !memberDetails) {
    memberDetails = await fetchMemberDetails(member.id)
  }
  // TODO: Cleanup
  // const rating = 999
  // const country = 'USA'
  // const imageSrc = ''
  return { ...member, ...memberDetails }
}
