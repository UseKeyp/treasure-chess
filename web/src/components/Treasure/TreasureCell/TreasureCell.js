import Treasure from 'src/components/Treasure/Treasue'

export const QUERY = gql`
  query FindTreasureQuery($tokenId: String!) {
    treasure: treasure(tokenId: $tokenId) {
      tokenId
    }
  }
`

export const Loading = () => <Treasure isLoading />

export const Empty = () => <Treasure notFound />

export const Failure = ({ error }) => <Treasure isError />

export const Success = ({ treasure }) => <Treasure treasure={treasure} />
