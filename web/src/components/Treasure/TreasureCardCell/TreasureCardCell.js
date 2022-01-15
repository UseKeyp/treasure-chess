import GameCard from 'src/components/Game/GameCard'
import { CardSkeleton } from 'src/components/LoadingSkeleton'
export const QUERY = gql`
  query FindTreasureQuery($tokenId: Int!) {
    treasure: treasure(tokenId: $tokenId) {
      id
      createdAt
      black {
        username
        country
        imageSrc
        id
      }
      white {
        imageSrc
        country
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
      blackRatingDelta
      whiteRatingDelta
      blackMasterTitle
      whiteMasterTitle
      timeControl
      termination
      endTime
      outcome
      event
      moves
      gifUrl
      boardLayout
      ruleVariant
      externalUrl
      opening
      achievements
      achievementScore
      rarity
      tokenId
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
  return <GameCard game={treasure} showGif={true} />
}
