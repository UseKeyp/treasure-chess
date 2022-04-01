export const MEMBER_RAMPS_QUERY = gql`
  query FindMemberRampsQuery {
    ramps {
      id
      address
      accountNickname
      isoCurrencyCode
      type
      createdAt
    }
  }
`
export const WYRE_DEPOSIT_URL_QUERY = gql`
  query wyreDepositUrlQuery {
    wyreDepositUrl
  }
`

export const OAUTH_URL_QUERY = gql`
  query oAuthUrlQuery($type: String!) {
    oAuthUrl(type: $type) {
      url
      type
      text
    }
  }
`

export const RAMP_WITHDRAW_MUTATION = gql`
  mutation rampWithdrawMutation($type: String!, $amount: String!) {
    rampWithdraw(type: $type, amount: $amount) {
      id
    }
  }
`
