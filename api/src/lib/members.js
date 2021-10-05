import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'
import { fetchChessMember } from 'src/lib/chessCom/chessCom'

export const fetchMember = async (usernameOrAddress, includeChessData) => {
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
        ...(username && { username }),
      },
    })

    // Not in our db, but we have username. Or, we want extra data from chess.com
    if ((!member && username) || includeChessData) {
      chessData = await fetchChessMember(username)
      let country = 'US'
      try {
        country = chessData.country.split('country/')[1]
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.log('Error calculating member country', e)
      }
      if (!member) {
        // Create member if they don't exist (relationship required for treasures)
        member = await db.member.create({
          data: {
            id: chessData.player_id.toString(),
            username: chessData.username,
            ...(chessData.avatar && { imageSrc: chessData.avatar }),
            ...(chessData.masterTitle && {
              masterTitle: chessData.masterTitle,
            }),
            country,
          },
        })
      }
      return {
        ...member,
        ...chessData,
        // Overwrite with current values from chess.com
        imageSrc: chessData.avatar,
        masterTitle: chessData.title,
        country,
      }
    }
    return member
  } catch (e) {
    throw new Error(`fetchMember() ${e}`)
  }
}
