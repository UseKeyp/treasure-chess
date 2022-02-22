-- CreateEnum
CREATE TYPE "Ramp" AS ENUM ('COINBASE', 'WYRE');

-- CreateEnum
CREATE TYPE "RampStatus" AS ENUM ('PENDING', 'COMPLETE', 'FAILED');

-- CreateTable
CREATE TABLE "RampWithdraw" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ramp" "Ramp" NOT NULL,
    "status" "RampStatus" NOT NULL DEFAULT E'PENDING',
    "toAddress" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,
    "memberId" TEXT,

    CONSTRAINT "RampWithdraw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RampWithdraw_transactionId_key" ON "RampWithdraw"("transactionId");

-- AddForeignKey
ALTER TABLE "RampWithdraw" ADD CONSTRAINT "RampWithdraw_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RampWithdraw" ADD CONSTRAINT "RampWithdraw_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
