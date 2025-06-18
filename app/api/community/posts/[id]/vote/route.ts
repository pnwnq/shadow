import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
      req: Request,
      { params }: { params: { id: string } }
) {
      try {
            const session = await auth();
            if (!session?.user?.id) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            const postId = params.id;
            const userId = session.user.id;

            if (!postId) {
                  return new NextResponse("Post ID is required", { status: 400 });
            }

            // Check if the user has already voted for this post
            const existingVote = await db.communityPostVote.findFirst({
                  where: {
                        postId: postId,
                        userId: userId,
                  },
            });

            if (existingVote) {
                  // If vote exists, delete it (unlike)
                  await db.communityPostVote.delete({
                        where: {
                              id: existingVote.id,
                        },
                  });
                  return new NextResponse("Vote removed", { status: 200 });
            } else {
                  // If vote does not exist, create it (like)
                  await db.communityPostVote.create({
                        data: {
                              postId: postId,
                              userId: userId,
                              type: "UP", // Assuming only 'UP' votes for now
                        },
                  });
                  return new NextResponse("Vote added", { status: 201 });
            }
      } catch (error) {
            if (error instanceof z.ZodError) {
                  return new NextResponse(error.message, { status: 422 });
            }

            console.error("[VOTE_PATCH]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 