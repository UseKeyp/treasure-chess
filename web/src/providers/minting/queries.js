import { useQuery, useLazyQuery } from '@apollo/client'

const WYRE_DEPOSIT_URL = gql`
  query mintCheckouUrl($gameId: String!, $endTime: DateTime!, $title: String!) {
    mintCheckouUrl(gameId: $gameId, endTime: $endTime, title: $title)
  }
`

export const queryWyreCheckoutUrl = ({ onCompleted }) => {
  const [addFunds, { error: _addFundsError }] = useLazyQuery(WYRE_DEPOSIT_URL, {
    onCompleted,
  })
}
