import TreasureCard from 'src/components/Treasure/TreasureCard'

export const QUERY = gql`
  query FindTreasureQuery($id: String!) {
    treasure: treasure(id: $id) {
      id
      endTime
      moveCount
      outcome
      cardColor
      title
      ruleVariant
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

export const Empty = () => <div></div>

export const Failure = () => (
  <div className="rw-segment p-4">
    <p className="text-black">{`Couldn't load Treasure`}</p>
  </div>
)

export const Success = ({ treasure }) => {
  return <TreasureCard treasure={treasure} />
}
