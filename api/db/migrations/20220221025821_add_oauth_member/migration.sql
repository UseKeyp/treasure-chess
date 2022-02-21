-- AlterTable
ALTER TABLE "OAuth" ADD COLUMN     "memberId" TEXT;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
