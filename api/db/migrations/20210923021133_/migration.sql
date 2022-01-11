/*
  Warnings:

  - You are about to drop the column `expiration` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "expiration",
ADD COLUMN     "accessTokenExpiration" TEXT;
