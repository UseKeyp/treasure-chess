export const schema = gql`
  type Game {
    id: String!
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

  type Query {
    games(filter: String): [Game!]! @requireAuth
    game(id: String!, username: String!, endTime: DateTime!): Game @skipAuth
  }
`
