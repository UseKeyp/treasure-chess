/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `Treasure` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Treasure_tokenId_key" ON "Treasure"("tokenId");
