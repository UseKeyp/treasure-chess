/*
  Warnings:

  - You are about to drop the column `duration` on the `Treasure` table. All the data in the column will be lost.
  - Added the required column `timeControl` to the `Treasure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Treasure" DROP COLUMN "duration",
ADD COLUMN     "timeControl" INTEGER NOT NULL;
