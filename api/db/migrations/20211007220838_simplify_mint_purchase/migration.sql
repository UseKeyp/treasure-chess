/*
  Warnings:

  - You are about to drop the column `referenceId` on the `mintPurchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "mintPurchase" DROP COLUMN "referenceId",
ALTER COLUMN "txStatus" SET DEFAULT E'UNSUBMITTED';
