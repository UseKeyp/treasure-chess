export const schema = gql`
  type TransferResponse {
    status: TransferStatus!
    hash: String!
  }
  type Mutation {
    transfer(
      tokenAddress: String!
      tokenId: Int!
      toAddress: String!
      type: String!
    ): TransferResponse! @requireAuth
  }
  enum TransferStatus {
    SUCCESS
    FAILED
  }
`
