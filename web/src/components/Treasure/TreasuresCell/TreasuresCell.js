import Treasures from 'src/components/Treasure/Treasures'

export const QUERY = gql`
  query TreasuresSearchQuery(
    $username: String
    $filter: String
    $sort: String
    $page: Int
  ) {
    treasurePage: treasuresWithFilter(
      username: $username
      filter: $filter
      sort: $sort
      page: $page
    ) {
      count
      treasures {
        id
        gifUrl
        createdAt
        black {
          username
          id
          imageSrc
        }
        white {
          username
          id
          imageSrc
        }
        winner {
          username
          id
        }
        title
        cardColor
        blackRating
        blackRatingDelta
        whiteRatingDelta
        blackMasterTitle
        whiteMasterTitle
        timeControl
        termination
        endTime
        outcome
        event
        ruleVariant
        externalUrl
        opening
        achievements
        achievementScore
        rarity
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'No treasures found'}</div>
}

export const Success = ({ treasurePage }) => {
  return (
    <Treasures treasures={treasurePage.treasures} count={treasurePage.count} />
  )
}
