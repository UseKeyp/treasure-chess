export const schema = gql`
  type MintPurchase {
    id: Int!
    treasure: Treasure
    orderStatus: String!
    gameId: String!
    gameEndTime: String!
    title: String!
    txHash: String
    txStatus: String!
    paymentType: String!
  }

  type Query {
    mintPurchases: [MintPurchase!]! @requireAuth
    pendingMintPurchases: [MintPurchase!]! @requireAuth
  }
  type Mutation {
    mintCheckoutUrl(
      gameId: String!
      endTime: DateTime!
      title: String!
    ): String! @requireAuth
    mintWithCredit(
      gameId: String!
      endTime: DateTime!
      title: String!
    ): MintPurchase! @requireAuth
  }
`
