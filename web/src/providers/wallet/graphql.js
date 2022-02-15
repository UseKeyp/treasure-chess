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

export const OAUTH_URL_QUERY = gql`
  query oAuthUrlQuery($type: String!) {
    oAuthUrl(type: $type) {
      url
    }
  }
`
