import { db } from "@/lib/prisma";
import { updateItemCategorySchema } from "@/schemas/item";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

interface IParams {
      params: {
            id: string;
      };
}

export async function GET(req: Request, { params }: IParams) {
      try {
            const { id } = params;
            const category = await db.itemCategory.findUnique({
                  where: { id },
            });

            if (!category) {
                  return new NextResponse("Category not found", { status: 404 });
            }

            return NextResponse.json(category);
      } catch (error) {
            console.error("[ITEM_CATEGORY_GET]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
}

export async function PUT(req: Request, { params }: IParams) {
      try {
            const { id } = params;
            const body = await req.json();
            const data = updateItemCategorySchema.parse(body);

            const category = await db.itemCategory.update({
                  where: { id },
                  data,
            });

            return NextResponse.json(category);
      } catch (error) {
            if (error instanceof ZodError) {
                  return new NextResponse(JSON.stringify(error.issues), { status: 400 });
            }
            if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
                  return new NextResponse("A category with this name already exists.", { status: 409 });
            }
            console.error("[ITEM_CATEGORY_PUT]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
}

export async function DELETE(req: Request, { params }: IParams) {
      try {
            const { id } = params;

            // Check if any items are using this category
            const itemsInCategory = await db.item.count({
                  where: { categoryId: id },
            });

            if (itemsInCategory > 0) {
                  return new NextResponse("Cannot delete category because it is being used by some items.", { status: 400 });
            }

            await db.itemCategory.delete({
                  where: { id },
            });

            return new NextResponse(null, { status: 204 });
      } catch (error) {
            console.error("[ITEM_CATEGORY_DELETE]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 