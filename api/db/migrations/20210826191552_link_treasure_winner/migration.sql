/*
  Warnings:

  - You are about to drop the column `winner` on the `Treasure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Treasure" DROP COLUMN "winner",
ADD COLUMN     "winnerId" TEXT;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("winnerId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
