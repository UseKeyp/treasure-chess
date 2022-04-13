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
  }
  enum CodeGrantStatus {
    SUCCESS
    FAILED
  }
`
