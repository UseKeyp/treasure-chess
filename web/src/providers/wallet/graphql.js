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
    $toAddress: String!
    $type: String!
  ) {
    transfer(
      tokenAddress: $tokenAddress
      tokenId: $tokenId
      toAddress: $toAddress
      type: $type
    ) {
      status
      hash
    }
  }
`
