import { useLazyQuery } from '@apollo/client'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
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
      onCompleted: (url) => {
        navigate(url)
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
