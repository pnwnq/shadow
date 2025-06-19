import { db } from "@/lib/prisma";
import { updateItemSchema } from "@/schemas/item";
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
            const item = await db.item.findUnique({
                  where: { id },
                  include: {
                        category: true,
                        owner: { select: { id: true, name: true, image: true } },
                        borrowedBy: { select: { id: true, name: true, image: true } },
                  },
            });

            if (!item) {
                  return new NextResponse("Item not found", { status: 404 });
            }

            return NextResponse.json(item);
      } catch (error) {
            console.error("[ITEM_GET]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
}

export async function PUT(req: Request, { params }: IParams) {
      try {
            const { id } = params;
            const body = await req.json();
            const data = updateItemSchema.parse(body);

            const item = await db.item.update({
                  where: { id },
                  data,
            });

            return NextResponse.json(item);
      } catch (error) {
            if (error instanceof ZodError) {
                  return new NextResponse(JSON.stringify(error.issues), { status: 400 });
            }
            if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
                  return new NextResponse("An item with this serial number or NFC tag already exists.", { status: 409 });
            }
            console.error("[ITEM_PUT]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
}

export async function DELETE(req: Request, { params }: IParams) {
      try {
            const { id } = params;

            // Optional: Check if the item is currently borrowed before deleting
            const item = await db.item.findUnique({ where: { id: id } });
            if (item?.status === 'BORROWED') {
                  return new NextResponse("Cannot delete an item that is currently borrowed.", { status: 400 });
            }

            await db.item.delete({
                  where: { id },
            });

            return new NextResponse(null, { status: 204 });
      } catch (error) {
            console.error("[ITEM_DELETE]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 