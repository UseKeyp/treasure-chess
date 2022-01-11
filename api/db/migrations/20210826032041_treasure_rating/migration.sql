/*
  Warnings:

  - You are about to drop the column `rating` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "Treasure" ADD COLUMN     "blackMasterTitle" TEXT,
ADD COLUMN     "whiteMasterTitle" TEXT,
ALTER COLUMN "mintedAt" DROP NOT NULL;
