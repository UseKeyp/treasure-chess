/*
  Warnings:

  - You are about to drop the `mintPurchase` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mintPurchaseId]` on the table `Treasure` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mintPurchaseId` to the `Treasure` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "mintPurchase" DROP CONSTRAINT "mintPurchase_memberId_fkey";

-- DropForeignKey
ALTER TABLE "mintPurchase" DROP CONSTRAINT "mintPurchase_treasureId_fkey";

-- AlterTable
ALTER TABLE "Treasure" ADD COLUMN     "mintPurchaseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "mintPurchase";

-- CreateTable
CREATE TABLE "MintPurchase" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,
    "treasureId" TEXT,
    "orderStatus" TEXT NOT NULL DEFAULT E'INVALID',
    "gameId" TEXT NOT NULL,
    "gameEndTime" TEXT NOT NULL,
    "txHash" TEXT,
    "txStatus" TEXT NOT NULL DEFAULT E'UNSUBMITTED',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Treasure_mintPurchaseId_unique" ON "Treasure"("mintPurchaseId");

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("mintPurchaseId") REFERENCES "MintPurchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintPurchase" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintPurchase" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
