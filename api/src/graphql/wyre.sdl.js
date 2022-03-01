export const schema = gql`
  type Query {
    wyreDepositUrl: String! @requireAuth
    wyreWithdrawUrl: String! @requireAuth
  }
`
