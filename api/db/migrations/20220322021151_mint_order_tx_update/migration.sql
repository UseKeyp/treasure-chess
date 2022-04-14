/*
  Warnings:

  - You are about to drop the column `txHash` on the `MintPurchase` table. All the data in the column will be lost.
  - You are about to drop the column `txStatus` on the `MintPurchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `MintPurchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MintPurchase" DROP COLUMN "txHash",
DROP COLUMN "txStatus",
ADD COLUMN     "status" "RampStatus" NOT NULL DEFAULT E'PENDING',
ADD COLUMN     "transactionId" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "gasLimit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mintPurchaseId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase_transactionId_key" ON "MintPurchase"("transactionId");

-- AddForeignKey
ALTER TABLE "MintPurchase" ADD CONSTRAINT "MintPurchase_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_mintPurchaseId_fkey" FOREIGN KEY ("mintPurchaseId") REFERENCES "MintPurchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
