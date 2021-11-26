import Treasures from 'src/components/Treasure/Treasures'

export const QUERY = gql`
  query TreasuresSearchQuery(
    $username: String
    $filter: String
    $sort: String
  ) {
    treasures: treasures(username: $username, filter: $filter, sort: $sort) {
      id
      createdAt
      black {
        username
        id
      }
      white {
        username
        id
      }
      winner {
        username
        id
      }
      title
      cardColor
      blackRating
      whiteRating
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
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'No treasures found'}</div>
}

export const Success = ({ treasures }) => {
  return <Treasures treasures={treasures} />
}
