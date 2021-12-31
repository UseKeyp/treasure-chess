export const schema = gql`
  type Treasure {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!

    black: Member!
    blackId: String!
    white: Member!
    whiteId: String!
    winner: Member
    winnerId: String
    minter: Member!
    minterId: String!
    owner: Member!
    ownerId: String!

    mintPurchase: MintPurchase
    mintPurchaseId: String
    uriData: String!
    tokenId: Int
    mintedAt: DateTime

    title: String!
    gifUrl: String!
    cardColor: String!
    blackRating: Int!
    whiteRating: Int!
    blackRatingDelta: Int!
    whiteRatingDelta: Int!
    blackMasterTitle: String
    whiteMasterTitle: String
    timeControl: Int!
    termination: String!
    endTime: DateTime!
    outcome: String!
    event: String!
    moves: String!
    boardLayout: String!
    moveCount: Int!
    ruleVariant: String!
    externalUrl: String
    opening: String!
    achievements: String!
    achievementScore: Int!
    rarity: String!
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
    treasuresWithFilter(
      username: String
      filter: String
      sort: String
      page: Int
    ): [Treasure!]! @skipAuth
    treasuresWithFilterCount(username: String, filter: String): Int! @skipAuth
    treasure(tokenId: Int!): Treasure @skipAuth
    treasureNftDetails(tokenId: Int!): TreasureNftDetails @skipAuth
  }
`
