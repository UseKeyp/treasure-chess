/*
  Warnings:

  - Added the required column `tokenUri` to the `Treasure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Treasure" ADD COLUMN     "tokenUri" TEXT NOT NULL;
