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
            // In a real app, you'd fetch logs from a dedicated logging service or table.
            // Here we just return some mock data.
            const logs = [
                  { id: 1, level: "info", message: "User logged in", timestamp: new Date() },
                  { id: 2, level: "warn", message: "Document upload failed", timestamp: new Date() },
                  { id: 3, level: "error", message: "Database connection lost", timestamp: new Date() },
            ];
            return NextResponse.json(logs);
      } catch (error) {
            console.error("[ADMIN_LOGS_GET]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
} 