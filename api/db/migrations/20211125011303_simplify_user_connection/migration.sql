/*
  Warnings:

  - You are about to drop the column `blackUsername` on the `Treasure` table. All the data in the column will be lost.
  - You are about to drop the column `minterAddress` on the `Treasure` table. All the data in the column will be lost.
  - You are about to drop the column `ownerAddress` on the `Treasure` table. All the data in the column will be lost.
  - You are about to drop the column `whiteUsername` on the `Treasure` table. All the data in the column will be lost.
  - You are about to drop the column `winnerUsername` on the `Treasure` table. All the data in the column will be lost.
  - Added the required column `minterId` to the `Treasure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Treasure` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Treasure" DROP CONSTRAINT "Treasure_minterAddress_fkey";

-- DropForeignKey
ALTER TABLE "Treasure" DROP CONSTRAINT "Treasure_ownerAddress_fkey";

-- AlterTable
ALTER TABLE "Treasure" DROP COLUMN "blackUsername",
DROP COLUMN "minterAddress",
DROP COLUMN "ownerAddress",
DROP COLUMN "whiteUsername",
DROP COLUMN "winnerUsername",
ADD COLUMN     "minterId" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_minterId_fkey" FOREIGN KEY ("minterId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
