/*
  Warnings:

  - A unique constraint covering the columns `[twitchToken]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "twitchToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Member_twitchToken_key" ON "Member"("twitchToken");
