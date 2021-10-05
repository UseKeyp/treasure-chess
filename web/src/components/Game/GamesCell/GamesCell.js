import Games from 'src/components/Game/Games'

export const QUERY = gql`
  query GamesForMemberQuery($id: String!) {
    games: gamesForMember(id: $id) {
      id
      endTime
      moveCount
      outcome
      termination
      externalUrl
      achievements
      cardColor
      ruleVariant
      termination
      whiteRating
      blackRating
      externalUrl
      timeControl
      winnerUsername
      winnerId
      blackUsername
      blackId
      blackMasterTitle
      whiteUsername
      whiteId
      whiteMasterTitle
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div className="rw-segment p-4">
    <p className="text-black">No games found</p>
  </div>
)

export const Failure = () => (
  <div className="rw-segment p-4">
    <p className="text-black">{`Couldn't load games`}</p>
  </div>
)

export const Success = ({ games, onRowClick }) => {
  return <Games games={games} onRowClick={onRowClick} />
}
