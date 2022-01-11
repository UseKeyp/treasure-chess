/*
  Warnings:

  - The primary key for the `OAuth` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "expiration" TEXT,
ADD COLUMN     "idToken" TEXT,
ADD COLUMN     "refreshToken" TEXT;

-- AlterTable
ALTER TABLE "OAuth" DROP CONSTRAINT "OAuth_pkey",
ADD PRIMARY KEY ("state");

-- CreateTable
CREATE TABLE "SecretToken" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "idToken" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
