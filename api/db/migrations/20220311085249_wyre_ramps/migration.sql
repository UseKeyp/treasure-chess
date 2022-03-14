/*
  Warnings:

  - You are about to drop the column `accessTokenCoinbase` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `coinbaseWithdrawAddress` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `emailCoinbase` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `emailWyre` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenCoinbase` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `wyreWithdrawAddress` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `ramp` on the `RampWithdraw` table. All the data in the column will be lost.
  - Added the required column `rampId` to the `RampWithdraw` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RampType" AS ENUM ('COINBASE', 'WYRE');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "accessTokenCoinbase",
DROP COLUMN "coinbaseWithdrawAddress",
DROP COLUMN "emailCoinbase",
DROP COLUMN "emailWyre",
DROP COLUMN "refreshTokenCoinbase",
DROP COLUMN "wyreWithdrawAddress";

-- AlterTable
ALTER TABLE "RampWithdraw" DROP COLUMN "ramp",
ADD COLUMN     "rampId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Ramp";

-- CreateTable
CREATE TABLE "Ramp" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT,
    "type" "RampType" NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "accountId" TEXT,
    "accountNickname" TEXT,
    "mask" TEXT,
    "isoCurrencyCode" TEXT,
    "itemId" TEXT,
    "verificationStatus" TEXT,
    "paymentMethodId" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,

    CONSTRAINT "Ramp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ramp" ADD CONSTRAINT "Ramp_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RampWithdraw" ADD CONSTRAINT "RampWithdraw_rampId_fkey" FOREIGN KEY ("rampId") REFERENCES "Ramp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
