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
    masterTitle: String
    activity: JSON
  }

  type Query {
    members: [Member!]! @skipAuth
    member(username: String!): Member @skipAuth
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
`
