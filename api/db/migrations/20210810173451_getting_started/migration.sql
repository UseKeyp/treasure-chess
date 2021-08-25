/*
  Warnings:

  - Added the required column `dateJoined` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Treasure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Treasure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "dateJoined" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Treasure" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Treasure" ADD FOREIGN KEY ("ownerId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
