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
    getRampUrl(type: String!, direction: RampDirection!): LoginUrl! @requireAuth
  }
  type Mutation {
    getRampUrl(type: String!, direction: RampDirection!): LoginUrl! @requireAuth
    rampWithdraw(type: String, amount: String!): Transaction! @requireAuth
  }
  enum RampDirection {
    ON
    OFF
  }
  enum RampType {
    WYRE
    COINBASE
  }
`
