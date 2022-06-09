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

export const RAMP_URL_QUERY = gql`
  query getRampUrl($type: String!, $direction: RampDirection!) {
    getRampUrl(type: $type, direction: $direction) {
      url
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
