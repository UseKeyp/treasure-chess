import TreasureSocial from './TreasureSocial'

export const QUERY = gql`
  query TreasureSocialQuery($id: String!) {
    treasure: treasure(id: $id) {
      id
      black {
        username
      }
      white {
        username
      }
      owner {
        username
        id
        address
      }
      minter {
        username
        id
        address
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div></div>

export const Failure = () => (
  <div className="rw-segment p-4">
    <p className="text-black">{`Couldn't load Treasure`}</p>
  </div>
)

export const Success = ({ treasure }) => <TreasureSocial treasure={treasure} />
