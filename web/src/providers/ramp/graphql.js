export const MEMBER_RAMPS_QUERY = gql`
  query FindMemberRampsQuery {
    ramps {
      usdcBalance
      mintCreditBalance
    }
  }
`
