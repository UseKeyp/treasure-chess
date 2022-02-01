import TreasureSaleInteraction from 'src/components/Treasure/TreasureSaleInteraction/'

export const QUERY = gql`
  query FindTreasureInteractionQuery($tokenId: Int!) {
    marketSaleByTokenId: marketSaleByTokenId(tokenId: $tokenId) {
      id
    }
  }
`

export const Loading = () => <TreasureSaleInteraction isLoading />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ marketSaleByTokenId }) => {
  return <TreasureSaleInteraction marketSale={marketSaleByTokenId} />
}
