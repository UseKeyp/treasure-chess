import GameCard from 'src/components/Game/GameCard'
import { CardSkeleton } from 'src/components/LoadingSkeleton'
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
      gifUrl
      cardColor
      blackRating
      blackMasterTitle
      whiteMasterTitle
      timeControl
      termination
      endTime
      outcome
      tokenId
      moves
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

export const Loading = () => <CardSkeleton />

export const Empty = () => <div></div>

export const Failure = () => (
  <div>
    <p className="">{`Error loading Treasure`}</p>
  </div>
)

export const Success = ({ treasure }) => {
  return <GameCard game={treasure} />
}
