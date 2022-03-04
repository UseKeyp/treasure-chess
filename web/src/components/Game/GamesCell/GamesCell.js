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
      moves
      moveCount
      outcome
      termination
      externalUrl
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

export const Loading = () => <Games isLoading />

export const Empty = () => <Games games={[]} />

export const Failure = () => <Games error />

export const Success = ({ games }) => {
  return <Games games={games} />
}
