import { db } from "@/lib/prisma";
import { itemActionSchema } from "@/schemas/item";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

interface IParams {
      params: {
            id: string;
      };
}

export async function POST(req: Request, { params }: IParams) {
      try {
            const { id } = params;
            const body = await req.json();
            const { userId, details } = itemActionSchema.parse(body);

            const item = await db.item.findUnique({
                  where: { id },
            });

            if (!item) {
                  return new NextResponse("Item not found", { status: 404 });
            }

            if (item.status !== "IN_STOCK") {
                  return new NextResponse(`Item is not available for borrowing. Current status: ${item.status}`, { status: 400 });
            }

            const updatedItem = await db.$transaction(async (tx) => {
                  const updated = await tx.item.update({
                        where: { id: item.id },
                        data: {
                              status: "BORROWED",
                              borrowedById: userId,
                        },
                  });

                  await tx.itemLog.create({
                        data: {
                              itemId: item.id,
                              userId: userId,
                              action: "BORROW",
                              details,
                        },
                  });

                  return updated;
            });

            return NextResponse.json(updatedItem);
      } catch (error) {
            if (error instanceof ZodError) {
                  return new NextResponse(JSON.stringify(error.issues), { status: 400 });
            }
            console.error("[ITEM_BORROW_POST]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 