/*
  Warnings:

  - The values [gm,im,nm] on the enum `MasterTitle` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MasterTitle_new" AS ENUM ('GM', 'IM', 'NM');
ALTER TABLE "Member" ALTER COLUMN "masterTitle" TYPE "MasterTitle_new" USING ("masterTitle"::text::"MasterTitle_new");
ALTER TABLE "Treasure" ALTER COLUMN "blackMasterTitle" TYPE "MasterTitle_new" USING ("blackMasterTitle"::text::"MasterTitle_new");
ALTER TABLE "Treasure" ALTER COLUMN "whiteMasterTitle" TYPE "MasterTitle_new" USING ("whiteMasterTitle"::text::"MasterTitle_new");
ALTER TYPE "MasterTitle" RENAME TO "MasterTitle_old";
ALTER TYPE "MasterTitle_new" RENAME TO "MasterTitle";
DROP TYPE "MasterTitle_old";
COMMIT;
