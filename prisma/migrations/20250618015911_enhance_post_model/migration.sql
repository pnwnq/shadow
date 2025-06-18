-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('BLOG', 'QUESTION', 'DISCUSSION');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'BLOG';

-- CreateIndex
CREATE INDEX "Post_categoryId_idx" ON "Post"("categoryId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
