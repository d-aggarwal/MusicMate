-- AlterTable
ALTER TABLE "User" ADD COLUMN "activeStreamId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeStreamId_fkey" FOREIGN KEY ("activeStreamId") REFERENCES "Stream"("id") ON DELETE SET NULL ON UPDATE CASCADE;
