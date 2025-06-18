import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"
import { currentUser } from "@/auth"
import { z } from "zod"

const searchParamsSchema = z.object({
      search: z.string().optional(),
      category: z.string().optional(),
      sortBy: z.string().optional().default("createdAt"),
      sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
})

export async function GET(req: Request) {
      try {
            const user = await currentUser()
            if (!user) {
                  return new NextResponse("Unauthorized", { status: 401 })
            }

            const { searchParams } = new URL(req.url)
            const { search, category, sortBy, sortOrder } = searchParamsSchema.parse(Object.fromEntries(searchParams))

            const documents = await db.document.findMany({
                  where: {
                        uploaderId: user.id,
                        ...(search && {
                              title: {
                                    contains: search,
                                    mode: "insensitive",
                              },
                        }),
                        ...(category && {
                              category: {
                                    equals: category,
                              },
                        }),
                  },
                  orderBy: {
                        [sortBy]: sortOrder,
                  },
            })

            return NextResponse.json(documents)
      } catch (error) {
            console.error("[DOCUMENTS_GET]", error)
            if (error instanceof z.ZodError) {
                  return new NextResponse(JSON.stringify(error.issues), { status: 422 })
            }
            return new NextResponse("Internal Server Error", { status: 500 })
      }
} 