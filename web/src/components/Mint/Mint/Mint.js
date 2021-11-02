import { useLazyQuery } from '@apollo/client'
import MintForm from 'src/components/Mint/MintForm'

const MINT_CHECKOUT_URL = gql`
  query mintCheckoutUrl(
    $gameId: String!
    $endTime: DateTime!
    $title: String!
  ) {
    mintCheckoutUrl(gameId: $gameId, endTime: $endTime, title: $title)
  }
`

const MintTreasure = ({ game }) => {
  const [mintCheckoutUrl, { loading, error }] = useLazyQuery(
    MINT_CHECKOUT_URL,
    {
      onCompleted: ({ mintCheckoutUrl }) => {
        window.open(
          mintCheckoutUrl,
          'Treasure Chess Checkout',
          'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
        )
        // TODO: Update state to start polling for mintPurchase by gameId,gameEndTime,username

        // TODO: Once mintPurchase exists, change UI to show that its actually being minted
        // Show link to transaction on block explorer
      },
    }
  )

  const onSave = (input) => {
    mintCheckoutUrl({
      variables: { gameId: game.id, endTime: game.endTime, title: input.title },
    })
  }

  return (
    <div className="rw-segment">
      <div className="rw-segment-main">
        <MintForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default MintTreasure
