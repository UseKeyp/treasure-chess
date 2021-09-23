export const schema = gql`
  type LoginUrl {
    type: String!
    text: String
    url: String
  }
  type Redirect {
    status: String!
  }
  type Query {
    loginUrl: LoginUrl!
  }
  type Mutation {
    oauthCodeGrant(state: String!, code: String!, type: String!): Redirect!
  }
`
