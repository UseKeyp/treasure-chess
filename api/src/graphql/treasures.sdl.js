export const schema = gql`
  type Treasure {
    id: String!
    createdAt: DateTime!
    black: Member!
    blackId: String!
    white: Member!
    whiteId: String!
    winner: Member
    winnerId: String
    minter: Member
    minterAddress: String
    owner: Member
    ownerAddress: String
    name: String!
    updatedAt: DateTime!
    cardColor: String!
    blackRating: Int!
    timeControl: Int!
    whiteRating: Int!
    outcome: String!
    termination: String!
    blackMasterTitle: String
    whiteMasterTitle: String
    endTime: DateTime!
    event: String!
    moves: String!
    moveCount: Int!
    ruleVariant: String!
    externalUrl: String
    opening: String!
    achievements: String!
    tokenId: Int
    mintedAt: DateTime
  }

  type TreasureNftDetails {
    id: String!
    mintedAt: DateTime!
    minter: Member
    minterAddress: String
    owner: Member
    ownerAddress: String
    tokenId: Int
    bids: JSON
    history: JSON
  }

  type Query {
    treasures: [Treasure!]! @skipAuth
    treasure(id: String!): Treasure @skipAuth
    treasureNftDetails(id: String!): TreasureNftDetails @skipAuth
  }

  type Mutation {
    mintTreasure(gameId: String!, endTime: DateTime!, name: String!): Treasure!
      @requireAuth
  }
`
