export const schema = gql`
  type LoginUrl {
    type: String!
    text: String
    url: String
  }
  type CodeGrantResponse {
    action: String!
    text: String!
    status: CodeGrantStatus!
  }

  type Query {
    oAuthUrl(type: String!): LoginUrl! @requireAuth
    chessLoginUrl: LoginUrl! @skipAuth
  }
  type Mutation {
    connectPlaid(code: String!, accountId: String!): Ramp! @requireAuth
    codeGrant(code: String!, state: String!, type: String!): CodeGrantResponse!
      @skipAuth
  }
  enum CodeGrantStatus {
    SUCCESS
    FAILED
  }
`
