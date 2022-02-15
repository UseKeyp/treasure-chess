export const schema = gql`
  type LoginUrl {
    type: String!
    text: String
    url: String
  }
  type CodeGrantResponse {
    action: String
    text: String
  }

  type Query {
    oAuthUrl(type: String!): LoginUrl! @requireAuth
    chessLoginUrl: LoginUrl! @skipAuth
  }
  type Mutation {
    oauthCodeGrant(
      code: String!
      state: String!
      type: String!
    ): CodeGrantResponse @skipAuth
  }
`
