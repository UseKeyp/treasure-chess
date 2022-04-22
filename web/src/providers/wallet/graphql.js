export const MEMBER_BALANCE_QUERY = gql`
  query FindMemberBalanceQuery {
    memberBalance {
      usdcBalance
      mintCreditBalance
    }
  }
`
export const TRANSFER_MUTATION = gql`
  mutation transfer(
    $tokenAddress: String!
    $tokenId: Int!
    $recipientAddress: String!
    $type: String!
  ) {
    transfer(
      tokenAddress: $tokenAddress
      tokenId: $tokenId
      recipientAddress: $recipientAddress
      type: $type
    ) {
      status
      hash
    }
  }
`
