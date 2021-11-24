import Games from 'src/components/Game/Games'

export const QUERY = gql`
  query GamesQuery($filter: String) {
    games: games(filter: $filter) {
      id
      endTime
      white {
        imageSrc
        country
      }
      black {
        imageSrc
        country
      }
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

export const Empty = () => <Games games={[]} />

export const Failure = () => (
  <div className="">
    <p className="text-white">{`Couldn't load games`}</p>
  </div>
)

export const Success = ({ games, onMintClick }) => {
  return <Games games={games} onMintClick={onMintClick} />
}
