import Games from 'src/components/Game/Games'

export const QUERY = gql`
  query GamesQuery($filter: String, $page: Int) {
    gamesWithFilter(filter: $filter, page: $page) {
      count
      games {
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
        achievements
        achievementScore
        rarity
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
  }
`

export const Loading = () => <Games isLoading />

export const Empty = () => <Games games={[]} count={0} />

export const Failure = () => <Games error />

export const Success = ({ gamesWithFilter: { games, count }, page }) => {
  return <Games games={games} count={count} page={page} />
}
