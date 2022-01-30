-- AlterTable
ALTER TABLE "MarketSale" ALTER COLUMN "listedAt" DROP NOT NULL,
ALTER COLUMN "isClosed" SET DEFAULT false;
