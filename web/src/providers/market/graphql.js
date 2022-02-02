export const TREASURE_WITH_MARKET_SALES_QUERY = gql`
  query FindTreasureWithMarketSalesQuery($tokenId: Int!) {
    treasureWithMarketSales: treasure(tokenId: $tokenId) {
      id
      tokenId
      ownerId
      marketSales {
        id
        updatedAt
        listedAt
        status
        isClosed
        amount
      }
    }
  }
`

export const LIST_MARKET_SALE_MUTATION = gql`
  mutation listTreasure($tokenId: Int!, $amount: Int!) {
    listTreasure(tokenId: $tokenId, amount: $amount) {
      id
      updatedAt
      listedAt
      status
      isClosed
      amount
    }
  }
`
export const UNLIST_MARKET_SALE_MUTATION = gql`
  mutation unlistTreasure($tokenId: Int!) {
    unlistTreasure(tokenId: $tokenId) {
      id
      updatedAt
      listedAt
      status
      isClosed
      amount
    }
  }
`
export const BUY_MARKET_SALE_MUTATION = gql`
  mutation listTreasure($tokenId: Int!) {
    buyTreasure(tokenId: $tokenId) {
      id
      updatedAt
      listedAt
      status
      isClosed
      amount
    }
  }
`
