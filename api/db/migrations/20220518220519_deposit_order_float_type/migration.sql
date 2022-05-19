/*
  Warnings:

  - The `sourceAmount` column on the `DepositOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `purchaseAmount` column on the `DepositOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "DepositOrder" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "sourceAmount",
ADD COLUMN     "sourceAmount" DOUBLE PRECISION,
DROP COLUMN "purchaseAmount",
ADD COLUMN     "purchaseAmount" DOUBLE PRECISION;
