/*
  Warnings:

  - Added the required column `blackUsername` to the `Treasure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whiteUsername` to the `Treasure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Treasure" ADD COLUMN     "blackUsername" TEXT NOT NULL,
ADD COLUMN     "whiteUsername" TEXT NOT NULL,
ADD COLUMN     "winnerUsername" TEXT;
