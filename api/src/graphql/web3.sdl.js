export const schema = gql`
  type Query {
    getUsdcBalance: String! @skipAuth
  }
`
