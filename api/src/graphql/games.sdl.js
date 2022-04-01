export const schema = gql`
  type Game {
    id: String!
    black: Member
    white: Member
    winner: Member
    outcome: Outcome!
    termination: Termination!
    gifUrl: String!
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
    opening: Opening!
    cardColor: String!
    achievements: [String!]
    achievementScore: Int
    rarity: Rarity
    tokenId: Int
    title: String
  }

  type GamesWithFilterResponse {
    games: [Game!]!
    count: Int!
  }
  type Query {
    gamesWithFilter(filter: String, page: Int): GamesWithFilterResponse!
      @requireAuth
  }
`
