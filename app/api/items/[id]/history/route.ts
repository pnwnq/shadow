import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IParams {
      params: {
            id: string;
      };
}

export async function GET(req: Request, { params }: IParams) {
      try {
            const { id } = params;

            const logs = await db.itemLog.findMany({
                  where: {
                        itemId: id,
                  },
                  orderBy: {
                        createdAt: "desc",
                  },
                  include: {
                        user: {
                              select: {
                                    id: true,
                                    name: true,
                                    image: true,
                              },
                        },
                  },
            });

            return NextResponse.json(logs);
      } catch (error) {
            console.error("[ITEM_HISTORY_GET]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 