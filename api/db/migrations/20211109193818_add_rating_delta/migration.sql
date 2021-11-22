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
    "refreshToken" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treasure" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "blackId" TEXT NOT NULL,
    "blackUsername" TEXT NOT NULL,
    "whiteId" TEXT NOT NULL,
    "whiteUsername" TEXT NOT NULL,
    "winnerId" TEXT,
    "winnerUsername" TEXT,
    "minterAddress" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "mintPurchaseId" INTEGER,
    "uriData" TEXT NOT NULL,
    "tokenId" INTEGER,
    "mintedAt" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "cardColor" TEXT NOT NULL,
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
    "moveCount" INTEGER NOT NULL,
    "ruleVariant" TEXT NOT NULL DEFAULT E'Standard',
    "externalUrl" TEXT,
    "opening" TEXT NOT NULL,
    "achievements" TEXT NOT NULL,
    "achievementScore" INTEGER NOT NULL,
    "rarity" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MintPurchase" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,
    "orderId" TEXT,
    "reservation" TEXT,
    "orderStatus" TEXT NOT NULL DEFAULT E'RESERVATION',
    "gameId" TEXT NOT NULL,
    "gameEndTime" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'Cool game',
    "txHash" TEXT,
    "txStatus" TEXT NOT NULL DEFAULT E'UNSUBMITTED',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuth" (
    "state" TEXT NOT NULL,
    "codeChallenge" TEXT NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("state")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member.username_unique" ON "Member"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Member.address_unique" ON "Member"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Treasure_mintPurchaseId_unique" ON "Treasure"("mintPurchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase.orderId_unique" ON "MintPurchase"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase.reservation_unique" ON "MintPurchase"("reservation");

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("blackId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("whiteId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("winnerId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("minterAddress") REFERENCES "Member"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("ownerAddress") REFERENCES "Member"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("mintPurchaseId") REFERENCES "MintPurchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintPurchase" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
