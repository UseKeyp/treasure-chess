export const MEMBER_BALANCE_QUERY = gql`
  query FindMemberBalanceQuery {
    memberBalance {
      usdcBalance
      mintCreditBalance
    }
  }
`
export const TRANSFER_ERC721_MUTATION = gql`
  mutation transfer(
    $tokenAddress: String!
    $tokenId: Int!
    $toAddress: String!
  ) {
    transfer(
      tokenAddress: $tokenAddress
      tokenId: $tokenId
      toAddress: $toAddress
    ) {
      status
      hash
    }
  }
`
export const TRANSFER_ERC20_MUTATION = gql`
  mutation transfer(
    $tokenAddress: String!
    $amount: String!
    $toAddress: String!
  ) {
    transfer(
      tokenAddress: $tokenAddress
      amount: $amount
      toAddress: $toAddress
    ) {
      status
      hash
    }
  }
`
