export const schema = gql`
  type Member {
    id: String!
    username: String!
    address: String
    treasuresOwned: [Treasure]!
    treasuresMinted: [Treasure]!
    treasuresPlayedWhite: [Treasure]!
    treasuresPlayedBlack: [Treasure]!
    treasuresWon: [Treasure]!
    imageSrc: String
    country: String
    masterTitle: MasterTitle
    activity: JSON
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
    activity: JSON
  }

  type MemberBalance {
    usdcBalance: String!
    mintCreditBalance: Int!
  }

  type Query {
    members: [Member!]! @skipAuth
    member(usernameOrAddress: String!): Member @skipAuth
    usernames(query: String!): [String]! @skipAuth
    profile: Profile! @requireAuth
    memberBalance: MemberBalance! @requireAuth
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
`
