/*
  Warnings:

  - A unique constraint covering the columns `[twitchUsername]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "twitchUsername" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Member_twitchUsername_key" ON "Member"("twitchUsername");
