/*
  Warnings:

  - Made the column `minterAddress` on table `Treasure` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerAddress` on table `Treasure` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Treasure" ALTER COLUMN "minterAddress" SET NOT NULL,
ALTER COLUMN "ownerAddress" SET NOT NULL;
