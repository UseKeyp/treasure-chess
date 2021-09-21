/*
  Warnings:

  - You are about to drop the column `gameRuleVariant` on the `Treasure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Treasure" DROP COLUMN "gameRuleVariant",
ADD COLUMN     "ruleVariant" TEXT NOT NULL DEFAULT E'Standard';
