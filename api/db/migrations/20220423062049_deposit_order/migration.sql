-- CreateTable
CREATE TABLE "DepositOrder" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,
    "amount" INTEGER,
    "paymentType" "RampType" NOT NULL,
    "status" "TxStatus" NOT NULL DEFAULT E'UNSUBMITTED',
    "sourceCurrency" TEXT,
    "sourceAmount" INTEGER,
    "purchaseAmount" INTEGER,
    "destCurrency" TEXT,
    "paymentMethod" TEXT,
    "orderType" TEXT,
    "orderId" TEXT,
    "reservation" TEXT,

    CONSTRAINT "DepositOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DepositOrder_orderId_key" ON "DepositOrder"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "DepositOrder_reservation_key" ON "DepositOrder"("reservation");

-- AddForeignKey
ALTER TABLE "DepositOrder" ADD CONSTRAINT "DepositOrder_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
