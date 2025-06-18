import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { CommentValidator } from "@/lib/validators/comment";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
      req: Request,
      { params }: { params: { id: string } }
) {
      try {
            const session = await auth();
            if (!session?.user?.id) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            const body = await req.json();
            const { id: postId } = params;
            const { content, replyToId } = CommentValidator.parse({ ...body, postId });

            await db.communityComment.create({
                  data: {
                        content,
                        postId,
                        authorId: session.user.id,
                        replyToId,
                  },
            });

            return new NextResponse("OK");
      } catch (error) {
            if (error instanceof z.ZodError) {
                  return new NextResponse(error.message, { status: 422 });
            }

            console.error("[COMMENT_POST]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 