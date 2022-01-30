/*
  Warnings:

  - The values [KingsPawn,Bird,Scotch] on the enum `Opening` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Opening_new" AS ENUM ('QueensGambit', 'RuyLopez', 'ScotchGame', 'KingsPawnGame', 'FrenchDefense', 'CaroKann', 'Scandinavian', 'Modern', 'English', 'RetiOpening', 'BirdsOpening', 'Uncommon', 'NimzoLarsen', 'KingsIndianAttack', 'Reti', 'QueensPawnGame', 'Benoni', 'QueensIndian', 'KingsIndian', 'BudapestGambit', 'OldIndian', 'BenkoGambit', 'Dutch', 'Alekhine', 'Pirc', 'Sicilian', 'French', 'CenterGame', 'BishopsOpening', 'Vienna', 'KingsGambit', 'KingsKnightOpening', 'Philidor', 'Petroff', 'ThreeKnights', 'FourKnights', 'Italian', 'EvansGambit', 'TwoKnights', 'Veresov', 'Torre', 'Grunfeld', 'Catalan', 'BogoIndian', 'NimzoIndian');
ALTER TABLE "Treasure" ALTER COLUMN "opening" TYPE "Opening_new" USING ("opening"::text::"Opening_new");
ALTER TYPE "Opening" RENAME TO "Opening_old";
ALTER TYPE "Opening_new" RENAME TO "Opening";
DROP TYPE "Opening_old";
COMMIT;

-- AlterEnum
ALTER TYPE "Termination" ADD VALUE 'Abandoned';
