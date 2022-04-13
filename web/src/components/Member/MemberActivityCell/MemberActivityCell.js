import MemberActivity from 'src/components/Member/MemberActivity'

export const QUERY = gql`
  query FindMemberActivityQuery($usernameOrAddress: String!) {
    member(usernameOrAddress: $usernameOrAddress) {
      id
      username
      treasuresMinted {
        id
        createdAt
        title
        tokenId
        achievementScore
      }
      treasuresWon {
        id
        title
        tokenId
        achievementScore
        marketSales {
          id
          status
          updatedAt
          buyer {
            id
            username
          }
        }
      }
    }
  }
`

export const Loading = () => <MemberActivity isLoading />

export const Empty = () => <div>Empty</div>

export const Failure = () => <MemberActivity member={[]} />
export const Success = ({ member, refetch }) => {
  return <MemberActivity member={member} refetch={refetch} />
}
