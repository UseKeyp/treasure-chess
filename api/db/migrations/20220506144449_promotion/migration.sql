-- CreateEnum
CREATE TYPE "PromotionRewardType" AS ENUM ('MINT_CREDIT');

-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('TWITCH_CONNECTION');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "promotionId" INTEGER;

-- CreateTable
CREATE TABLE "Promotion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rewardType" "PromotionRewardType" NOT NULL DEFAULT E'MINT_CREDIT',
    "type" "PromotionType" NOT NULL,
    "mintCredits" INTEGER,
    "enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
