import MemberActivity from 'src/components/MemberActivity/MemberActivity'

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
  <div className="rw-segment p-4">
    <p className="text-black">{`Couldn't load Member activity`}</p>
  </div>
)

export const Success = ({ activity }) => {
  return <MemberActivity activity={activity} />
}
