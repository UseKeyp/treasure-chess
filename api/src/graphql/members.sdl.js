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

  input CreateMemberInput {
    address: String!
    rating: Int!
    imageSrc: String!
    country: String!
    masterTitle: String
  }

  input UpdateMemberInput {
    address: String
    rating: Int
    imageSrc: String
    country: String
    masterTitle: String
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
    IM
    NM
  }
`
