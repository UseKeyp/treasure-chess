import Games from 'src/components/Game/Games'
import Table from 'src/components/Table'

export const QUERY = gql`
  query GamesForMemberQuery($id: String!) {
    games: gamesForMember(id: $id) {
      id
      endTime
      moveCount
      outcome
      termination
      blackId
      whiteId
      externalUrl
      achievements
      cardColor
      ruleVariant
      termination
      whiteRating
      blackRating
      blackMasterTitle
      whiteMasterTitle
      externalUrl
      timeControl
      winnerId
      winnerUsername
      blackId
      blackUsername
      whiteId
      whiteUsername
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div className="rw-segment p-4">
    <p className="text-black">No games found</p>
  </div>
)

export const Failure = ({ error }) => (
  <div className="rw-segment p-4">
    <p className="text-black">Couldn't load games</p>
  </div>
)

export const Success = ({ games, ...rest }) => {
  // TODO: add sorting/filtering
  return <Games games={games} {...rest} />
}
