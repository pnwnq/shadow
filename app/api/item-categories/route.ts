import { db } from "@/lib/prisma";
import { createItemCategorySchema } from "@/schemas/item";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
      try {
            const categories = await db.itemCategory.findMany({
                  orderBy: {
                        createdAt: "desc",
                  },
            });
            return NextResponse.json(categories);
      } catch (error) {
            console.error("[ITEM_CATEGORIES_GET]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
}

export async function POST(req: Request) {
      try {
            const body = await req.json();
            const data = createItemCategorySchema.parse(body);

            const category = await db.itemCategory.create({
                  data,
            });

            return NextResponse.json(category, { status: 201 });
      } catch (error) {
            if (error instanceof ZodError) {
                  return new NextResponse(JSON.stringify(error.issues), { status: 400 });
            }
            // Handle potential unique constraint violation
            if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
                  return new NextResponse("A category with this name already exists.", { status: 409 });
            }
            console.error("[ITEM_CATEGORIES_POST]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 