/*
  Warnings:

  - The primary key for the `MintPurchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MintPurchase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mintPurchaseId` column on the `Treasure` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[mintPurchaseId]` on the table `Treasure` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Treasure" DROP CONSTRAINT "Treasure_mintPurchaseId_fkey";

-- AlterTable
ALTER TABLE "MintPurchase" DROP CONSTRAINT "MintPurchase_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Treasure" DROP COLUMN "mintPurchaseId",
ADD COLUMN     "mintPurchaseId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Treasure_mintPurchaseId_unique" ON "Treasure"("mintPurchaseId");

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("mintPurchaseId") REFERENCES "MintPurchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
