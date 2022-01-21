/*
  Warnings:

  - The `orderStatus` column on the `MintPurchase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `txStatus` column on the `MintPurchase` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MarketSaleStatus" AS ENUM ('PENDING_LISTED', 'LISTED', 'PENDING_SOLD', 'SOLD', 'PENDING_DELISTED', 'DELISTED');

-- CreateEnum
CREATE TYPE "TxStatus" AS ENUM ('UNSUBMITTED', 'SUBMITTED', 'COMPLETE', 'FAILED');

-- CreateEnum
CREATE TYPE "MintPurchaseOrderStatus" AS ENUM ('RESERVATION', 'COMPLETE');

-- AlterTable
ALTER TABLE "MintPurchase" DROP COLUMN "orderStatus",
ADD COLUMN     "orderStatus" "MintPurchaseOrderStatus",
DROP COLUMN "txStatus",
ADD COLUMN     "txStatus" "TxStatus" NOT NULL DEFAULT E'UNSUBMITTED';

-- CreateTable
CREATE TABLE "MarketSale" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listedAt" TIMESTAMP(3) NOT NULL,
    "treasureId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT,
    "listTxId" TEXT NOT NULL,
    "unlistTxId" TEXT,
    "saleTxId" TEXT,
    "status" "MarketSaleStatus" NOT NULL DEFAULT E'PENDING_LISTED',
    "isClosed" BOOLEAN NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "MarketSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "txStatus" "TxStatus" NOT NULL DEFAULT E'SUBMITTED',

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MarketSale_listTxId_key" ON "MarketSale"("listTxId");

-- CreateIndex
CREATE UNIQUE INDEX "MarketSale_unlistTxId_key" ON "MarketSale"("unlistTxId");

-- CreateIndex
CREATE UNIQUE INDEX "MarketSale_saleTxId_key" ON "MarketSale"("saleTxId");

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
ALTER TABLE "MarketSale" ADD CONSTRAINT "MarketSale_saleTxId_fkey" FOREIGN KEY ("saleTxId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
