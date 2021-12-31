import MemberActivity from 'src/components/Member/MemberActivity'

export const QUERY = gql`
  query FindMemberActivityQuery($address: String!) {
    activity: member(id: $address) {
      activity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = () => (
  <div className="">
    <p className="">{`Couldn't load Member activity`}</p>
  </div>
)

export const Success = ({ activity }) => {
  return <MemberActivity activity={activity} />
}
