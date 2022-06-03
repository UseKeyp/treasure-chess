export const schema = gql`
  type MintPurchase {
    id: Int!
    treasure: Treasure
    orderStatus: String!
    gameId: String!
    gameEndTime: String!
    title: String!
    paymentType: String!
    status: String!
    transaction: Transaction
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
      paymentType: String!
    ): String! @requireAuth
    mintWithCredit(
      gameId: String!
      endTime: DateTime!
      title: String!
    ): MintPurchase! @requireAuth
  }
`
