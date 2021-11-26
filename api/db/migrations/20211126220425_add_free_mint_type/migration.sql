-- AlterTable
ALTER TABLE "MintPurchase" ADD COLUMN     "paymentType" TEXT NOT NULL DEFAULT E'WYRE',
ALTER COLUMN "orderStatus" DROP NOT NULL;
