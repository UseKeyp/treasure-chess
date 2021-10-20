/*
  Warnings:

  - Added the required column `accessTokenExpiration` to the `SecretToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "hashedIdToken" TEXT;

-- AlterTable
ALTER TABLE "SecretToken" ADD COLUMN     "accessTokenExpiration" TIMESTAMP(3) NOT NULL;
