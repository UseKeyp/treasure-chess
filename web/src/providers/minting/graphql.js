export const PENDING_MINT_PURCHASES_QUERY = gql`
  query pendingMintPurchases {
    pendingMintPurchases {
      id
      treasure {
        tokenId
      }
      orderStatus
      status
      paymentType
      gameId
      gameEndTime
      title
      transaction {
        id
        status
      }
    }
  }
`

export const MINT_CHECKOUT_URL_MUTATION = gql`
  mutation mintCheckoutUrl(
    $gameId: String!
    $endTime: DateTime!
    $title: String!
  ) {
    mintCheckoutUrl(gameId: $gameId, endTime: $endTime, title: $title)
  }
`

export const MINT_WITH_CREDIT_MUTATION = gql`
  mutation mintWithCredit(
    $gameId: String!
    $endTime: DateTime!
    $title: String!
  ) {
    mintWithCredit(gameId: $gameId, endTime: $endTime, title: $title) {
      id
      orderStatus
      gameId
      gameEndTime
      title
      status
    }
  }
`
