export const MEMBER_BALANCE_QUERY = gql`
  query FindMemberBalanceQuery {
    memberBalance {
      usdcBalance
      mintCreditBalance
    }
  }
`
export const TRANSFER_ERC721_MUTATION = gql`
  mutation transferErc721(
    $tokenAddress: String!
    $tokenId: Int!
    $toAddress: String!
  ) {
    transferErc721(
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
  mutation transferErc20(
    $tokenAddress: String!
    $amount: String!
    $toAddress: String!
  ) {
    transferErc20(
      tokenAddress: $tokenAddress
      amount: $amount
      toAddress: $toAddress
    ) {
      status
      hash
    }
  }
`
