-- AlterTable
ALTER TABLE "CommunityComment" ADD COLUMN     "replyToId" TEXT;

-- CreateTable
CREATE TABLE "CommunityCommentVote" (
    "id" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "CommunityCommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityCommentVote_userId_commentId_key" ON "CommunityCommentVote"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "CommunityComment" ADD CONSTRAINT "CommunityComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "CommunityComment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CommunityCommentVote" ADD CONSTRAINT "CommunityCommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityCommentVote" ADD CONSTRAINT "CommunityCommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "CommunityComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
