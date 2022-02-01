-- CreateEnum
CREATE TYPE "MarketSaleStatus" AS ENUM ('PENDING_LISTED', 'LISTED', 'PENDING_SOLD', 'SOLD', 'PENDING_DELISTED', 'DELISTED');

-- CreateEnum
CREATE TYPE "TxStatus" AS ENUM ('UNSUBMITTED', 'SUBMITTED', 'COMPLETE', 'FAILED');

-- CreateEnum
CREATE TYPE "MintPurchaseOrderStatus" AS ENUM ('RESERVATION', 'COMPLETE');

-- CreateEnum
CREATE TYPE "Opening" AS ENUM ('QueensGambit', 'RuyLopez', 'ScotchGame', 'KingsPawnGame', 'FrenchDefense', 'CaroKann', 'Scandinavian', 'Modern', 'English', 'RetiOpening', 'BirdsOpening', 'Uncommon', 'NimzoLarsen', 'KingsIndianAttack', 'Reti', 'QueensPawnGame', 'Benoni', 'QueensIndian', 'KingsIndian', 'BudapestGambit', 'OldIndian', 'BenkoGambit', 'Dutch', 'Alekhine', 'Pirc', 'Sicilian', 'French', 'CenterGame', 'BishopsOpening', 'Vienna', 'KingsGambit', 'KingsKnightOpening', 'Philidor', 'Petroff', 'ThreeKnights', 'FourKnights', 'Italian', 'EvansGambit', 'TwoKnights', 'Veresov', 'Torre', 'Grunfeld', 'Catalan', 'BogoIndian', 'NimzoIndian');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('Good', 'Great', 'Ultra', 'Mythic');

-- CreateEnum
CREATE TYPE "Outcome" AS ENUM ('black', 'white', 'draw');

-- CreateEnum
CREATE TYPE "Termination" AS ENUM ('Checkmate', 'Resignation', 'Stalemate', 'Time', 'Repetition', 'Agreement', 'Insufficient', 'Abandoned');

-- CreateEnum
CREATE TYPE "MasterTitle" AS ENUM ('GM', 'IM', 'NM');

-- CreateEnum
CREATE TYPE "Achievement" AS ENUM ('Player', 'Winner750', 'Played750', 'Winner1500', 'Played1500', 'Played2000', 'BigWinner', 'StrongestOpponent', 'MythicWinner', 'DefeatIM', 'DefeatNM', 'DefeatGM', 'CrissCross', 'Jousting', 'UtterDisrespect', 'TripleDigitClub', 'Excessive', 'Ultramarathoners', 'OpeningExpert', 'DontBlink', 'FoolsMate', 'LeveledField', 'Hellomlady', 'HorseFarmer', 'HolyPromotion', 'TheSneakyPawn', 'GodModeGlitch', 'CuttingitClose', 'DejaVu', 'TheUnderdog', 'CheckinYouOut', 'PawnShy', 'PawnShopper', 'MinorProblem', 'MrMarathonMan', 'PawnHoarder', 'Winner');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageSrc" TEXT,
    "masterTitle" "MasterTitle",
    "country" TEXT NOT NULL,
    "mintCredits" INTEGER NOT NULL DEFAULT 3,
    "refreshToken" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treasure" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "blackId" TEXT NOT NULL,
    "whiteId" TEXT NOT NULL,
    "winnerId" TEXT,
    "minterId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "mintPurchaseId" INTEGER,
    "uriData" TEXT NOT NULL,
    "tokenUri" TEXT NOT NULL,
    "tokenId" INTEGER,
    "mintedAt" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "cardColor" TEXT NOT NULL,
    "gifUrl" TEXT NOT NULL,
    "blackRating" INTEGER NOT NULL,
    "whiteRating" INTEGER NOT NULL,
    "blackRatingDelta" INTEGER NOT NULL,
    "whiteRatingDelta" INTEGER NOT NULL,
    "blackMasterTitle" "MasterTitle",
    "whiteMasterTitle" "MasterTitle",
    "timeControl" TEXT NOT NULL,
    "termination" "Termination" NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "outcome" "Outcome" NOT NULL,
    "event" TEXT NOT NULL,
    "moves" TEXT NOT NULL,
    "boardLayout" TEXT NOT NULL,
    "moveCount" INTEGER NOT NULL,
    "ruleVariant" TEXT NOT NULL DEFAULT E'Standard',
    "externalUrl" TEXT,
    "opening" "Opening" NOT NULL,
    "achievements" "Achievement"[],
    "achievementScore" INTEGER NOT NULL,
    "rarity" "Rarity" NOT NULL,

    CONSTRAINT "Treasure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketSale" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listedAt" TIMESTAMP(3),
    "treasureId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT,
    "listTxId" TEXT NOT NULL,
    "unlistTxId" TEXT,
    "status" "MarketSaleStatus" NOT NULL DEFAULT E'PENDING_LISTED',
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "MarketSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MintPurchase" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameEndTime" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL DEFAULT E'WYRE',
    "orderStatus" "MintPurchaseOrderStatus",
    "orderId" TEXT,
    "reservation" TEXT,
    "txHash" TEXT,
    "txStatus" "TxStatus" NOT NULL DEFAULT E'UNSUBMITTED',

    CONSTRAINT "MintPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuth" (
    "state" TEXT NOT NULL,
    "codeChallenge" TEXT NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("state")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "TxStatus" NOT NULL DEFAULT E'SUBMITTED',
    "marketSaleSaleId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_username_key" ON "Member"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Member_address_key" ON "Member"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Treasure_mintPurchaseId_key" ON "Treasure"("mintPurchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Treasure_tokenId_key" ON "Treasure"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "MarketSale_listTxId_key" ON "MarketSale"("listTxId");

-- CreateIndex
CREATE UNIQUE INDEX "MarketSale_unlistTxId_key" ON "MarketSale"("unlistTxId");

-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase_orderId_key" ON "MintPurchase"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase_reservation_key" ON "MintPurchase"("reservation");

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_blackId_fkey" FOREIGN KEY ("blackId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_whiteId_fkey" FOREIGN KEY ("whiteId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_minterId_fkey" FOREIGN KEY ("minterId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_mintPurchaseId_fkey" FOREIGN KEY ("mintPurchaseId") REFERENCES "MintPurchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketSale" ADD CONSTRAINT "MarketSale_treasureId_fkey" FOREIGN KEY ("treasureId") REFERENCES "Treasure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketSale" ADD CONSTRAINT "MarketSale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketSale" ADD CONSTRAINT "MarketSale_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketSale" ADD CONSTRAINT "MarketSale_listTxId_fkey" FOREIGN KEY ("listTxId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketSale" ADD CONSTRAINT "MarketSale_unlistTxId_fkey" FOREIGN KEY ("unlistTxId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintPurchase" ADD CONSTRAINT "MintPurchase_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_marketSaleSaleId_fkey" FOREIGN KEY ("marketSaleSaleId") REFERENCES "MarketSale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
