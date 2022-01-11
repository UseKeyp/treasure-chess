/*
  Warnings:

  - Added the required column `achievementScore` to the `Treasure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Treasure" ADD COLUMN     "achievementScore" INTEGER NOT NULL,
ALTER COLUMN "timeControl" SET DATA TYPE TEXT;
