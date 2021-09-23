/*
  Warnings:

  - You are about to drop the column `idToken` on the `Member` table. All the data in the column will be lost.
  - The `accessTokenExpiration` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "idToken",
ADD COLUMN     "idTokenExpiration" TIMESTAMP(3),
DROP COLUMN "accessTokenExpiration",
ADD COLUMN     "accessTokenExpiration" TIMESTAMP(3);
