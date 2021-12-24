export const schema = gql`
  type MintPurchase {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    member: Member!
    memberId: String!
    treasure: Treasure
    orderId: String
    reservation: String
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
    ): String! @requireAuth
  }
`
