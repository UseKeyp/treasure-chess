export const WYRE_DEPOSIT_URL_QUERY = gql`
  query wyreDepositUrlQuery {
    wyreDepositUrl
  }
`
export const MEMBER_BALANCE_QUERY = gql`
  query FindMemberBalanceQuery {
    memberBalance {
      usdcBalance
      mintCreditBalance
    }
  }
`
