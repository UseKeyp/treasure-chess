-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "maxFeePerGas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxPriorityFeePerGas" INTEGER NOT NULL DEFAULT 0;
