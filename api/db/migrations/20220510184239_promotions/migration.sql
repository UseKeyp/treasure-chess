-- CreateEnum
CREATE TYPE "PromotionRewardType" AS ENUM ('MINT_CREDIT');

-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('TWITCH_CONNECTION');

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

-- CreateTable
CREATE TABLE "PromotionsOnMembers" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,
    "promotionId" INTEGER NOT NULL,

    CONSTRAINT "PromotionsOnMembers_pkey" PRIMARY KEY ("memberId","promotionId")
);

-- AddForeignKey
ALTER TABLE "PromotionsOnMembers" ADD CONSTRAINT "PromotionsOnMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionsOnMembers" ADD CONSTRAINT "PromotionsOnMembers_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
