/*
  Warnings:

  - Added the required column `country` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masterTitle` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "masterTitle" TEXT NOT NULL;
