/*
  Warnings:

  - The `masterTitle` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `blackMasterTitle` column on the `Treasure` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `whiteMasterTitle` column on the `Treasure` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `achievements` column on the `Treasure` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `termination` on the `Treasure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `outcome` on the `Treasure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `opening` on the `Treasure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rarity` on the `Treasure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Opening" AS ENUM ('KingsPawn', 'QueensGambit', 'RuyLopez', 'FrenchDefense', 'CaroKann', 'RetiOpening', 'English', 'Modern', 'Bird', 'Scandinavian', 'Scotch');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('Good', 'Great', 'Ultra', 'Mythic');

-- CreateEnum
CREATE TYPE "Outcome" AS ENUM ('black', 'white', 'draw');

-- CreateEnum
CREATE TYPE "Termination" AS ENUM ('Checkmate', 'Resignation', 'Stalemate', 'Time', 'Repetition', 'Agreement', 'Insufficient');

-- CreateEnum
CREATE TYPE "MasterTitle" AS ENUM ('gm', 'im', 'nm');

-- CreateEnum
CREATE TYPE "Achievement" AS ENUM ('Player', 'Winner750', 'Played750', 'Winner1500', 'Played1500', 'Played2000', 'BigWinner', 'StrongestOpponent', 'MythicWinner', 'DefeatIM', 'DefeatNM', 'DefeatGM', 'CrissCross', 'Jousting', 'UtterDisrespect', 'TripleDigitClub', 'Excessive', 'Ultramarathoners', 'OpeningExpert', 'DontBlink', 'FoolsMate', 'LeveledField', 'Hellomlady', 'HorseFarmer', 'HolyPromotion', 'TheSneakyPawn', 'GodModeGlitch', 'CuttingitClose', 'DejaVu', 'TheUnderdog', 'CheckinYouOut', 'PawnShy', 'PawnShopper', 'MinorProblem', 'MrMarathonMan', 'PawnHoarder', 'Winner');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "masterTitle",
ADD COLUMN     "masterTitle" "MasterTitle";

-- AlterTable
ALTER TABLE "MintPurchase" ALTER COLUMN "title" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Treasure" DROP COLUMN "blackMasterTitle",
ADD COLUMN     "blackMasterTitle" "MasterTitle",
DROP COLUMN "whiteMasterTitle",
ADD COLUMN     "whiteMasterTitle" "MasterTitle",
DROP COLUMN "termination",
ADD COLUMN     "termination" "Termination" NOT NULL,
DROP COLUMN "outcome",
ADD COLUMN     "outcome" "Outcome" NOT NULL,
DROP COLUMN "opening",
ADD COLUMN     "opening" "Opening" NOT NULL,
DROP COLUMN "achievements",
ADD COLUMN     "achievements" "Achievement"[],
DROP COLUMN "rarity",
ADD COLUMN     "rarity" "Rarity" NOT NULL;
