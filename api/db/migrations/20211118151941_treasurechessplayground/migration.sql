-- RenameIndex
ALTER INDEX "Member_address_key" RENAME TO "Member.address_unique";

-- RenameIndex
ALTER INDEX "Member_username_key" RENAME TO "Member.username_unique";

-- RenameIndex
ALTER INDEX "MintPurchase_orderId_key" RENAME TO "MintPurchase.orderId_unique";

-- RenameIndex
ALTER INDEX "MintPurchase_reservation_key" RENAME TO "MintPurchase.reservation_unique";

-- RenameIndex
ALTER INDEX "Treasure_mintPurchaseId_key" RENAME TO "Treasure_mintPurchaseId_unique";
