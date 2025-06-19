import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IParams {
      params: {
            tagId: string;
      };
}

export async function GET(req: Request, { params }: IParams) {
      try {
            const { tagId } = params;

            if (!tagId) {
                  return new NextResponse("NFC Tag ID is required", { status: 400 });
            }

            const item = await db.item.findUnique({
                  where: { nfcTagId: tagId },
                  include: {
                        category: true,
                        owner: { select: { id: true, name: true, image: true } },
                        borrowedBy: { select: { id: true, name: true, image: true } },
                  },
            });

            if (!item) {
                  return new NextResponse("Item with this NFC Tag not found", { status: 404 });
            }

            return NextResponse.json(item);
      } catch (error) {
            console.error("[NFC_GET]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 