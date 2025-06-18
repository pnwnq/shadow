import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

const includeNestedReplies = {
      include: {
            author: true,
            votes: true,
            replies: { // First level of replies
                  include: {
                        author: true,
                        votes: true,
                        replies: { // Second level of replies
                              include: {
                                    author: true,
                                    votes: true,
                              }
                        }
                  }
            }
      }
};

export async function GET(
      req: Request,
      { params }: { params: { id: string } }
) {
      try {
            const postId = params.id;

            if (!postId) {
                  return new NextResponse("Post ID is required", { status: 400 });
            }

            const post = await db.communityPost.findUnique({
                  where: {
                        id: postId,
                  },
                  include: {
                        author: true,
                        category: true,
                        votes: true,
                        comments: {
                              where: {
                                    // Only fetch top-level comments
                                    replyToId: null,
                              },
                              include: {
                                    author: true,
                                    votes: true,
                                    replies: { // First level of replies
                                          include: {
                                                author: true,
                                                votes: true,
                                                replies: { // Second level of replies
                                                      include: {
                                                            author: true,
                                                            votes: true,
                                                      }
                                                }
                                          }
                                    }
                              },
                              orderBy: {
                                    createdAt: "desc",
                              },
                        },
                  },
            });

            if (!post) {
                  return new NextResponse("Post not found", { status: 404 });
            }

            // You can also add logic here to increment the view count
            await db.communityPost.update({
                  where: {
                        id: postId,
                  },
                  data: {
                        viewCount: {
                              increment: 1,
                        },
                  },
            });

            return NextResponse.json(post);
      } catch (error) {
            console.error("[POST_GET]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 