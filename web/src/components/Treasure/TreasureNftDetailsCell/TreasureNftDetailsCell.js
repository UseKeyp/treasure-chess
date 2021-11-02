import TreasureNftDetails from 'src/components/Treasure/TreasureNftDetails'

export const QUERY = gql`
  query TreasureNftDetailsQuery($id: String!) {
    treasureNftDetails: treasureNftDetails(id: $id) {
      owner {
        id
        address
      }
      minter {
        id
        address
      }
      bids
      history
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div></div>

export const Failure = () => (
  <div className="rw-segment p-4">
    <p className="text-black">{`Couldn't load Treasure NFT Details`}</p>
  </div>
)

export const Success = ({ treasureNftDetails }) => (
  <TreasureNftDetails treasureNftDetails={treasureNftDetails} />
)
