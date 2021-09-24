export const schema = gql`
  type Member {
    id: String!
    address: String
    dateJoined: DateTime!
    treasuresOwned: [Treasure]!
    treasuresMinted: [Treasure]!
    treasuresPlayedWhite: [Treasure]!
    treasuresPlayedBlack: [Treasure]!
    treasuresWon: [Treasure]!
    rating: Int!
    imageSrc: String!
    country: String!
    masterTitle: String
    activity: JSON
  }

  type Query {
    members: [Member!]!
    member(id: String!): Member
  }

  input CreateMemberInput {
    address: String!
    dateJoined: DateTime!
    rating: Int!
    imageSrc: String!
    country: String!
    masterTitle: String
  }

  input UpdateMemberInput {
    address: String
    dateJoined: DateTime
    rating: Int
    imageSrc: String
    country: String
    masterTitle: String
  }

  type Mutation {
    createMember(input: CreateMemberInput!): Member!
    updateMember(id: String!, input: UpdateMemberInput!): Member!
    deleteMember(id: String!): Member!
  }
`
