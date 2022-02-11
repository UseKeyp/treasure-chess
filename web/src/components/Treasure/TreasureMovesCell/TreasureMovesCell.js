import TreasureMoves from 'src/components/Treasure/TreasureMoves'

export const QUERY = gql`
  query TreasureMovesQuery($tokenId: String!) {
    treasure: treasure(tokenId: $tokenId) {
      id
      moves
      tokenId
      white {
        id
        username
        imageSrc
      }
      black {
        id
        username
        imageSrc
      }
    }
  }
`

export const Loading = () => <TreasureMoves isLoading={true} />

export const Empty = () => <TreasureMoves />

export const Failure = () => (
  <div className="rw-segment p-4">
    <p className="text-black">{`Couldn't load Treasure moves`}</p>
  </div>
)

export const Success = ({ treasure }) => {
  return <TreasureMoves treasure={treasure} />
}
