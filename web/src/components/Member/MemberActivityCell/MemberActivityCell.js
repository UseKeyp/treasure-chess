import MemberActivity from 'src/components/Member/MemberActivity'

export const QUERY = gql`
  query FindMemberActivityQuery($usernameOrAddress: String!) {
    member(usernameOrAddress: $usernameOrAddress) {
      treasuresMinted {
        createdAt
        id
        title
        tokenId
        achievementScore
      }
      treasuresWon {
        createdAt
        tokenId
        id
        title
        achievementScore
      }
    }
  }
`

export const Loading = () => <MemberActivity isLoading />

export const Empty = () => <div>Empty</div>

export const Failure = () => <MemberActivity member={[]} />
export const Success = ({ member }) => {
  return <MemberActivity member={member} />
}
