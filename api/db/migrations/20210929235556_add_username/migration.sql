/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member.username_unique" ON "Member"("username");
