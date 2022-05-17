export const schema = gql`
  type ChainData {
    networkName: String!
    treasureAddress: String!
    marketAddress: String!
    totalSupply: String!
    environment: String
    nodeEnvironment: String
  }

  type Query {
    chainData: ChainData! @skipAuth
    metrics(password: String!): JSON @skipAuth
  }
`
