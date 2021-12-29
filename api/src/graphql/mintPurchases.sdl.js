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
  }

  type Query {
    mintPurchases: [MintPurchase!]! @requireAuth
    pendingMintPurchases: [MintPurchase!]! @requireAuth
    mintCheckoutUrl(
      gameId: String!
      endTime: DateTime!
      title: String!
    ): String! @requireAuth
  }
  type Mutation {
    mintWithCredit(
      gameId: String!
      endTime: DateTime!
      title: String!
    ): MintPurchase! @requireAuth
  }
`
