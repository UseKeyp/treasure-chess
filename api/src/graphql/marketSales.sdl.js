export const schema = gql`
  type MarketSale {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    listedAt: DateTime!
    treasure: Treasure!
    treasureId: String!
    seller: Member!
    sellerId: String!
    buyer: Member
    buyerId: String
    listTx: Transaction!
    listTxId: String!
    unlistTx: Transaction
    unlistTxId: String
    saleTx: Transaction
    saleTxId: String
    status: MarketSaleStatus!
    isClosed: Boolean!
    amount: Int!
  }

  enum MarketSaleStatus {
    PENDING_LISTED
    LISTED
    PENDING_SOLD
    SOLD
    PENDING_DELISTED
    DELISTED
  }

  type Query {
    marketSales: [MarketSale!]! @requireAuth
  }

  type Mutation {
    unlistTreasure(treasureId: String!): MarketSale! @requireAuth
    buyTreasure(treasureId: String!): MarketSale! @requireAuth
  }

  input CreateMarketSaleInput {
    listedAt: DateTime!
    treasureId: String!
    sellerId: String!
    buyerId: String
    listTxId: String!
    unlistTxId: String
    saleTxId: String
    status: MarketSaleStatus!
    isClosed: Boolean!
    amount: Int!
  }

  input UpdateMarketSaleInput {
    listedAt: DateTime
    treasureId: String
    sellerId: String
    buyerId: String
    listTxId: String
    unlistTxId: String
    saleTxId: String
    status: MarketSaleStatus
    isClosed: Boolean
    amount: Int
  }
`
