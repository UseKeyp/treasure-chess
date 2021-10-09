/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `accessTokenExpiration` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `hashedIdToken` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `idTokenExpiration` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "accessToken",
DROP COLUMN "accessTokenExpiration",
DROP COLUMN "hashedIdToken",
DROP COLUMN "idTokenExpiration";
