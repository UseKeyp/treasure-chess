import Treasure from '../Treasure/Treasure'

export const QUERY = gql`
  query FindTreasureQuery($tokenId: String!) {
    treasure: treasure(tokenId: $tokenId) {
      id
      tokenId
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
        username
        address
      }
      minter {
        id
        username
        address
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
      marketSales {
        id
        createdAt
        updatedAt
        listedAt
        treasureId
        seller {
          id
        }
        sellerId
        listTx {
          id
        }
        listTxId
        status
        isClosed
        amount
      }
    }
  }
`

export const Loading = () => <Treasure isLoading />

// eslint-disable-next-line react/no-unescaped-entities
export const Empty = () => <h1>Nothing's Here!</h1>

export const Failure = () => <h1>Oops, something went wrong!</h1>

export const Success = ({ treasure }) => <Treasure treasure={treasure} />
