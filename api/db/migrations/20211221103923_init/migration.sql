-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageSrc" TEXT,
    "masterTitle" TEXT,
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
    "blackMasterTitle" TEXT,
    "whiteMasterTitle" TEXT,
    "timeControl" TEXT NOT NULL,
    "termination" TEXT NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "outcome" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "moves" TEXT NOT NULL,
    "boardLayout" TEXT NOT NULL,
    "moveCount" INTEGER NOT NULL,
    "ruleVariant" TEXT NOT NULL DEFAULT E'Standard',
    "externalUrl" TEXT,
    "opening" TEXT NOT NULL,
    "achievements" TEXT NOT NULL,
    "achievementScore" INTEGER NOT NULL,
    "rarity" TEXT NOT NULL,

    CONSTRAINT "Treasure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MintPurchase" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameEndTime" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'Cool game',
    "paymentType" TEXT NOT NULL DEFAULT E'WYRE',
    "orderStatus" TEXT,
    "orderId" TEXT,
    "reservation" TEXT,
    "txHash" TEXT,
    "txStatus" TEXT NOT NULL DEFAULT E'UNSUBMITTED',

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

-- CreateIndex
CREATE UNIQUE INDEX "Member_username_key" ON "Member"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Member_address_key" ON "Member"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Treasure_mintPurchaseId_key" ON "Treasure"("mintPurchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Treasure_tokenId_key" ON "Treasure"("tokenId");

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
ALTER TABLE "MintPurchase" ADD CONSTRAINT "MintPurchase_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
