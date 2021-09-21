export const schema = gql`
  type LoginUrl {
    type: String!
    text: String
    url: String
  }
  type Redirect {
    url: String!
  }
  type Query {
    loginUrl: LoginUrl!
  }
  type Mutation {
    oauthCodeGrant(
      oauthState: String
      code: String
      type: String!
      signature: String
      userId: String
    ): Redirect!
  }
`
