export const TREASURE_WITH_MARKET_SALES_QUERY = gql`
  query FindTreasureWithMarketSalesQuery($tokenId: String!) {
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
  mutation listTreasure($tokenId: String!, $amount: Int!) {
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
  mutation unlistTreasure($tokenId: String!) {
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
  mutation listTreasure($tokenId: String!) {
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
