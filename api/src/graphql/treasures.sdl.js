export const schema = gql`
  type Treasure {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!

    black: Member!
    blackId: String!
    white: Member!
    whiteId: String!
    winner: Member
    winnerId: String
    minter: Member!
    minterId: String!
    owner: Member!
    ownerId: String!

    mintPurchase: MintPurchase
    mintPurchaseId: String
    uriData: String!
    tokenId: Int
    mintedAt: DateTime

    marketSales: [MarketSale!]!

    title: String!
    gifUrl: String!
    cardColor: String!
    blackRating: Int!
    whiteRating: Int!
    blackRatingDelta: Int!
    whiteRatingDelta: Int!
    blackMasterTitle: MasterTitle
    whiteMasterTitle: MasterTitle
    timeControl: Int!
    termination: Termination!
    endTime: DateTime!
    outcome: Outcome!
    event: String!
    moves: String!
    boardLayout: String!
    moveCount: Int!
    ruleVariant: String!
    externalUrl: String
    opening: Opening!
    achievements: [Achievement!]!
    achievementScore: Int!
    rarity: Rarity!
  }

  type TreasureNftDetails {
    id: String!
    mintedAt: DateTime!
    minter: Member
    minterAddress: String
    owner: Member
    ownerAddress: String
    tokenId: Int
    bids: JSON
    history: JSON
  }

  type Query {
    treasuresWithFilter(
      username: String
      filter: String
      owner: String
      sort: String
      page: Int
    ): [Treasure!]! @skipAuth
    treasuresWithFilterCount(
      username: String
      filter: String
      owner: String
    ): Int! @skipAuth
    treasure(tokenId: String!): Treasure @skipAuth
    treasureWithMarketSales(tokenId: String!): Treasure @skipAuth
    treasureNftDetails(tokenId: String!): TreasureNftDetails @skipAuth
  }

  enum Opening {
    QueensGambit
    RuyLopez
    ScotchGame
    KingsPawnGame
    FrenchDefense
    CaroKann
    Scandinavian
    Modern
    English
    RetiOpening
    BirdsOpening
    Uncommon
    NimzoLarsen
    KingsIndianAttack
    Reti
    QueensPawnGame
    Benoni
    QueensIndian
    KingsIndian
    BudapestGambit
    OldIndian
    BenkoGambit
    Dutch
    Alekhine
    Pirc
    Sicilian
    French
    CenterGame
    BishopsOpening
    Vienna
    KingsGambit
    KingsKnightOpening
    Philidor
    Petroff
    ThreeKnights
    FourKnights
    Italian
    EvansGambit
    TwoKnights
    Veresov
    Torre
    Grunfeld
    Catalan
    BogoIndian
    NimzoIndian
  }

  enum Rarity {
    Good
    Great
    Ultra
    Mythic
  }

  enum Outcome {
    black
    white
    draw
  }

  enum Termination {
    Checkmate
    Timeout
    Resignation
    Stalemate
    Time
    Repetition
    Agreement
    Insufficient
    Abandoned
  }

  enum Achievement {
    Player
    Winner750
    Played750
    Winner1500
    Played1500
    Played2000
    BigWinner
    StrongestOpponent
    MythicWinner
    DefeatIM
    DefeatNM
    DefeatGM
    CrissCross
    Jousting
    UtterDisrespect
    TripleDigitClub
    Excessive
    Ultramarathoners
    OpeningExpert
    DontBlink
    FoolsMate
    LeveledField
    Hellomlady
    HorseFarmer
    HolyPromotion
    TheSneakyPawn
    GodModeGlitch
    CuttingitClose
    DejaVu
    TheUnderdog
    CheckinYouOut
    PawnShy
    PawnShopper
    MinorProblem
    MrMarathonMan
    PawnHoarder
    Winner
  }
`
