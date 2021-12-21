-- DropForeignKey
ALTER TABLE "MintPurchase" DROP CONSTRAINT "MintPurchase_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Treasure" DROP CONSTRAINT "Treasure_blackId_fkey";

-- DropForeignKey
ALTER TABLE "Treasure" DROP CONSTRAINT "Treasure_minterAddress_fkey";

-- DropForeignKey
ALTER TABLE "Treasure" DROP CONSTRAINT "Treasure_ownerAddress_fkey";

-- DropForeignKey
ALTER TABLE "Treasure" DROP CONSTRAINT "Treasure_whiteId_fkey";

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_blackId_fkey" FOREIGN KEY ("blackId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_whiteId_fkey" FOREIGN KEY ("whiteId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_minterAddress_fkey" FOREIGN KEY ("minterAddress") REFERENCES "Member"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_ownerAddress_fkey" FOREIGN KEY ("ownerAddress") REFERENCES "Member"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintPurchase" ADD CONSTRAINT "MintPurchase_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Member.address_unique" RENAME TO "Member_address_key";

-- RenameIndex
ALTER INDEX "Member.username_unique" RENAME TO "Member_username_key";

-- RenameIndex
ALTER INDEX "MintPurchase.orderId_unique" RENAME TO "MintPurchase_orderId_key";

-- RenameIndex
ALTER INDEX "MintPurchase.reservation_unique" RENAME TO "MintPurchase_reservation_key";

-- RenameIndex
ALTER INDEX "Treasure_mintPurchaseId_unique" RENAME TO "Treasure_mintPurchaseId_key";
