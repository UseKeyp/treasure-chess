import Games from 'src/components/Game/Games'

export const QUERY = gql`
  query GamesQuery($filter: String) {
    games: games(filter: $filter) {
      id
      endTime
      white {
        username
        imageSrc
        country
        masterTitle
      }
      black {
        username
        imageSrc
        country
        masterTitle
      }
      gifUrl
      moveCount
      outcome
      termination
      externalUrl
      achievements
      cardColor
      ruleVariant
      termination
      whiteRating
      whiteRatingDelta
      blackRating
      blackRatingDelta
      externalUrl
      timeControl
      tokenId
      title
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

export const Success = ({ games }) => {
  return <Games games={games} />
}
