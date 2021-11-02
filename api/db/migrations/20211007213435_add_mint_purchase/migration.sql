-- CreateTable
CREATE TABLE "mintPurchase" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderStatus" TEXT NOT NULL DEFAULT E'INVALID',
    "referenceId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameEndTime" TEXT NOT NULL,
    "txHash" TEXT,
    "txStatus" TEXT NOT NULL DEFAULT E'Unsubmitted',
    "memberId" TEXT NOT NULL,
    "treasureId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mintPurchase_treasureId_unique" ON "mintPurchase"("treasureId");

-- AddForeignKey
ALTER TABLE "mintPurchase" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mintPurchase" ADD FOREIGN KEY ("treasureId") REFERENCES "Treasure"("id") ON DELETE SET NULL ON UPDATE CASCADE;
