export const schema = gql`
  type Member {
    id: String!
    username: String!
    locale: String
    address: String
    treasuresOwned: [Treasure]!
    treasuresMinted: [Treasure]!
    treasuresPlayedWhite: [Treasure]!
    treasuresPlayedBlack: [Treasure]!
    treasuresWon: [Treasure]!
    marketSalesPurchased: [MarketSale]!
    marketSalesSold: [MarketSale]!
    imageSrc: String
    country: String
    masterTitle: MasterTitle
    twitchUsername: String
  }

  type Profile {
    id: String!
    username: String!
    address: String
    treasuresOwned: [Treasure!]
    treasuresMinted: [Treasure!]
    treasuresPlayedWhite: [Treasure!]
    treasuresPlayedBlack: [Treasure!]
    treasuresWon: [Treasure!]
    imageSrc: String
    country: String
    masterTitle: String
  }

  type MemberBalance {
    usdcBalance: String!
    mintCreditBalance: Int!
  }

  type Query {
    member(usernameOrAddress: String!): Member @skipAuth
    usernames(query: String!, orderBy: UserNameOrderByInput): [String]!
      @skipAuth
    profile: Profile! @requireAuth
    memberBalance: MemberBalance! @requireAuth
  }

  type Mutation {
    userLocale(locale: String!): Member! @requireAuth
  }

  input UserNameOrderByInput {
    username: Sort
    createdAt: Sort
    updatedAt: Sort
    address: Sort
  }

  enum MasterTitle {
    GM
    WGM
    IM
    WIM
    FM
    WFM
    NM
    CM
    WCM
    WNM
  }

  enum Sort {
    asc
    desc
  }
`
