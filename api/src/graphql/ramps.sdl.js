export const schema = gql`
  type Ramp {
    id: String!
    address: String!
    accountNickname: String
    isoCurrencyCode: String
    type: RampType!
    createdAt: DateTime!
  }
  type Query {
    ramps: [Ramp]! @requireAuth
  }
  type Mutation {
    rampWithdraw(type: String, amount: String!): Transaction! @requireAuth
  }

  enum RampType {
    WYRE
    COINBASE
  }
`
