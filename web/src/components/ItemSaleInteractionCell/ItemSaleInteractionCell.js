import ItemSaleInteraction from 'src/components/ItemSaleInteraction/ItemSaleInteraction'

export const QUERY = gql`
  query marketSalesQuery {
    marketSales {
      id
      createdAt
      updatedAt
      listedAt
      treasureId
      seller {
        id
      }
      sellerId
      listTx {
        id
      }
      listTxId
      status
      isClosed
      amount
    }
  }
`

export const Loading = () => <ItemSaleInteraction isLoading={true} />

export const Empty = () => <div></div>

export const Failure = ({ marketSales }) => (
  <ItemSaleInteraction isError={true} marketSales={marketSales} />
)

export const Success = () => <ItemSaleInteraction />
