export const TREASURE_WITH_MARKET_SALES_QUERY = gql`
  query FindTreasureWithMarketSalesQuery($tokenId: String!) {
    treasureWithMarketSales(tokenId: $tokenId) {
      id
      tokenId
      ownerId
      createdAt
      marketSales {
        id
        updatedAt
        listedAt
        status
        isClosed
        amount
        sellerId
        buyerId
      }
    }
  }
`

export const LIST_MARKET_SALE_MUTATION = gql`
  mutation listTreasure($tokenId: String!, $amount: Int!) {
    marketSale: listTreasure(tokenId: $tokenId, amount: $amount) {
      id
      updatedAt
      createdAt
      listedAt
      status
      isClosed
      amount
      listTxId
    }
  }
`
export const UNLIST_MARKET_SALE_MUTATION = gql`
  mutation unlistTreasure($tokenId: String!) {
    marketSale: unlistTreasure(tokenId: $tokenId) {
      id
      updatedAt
      createdAt
      listedAt
      status
      isClosed
      amount
      unlistTxId
    }
  }
`
export const BUY_MARKET_SALE_MUTATION = gql`
  mutation buyTreasure($tokenId: String!) {
    marketSale: buyTreasure(tokenId: $tokenId) {
      id
      updatedAt
      listedAt
      createdAt
      status
      isClosed
      amount
      saleTransactions {
        id
      }
    }
  }
`
