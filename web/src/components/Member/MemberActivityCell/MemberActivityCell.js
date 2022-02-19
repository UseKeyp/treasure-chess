import MemberActivity from 'src/components/Member/MemberActivity'

export const QUERY = gql`
  query FindMemberActivityQuery($usernameOrAddress: String!) {
    memberActivity(usernameOrAddress: $usernameOrAddress) {
      activity
    }
  }
`

export const Loading = () => <MemberActivity isLoading />

export const Empty = () => <div>Empty</div>

export const Failure = () => <MemberActivity activity={[]} />
export const Success = ({ activity }) => {
  return <MemberActivity activity={activity} />
}
