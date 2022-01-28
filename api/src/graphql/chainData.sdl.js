export const schema = gql`
  type ChainData {
    networkName: String!
    treasureAddress: String!
    marketAddress: String!
    totalSupply: String!
  }

  type Query {
    chainData: ChainData! @skipAuth
  }
`
