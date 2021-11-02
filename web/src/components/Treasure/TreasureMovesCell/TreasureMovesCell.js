import TreasureMoves from 'src/components/Treasure/TreasureMoves'

export const QUERY = gql`
  query TreasureMovesQuery($id: String!) {
    treasure: treasure(id: $id) {
      id
      moves
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <TreasureMoves />

export const Failure = () => (
  <div className="rw-segment p-4">
    <p className="text-black">{`Couldn't load Treasure moves`}</p>
  </div>
)

export const Success = ({ treasure }) => {
  return <TreasureMoves treasure={treasure} />
}
