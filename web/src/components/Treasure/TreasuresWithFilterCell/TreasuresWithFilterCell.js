export const QUERY = gql`
  query FindTreasuresWithFilterQuery($achievement: String) {
    treasuresWithFilter(achievements: $achievement) {
      id
      endTime
      moveCount
      outcome
      cardColor
      name
      gameRuleVariant
      termination
      achievements
      whiteRating
      blackRating
      blackMasterTitle
      whiteMasterTitle
      externalUrl
      timeControl
      winner {
        id
      }
      black {
        id
      }
      white {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Results</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treasuresWithFilter }) => {
  return <>{treasuresWithFilter.map((treasure) => JSON.stringify(treasure))}</>
}
