import Treasure from 'src/components/Treasure/Treasure'

export const QUERY = gql`
  query FindTreasureQuery($tokenId: Int!) {
    treasure: treasure(tokenId: $tokenId) {
      id
      tokenId
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
  }
`

export const Loading = () => <Treasure isLoading />

export const Empty = () => <Treasure notFound />

export const Failure = ({ error }) => <Treasure isError />

export const Success = ({ treasure }) => <Treasure treasure={treasure} />
