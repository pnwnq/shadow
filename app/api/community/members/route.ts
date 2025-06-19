import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
      try {
            const users = await db.user.findMany({
                  orderBy: {
                        createdAt: "desc",
                  },
            });
            return NextResponse.json(users);
      } catch (error) {
            console.error("[COMMUNITY_MEMBERS_GET]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
} 