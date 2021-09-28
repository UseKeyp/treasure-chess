export const schema = gql`
  type LoginUrl {
    type: String!
    text: String
    url: String
  }
  type Jwt {
    jwt: String!
  }
  type Query {
    loginUrl: LoginUrl!
  }
  type Mutation {
    oauthCodeGrant(state: String!, code: String!, type: String!): Jwt!
  }
`
