/*
  Warnings:

  - You are about to drop the column `saleTxId` on the `MarketSale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MarketSale" DROP CONSTRAINT "MarketSale_saleTxId_fkey";

-- DropIndex
DROP INDEX "MarketSale_saleTxId_key";

-- AlterTable
ALTER TABLE "MarketSale" DROP COLUMN "saleTxId";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "marketSaleSaleId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_marketSaleSaleId_fkey" FOREIGN KEY ("marketSaleSaleId") REFERENCES "MarketSale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
