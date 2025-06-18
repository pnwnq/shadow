-- CreateEnum
CREATE TYPE "CommunityPostType" AS ENUM ('BLOG', 'QUESTION', 'DISCUSSION');

-- AlterTable
ALTER TABLE "CommunityPost" ADD COLUMN     "type" "CommunityPostType" NOT NULL DEFAULT 'BLOG';
