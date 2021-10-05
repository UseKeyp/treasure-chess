import GameCard from 'src/components/Game/GameCard'

export const QUERY = gql`
  query GameQuery($id: String!, $username: String!, $endTime: DateTime!) {
    game(id: $id, username: $username, endTime: $endTime) {
      id
      endTime
      moveCount
      outcome
      termination
      blackId
      whiteId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div className="rw-segment p-4">
    <p className="text-black">Couldn't load Game</p>
  </div>
)

export const Success = ({ game }) => {
  return <GameCard game={game} />
}
