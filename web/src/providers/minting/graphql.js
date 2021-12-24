export const PENDING_MINT_PURCHASES_QUERY = gql`
  query pendingMintPurchases {
    pendingMintPurchases {
      id
      createdAt
      updatedAt
      treasure {
        id
      }
      orderId
      reservation
      orderStatus
      gameId
      gameEndTime
      title
      txHash
      txStatus
    }
  }
`

export const MINT_CHECKOUT_URL_QUERY = gql`
  query mintCheckouUrl($gameId: String!, $endTime: DateTime!, $title: String!) {
    mintCheckouUrl(gameId: $gameId, endTime: $endTime, title: $title)
  }
`

export const MINT_WITH_CREDIT_MUTATION = gql`
  mutation mintWithCredit(
    $gameId: String!
    $endTime: DateTime!
    $title: String!
  ) {
    mintWithCredit(gameId: $gameId, endTime: $endTime, title: $title)
  }
`
