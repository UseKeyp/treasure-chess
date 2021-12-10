import GameCard from 'src/components/Game/GameCard'

export const QUERY = gql`
  query FindTreasureQuery($tokenId: Int!) {
    treasure: treasure(tokenId: $tokenId) {
      id
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

export const Empty = () => <div></div>

export const Failure = () => (
  <div className="rw-segment p-4">
    <p className="text-black">{`Couldn't load Treasure`}</p>
  </div>
)

export const Success = ({ treasure }) => {
  return <GameCard game={treasure} />
}
