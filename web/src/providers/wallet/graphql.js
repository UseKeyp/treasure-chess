export const MEMBER_BALANCE_QUERY = gql`
  query FindMemberBalanceQuery {
    memberBalance {
      usdcBalance
      mintCreditBalance
    }
  }
`
export const TRANSFER_ERC20 = gql`
  mutation transferErc20(
    $tokenAddress: String!
    $recipientAddress: String!
    $amount: String!
  ) {
    transferErc20(
      tokenAddress: $tokenAddress
      recipientAddress: $recipientAddress
      amount: $amount
    )
  }
`
