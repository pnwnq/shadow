/*
  Warnings:

  - You are about to drop the `CommunityPostLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UP', 'DOWN');

-- DropForeignKey
ALTER TABLE "CommunityPostLike" DROP CONSTRAINT "CommunityPostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "CommunityPostLike" DROP CONSTRAINT "CommunityPostLike_userId_fkey";

-- AlterTable
ALTER TABLE "CommunityPost" ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "CommunityPostLike";

-- CreateTable
CREATE TABLE "CommunityPostVote" (
    "id" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "CommunityPostVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityPostVote_userId_postId_key" ON "CommunityPostVote"("userId", "postId");

-- AddForeignKey
ALTER TABLE "CommunityPostVote" ADD CONSTRAINT "CommunityPostVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPostVote" ADD CONSTRAINT "CommunityPostVote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
