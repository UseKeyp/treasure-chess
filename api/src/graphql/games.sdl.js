export const schema = gql`
  type Game {
    id: String!
    blackId: String!
    whiteId: String!
    outcome: String!
    termination: String!
    blackRating: Int!
    whiteRating: Int!
    timeControl: Int!
    endTime: DateTime!
    event: String!
    moves: String!
    moveCount: Int!
    gameRuleVariant: String!
    externalUrl: String
    opening: String!
    treasureId: String
  }

  type Query {
    games(id: String!): [Game!]! @skipAuth
    game(id: String!, memberId: String!, endTime: DateTime!): Game @skipAuth
  }
`
