export const MEMBER_RAMPS_QUERY = gql`
  query FindMemberRampsQuery {
    memberRamps {
      coinbaseWithdrawAddress
      wyreWithdrawAddress
    }
  }
`
