/*
  Warnings:

  - You are about to drop the column `txStatus` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "txStatus",
ADD COLUMN     "status" "TxStatus" NOT NULL DEFAULT E'SUBMITTED';
