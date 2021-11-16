import GameCard from 'src/components/Game/GameCard'

export const QUERY = gql`
  query game($id: String!, $username: String!, $endTime: DateTime!) {
    game: game(id: $id, username: $username, endTime: $endTime) {
      id: String!
      black: {
        imageSrc: String!
        country: String!
      }
      white: {
        imageSrc: String!
        country: String
      }
      blackId: String!
      blackUsername: String!
      whiteId: String!
      whiteUsername: String!
      winnerId: String
      winnerUsername: String
      outcome: String!
      termination: String!
      blackRating: Int!
      whiteRating: Int!
      timeControl: String!
      endTime: DateTime!
      event: String!
      moves: String!
      moveCount: Int!
      ruleVariant: String!
      externalUrl: String
      opening: String!
      cardColor: String!
      achievements: String!
      blackMasterTitle: String
      whiteMasterTitle: String
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ game }) => {
  return <GameCard game={game} />
}
