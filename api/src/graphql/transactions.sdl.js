export const schema = gql`
  type Transaction {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    txStatus: TxStatus!
    MarketSaleList: MarketSale
    MarketSaleUnlist: MarketSale
    MarketSaleSale: MarketSale
  }

  enum TxStatus {
    UNSUBMITTED
    SUBMITTED
    COMPLETE
    FAILED
  }
`
