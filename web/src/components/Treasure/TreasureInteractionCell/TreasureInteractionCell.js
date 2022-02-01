import ItemSaleInteraction from 'src/components/ItemSaleInteraction/'

export const QUERY = gql`
  query FindTreasureInteractionQuery($tokenId: Int!) {
    marketSaleByTokenId: marketSaleByTokenId(tokenId: $tokenId) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ marketSaleByTokenId }) => {
  return <ItemSaleInteraction marketSale={marketSaleByTokenId} />
}
