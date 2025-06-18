import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
      req: Request,
      { params }: { params: { commentId: string } }
) {
      try {
            const session = await auth();
            if (!session?.user?.id) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            const commentId = params.commentId;
            const userId = session.user.id;

            if (!commentId) {
                  return new NextResponse("Comment ID is required", { status: 400 });
            }

            const existingVote = await db.communityCommentVote.findFirst({
                  where: {
                        commentId: commentId,
                        userId: userId,
                  },
            });

            if (existingVote) {
                  await db.communityCommentVote.delete({
                        where: {
                              id: existingVote.id,
                        },
                  });
                  return new NextResponse("Vote removed", { status: 200 });
            } else {
                  await db.communityCommentVote.create({
                        data: {
                              commentId: commentId,
                              userId: userId,
                              type: "UP",
                        },
                  });
                  return new NextResponse("Vote added", { status: 201 });
            }
      } catch (error) {
            console.error("[COMMENT_VOTE_PATCH]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 