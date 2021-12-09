export const schema = gql`
  type Game {
    id: String!
    black: Member
    white: Member
    winner: Member
    outcome: String!
    termination: String!
    blackRating: Int!
    blackRatingDelta: String!
    whiteRating: Int!
    whiteRatingDelta: String!
    timeControl: String!
    endTime: DateTime!
    event: String!
    moves: String!
    moveCount: Int!
    ruleVariant: String!
    externalUrl: String
    opening: String!
    cardColor: String!
    achievements: String
    tokenId: Int
    title: String
  }

  type Query {
    games(filter: String): [Game!]! @requireAuth
  }
`
