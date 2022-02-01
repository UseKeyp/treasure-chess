import TreasureSocial from 'src/components/Treasure/TreasureSocial'

export const QUERY = gql`
  query TreasureSocialQuery($tokenId: Int!) {
    treasureSocial: treasure(tokenId: $tokenId) {
      id
      tokenId
      black {
        id
        username
      }
      white {
        id
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

export const Loading = () => <TreasureSocial />

export const Empty = () => <div></div>

export const Failure = () => (
  <div className="rw-segment p-4">
    <p className="text-black">{`Couldn't load Treasure`}</p>
  </div>
)

export const Success = ({ treasureSocial }) => (
  <TreasureSocial treasure={treasureSocial} />
)
