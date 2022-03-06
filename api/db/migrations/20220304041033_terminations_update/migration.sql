/*
  Warnings:

  - The values [Timeout] on the enum `Termination` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Termination_new" AS ENUM ('Unknown', 'Checkmate', 'Time', 'Agreement', 'Repetition', 'Resignation', 'Stalemate', 'Insufficient', 'FiftyMove', 'Abandoned', 'KingOfTheHill', 'ThreeCheck', 'TimeVsInsufficient', 'BughousePartnerLose', 'LosersAllCaptured', 'LosersStalemate');
ALTER TABLE "Treasure" ALTER COLUMN "termination" TYPE "Termination_new" USING ("termination"::text::"Termination_new");
ALTER TYPE "Termination" RENAME TO "Termination_old";
ALTER TYPE "Termination_new" RENAME TO "Termination";
DROP TYPE "Termination_old";
COMMIT;
