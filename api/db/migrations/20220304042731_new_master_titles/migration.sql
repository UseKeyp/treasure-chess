-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MasterTitle" ADD VALUE 'WGM';
ALTER TYPE "MasterTitle" ADD VALUE 'WIM';
ALTER TYPE "MasterTitle" ADD VALUE 'FM';
ALTER TYPE "MasterTitle" ADD VALUE 'WFM';
ALTER TYPE "MasterTitle" ADD VALUE 'CM';
ALTER TYPE "MasterTitle" ADD VALUE 'WCM';
ALTER TYPE "MasterTitle" ADD VALUE 'WNM';
