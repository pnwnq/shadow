-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('BLOG', 'QUESTION', 'DISCUSSION');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" TEXT,
ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "postType" "PostType" NOT NULL DEFAULT 'BLOG',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "title" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
