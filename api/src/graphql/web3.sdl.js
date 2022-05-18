export const schema = gql`
  type TransferResponse {
    status: TransferStatus!
    hash: String!
  }
  type Mutation {
    transferErc721(
      tokenAddress: String!
      tokenId: Int!
      toAddress: String!
    ): TransferResponse! @requireAuth
    transferErc20(
      tokenAddress: String!
      amount: String!
      toAddress: String!
    ): TransferResponse! @requireAuth
  }
  enum TransferStatus {
    SUCCESS
    FAILED
  }
`
