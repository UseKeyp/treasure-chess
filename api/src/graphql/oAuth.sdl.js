export const schema = gql`
  type LoginUrl {
    type: String!
    text: String
    url: String
  }
  type CodeGrantResponse {
    action: String
    text: String
    status: CodeGrantStatus
    ramp: Ramp
  }
  type RevokeResponse {
    status: CodeGrantStatus
  }

  type Query {
    oAuthUrl(type: String!): LoginUrl! @requireAuth
  }
  type Mutation {
    codeGrant(
      type: String!
      code: String!
      state: String
      accountId: String
    ): CodeGrantResponse! @skipAuth
    revokeOAuth(type: String!): RevokeResponse! @requireAuth
  }
  enum CodeGrantStatus {
    SUCCESS
    FAILED
  }
`
