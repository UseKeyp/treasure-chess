export const schema = gql`
  type LoginUrl {
    type: String!
    text: String
    url: String
  }
  type Query {
    loginUrl: LoginUrl! @skipAuth
  }
`
