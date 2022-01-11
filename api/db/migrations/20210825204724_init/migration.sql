-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dateJoined" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treasure" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blackId" TEXT NOT NULL,
    "whiteId" TEXT NOT NULL,
    "minterAddress" TEXT,
    "ownerAddress" TEXT,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cardColor" TEXT NOT NULL,
    "blackRating" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "whiteRating" INTEGER NOT NULL,
    "termination" TEXT NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "event" TEXT NOT NULL,
    "moves" TEXT NOT NULL,
    "moveCount" INTEGER NOT NULL,
    "gameRuleVariant" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "externalUrl" TEXT,
    "opening" TEXT NOT NULL,
    "achievements" TEXT NOT NULL,
    "tokenId" INTEGER,
    "mintedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member.address_unique" ON "Member"("address");

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("blackId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("whiteId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("minterAddress") REFERENCES "Member"("address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("ownerAddress") REFERENCES "Member"("address") ON DELETE SET NULL ON UPDATE CASCADE;
