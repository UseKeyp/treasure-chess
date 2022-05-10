export const schema = gql`
  type Promotion {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    rewardType: PromotionRewardType!
    type: PromotionType!
    mintCredits: Int
    enabled: Boolean!
    members: [PromotionsOnMembers]!
  }

  enum PromotionRewardType {
    MINT_CREDIT
  }
  enum PromotionType {
    TWITCH_CONNECTION
  }

  type Query {
    promotions: [Promotion!]! @requireAuth
    promotion(id: Int!): Promotion @requireAuth
  }

  input CreatePromotionInput {
    rewardType: PromotionRewardType!
    type: PromotionType!
    mintCredits: Int
    enabled: Boolean!
  }

  input UpdatePromotionInput {
    rewardType: PromotionRewardType
    type: PromotionType
    mintCredits: Int
    enabled: Boolean
  }

  type Mutation {
    createPromotion(input: CreatePromotionInput!): Promotion! @requireAuth
    updatePromotion(id: Int!, input: UpdatePromotionInput!): Promotion!
      @requireAuth
    deletePromotion(id: Int!): Promotion! @requireAuth
  }
`
