-- AlterTable
ALTER TABLE "MintPurchase" ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "reservation" TEXT,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT E'Cool game',
ALTER COLUMN "orderStatus" SET DEFAULT E'RESERVATION';

-- AlterTable
ALTER TABLE "Treasure" ALTER COLUMN "mintPurchaseId" DROP NOT NULL;
