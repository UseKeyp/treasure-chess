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

  type Mutation {
    oAuthUrl(type: String!): LoginUrl! @requireAuth
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
