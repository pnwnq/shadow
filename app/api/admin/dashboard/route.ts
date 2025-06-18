import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
      const session = await auth();

      if (!session?.user || session.user.role !== Role.ADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      try {
            const userCount = await db.user.count();
            const documentCount = await db.document.count();

            // In a real app, you'd calculate this properly.
            const recentActivity = [
                  { date: "2024-01-01", logins: 10, uploads: 5 },
                  { date: "2024-01-02", logins: 12, uploads: 8 },
            ];

            return NextResponse.json({
                  userCount,
                  documentCount,
                  recentActivity,
            });
      } catch (error) {
            console.error("[ADMIN_DASHBOARD_GET]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
} 