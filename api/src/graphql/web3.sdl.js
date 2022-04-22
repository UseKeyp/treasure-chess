export const schema = gql`
  type TransferResponse {
    status: TransferStatus!
    hash: String!
  }
  type Mutation {
    transfer(
      tokenAddress: String!
      tokenId: Int!
      recipientAddress: String!
      type: String!
    ): TransferResponse! @requireAuth
  }
  enum TransferStatus {
    SUCCESS
    FAILED
  }
`
