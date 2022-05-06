import GameCard from 'src/components/Game/GameCard'
import { CardSkeleton } from 'src/components/LoadingSkeleton'
export const QUERY = gql`
  query FindTreasureCardQuery($tokenId: String!) {
    treasureCard: treasure(tokenId: $tokenId) {
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
      owner {
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

export const Empty = () => <div>Nothing here</div>

export const Failure = () => (
  <div>
    <p className="">Nothing here</p>
  </div>
)

export const Success = ({ treasureCard, ...rest }) => {
  return <GameCard game={treasureCard} showGif={true} {...rest} />
}
