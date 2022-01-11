import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TreasureForm from 'src/components/Treasure/TreasureForm'

const MINT_TREASURE_MUTATION = gql`
  mutation MintTreasureMutation(
    $gameId: String!
    $endTime: DateTime!
    $name: String!
  ) {
    mintTreasure(gameId: $gameId, endTime: $endTime, name: $name) {
      id
    }
  }
`

const MintTreasure = ({ game }) => {
  const [createTreasure, { loading, error }] = useMutation(
    MINT_TREASURE_MUTATION,
    {
      onCompleted: (treasure) => {
        toast.success('Treasure created')
        navigate(routes.treasure({ id: treasure.id }))
      },
    }
  )

  const onSave = (input) => {
    createTreasure({
      variables: { gameId: game.id, endTime: game.endTime, name: input.name },
    })
  }

  return (
    <div className="rw-segment">
      <div className="rw-segment-main">
        <TreasureForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default MintTreasure
