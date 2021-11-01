/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `MintPurchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reservation]` on the table `MintPurchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase.orderId_unique" ON "MintPurchase"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase.reservation_unique" ON "MintPurchase"("reservation");
