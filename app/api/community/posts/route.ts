import "dotenv/config"; // Load environment variables
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { PostValidator } from "@/lib/validators/post";
import { NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
      try {
            const session = await auth();

            if (!session?.user) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            const body = await req.json();
            console.log("REQUEST BODY:", body);
            const { title, content, categoryId, type } = PostValidator.parse(body);

            const post = await db.communityPost.create({
                  data: {
                        title,
                        content,
                        type,
                        authorId: session.user.id,
                        categoryId,
                  },
            });

            // Revalidate the community page to show the new post
            revalidatePath("/community");

            return NextResponse.json(post);
      } catch (error) {
            console.error("ERROR CREATING POST:", error);
            if (error instanceof z.ZodError) {
                  return new NextResponse(error.message, { status: 422 });
            }

            return new NextResponse("Could not create post", { status: 500 });
      }
}

export async function GET(req: Request) {
      const url = new URL(req.url);

      try {
            const { limit, page, categoryName } = z
                  .object({
                        limit: z.string(),
                        page: z.string(),
                        categoryName: z.string().nullish().optional(),
                  })
                  .parse({
                        limit: url.searchParams.get("limit"),
                        page: url.searchParams.get("page"),
                        categoryName: url.searchParams.get("categoryName"),
                  });

            let whereClause = {};
            if (categoryName) {
                  whereClause = {
                        category: {
                              name: categoryName,
                        },
                  };
            }

            const posts = await db.communityPost.findMany({
                  take: parseInt(limit),
                  skip: (parseInt(page) - 1) * parseInt(limit),
                  orderBy: {
                        createdAt: "desc",
                  },
                  where: whereClause,
                  include: {
                        category: true,
                        author: true,
                        votes: true,
                        comments: true,
                  },
            });

            return NextResponse.json(posts);
      } catch (error) {
            if (error instanceof z.ZodError) {
                  return new NextResponse("Invalid request data passed", { status: 422 });
            }

            return new NextResponse("Could not fetch more posts", { status: 500 });
      }
}
