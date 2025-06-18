import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { db } from "@/lib/prisma";

export async function GET() {
      try {
            const session = await getServerSession(authOptions);

            // @ts-ignore
            const userRole = session?.user?.role;
            if (!session?.user?.id || (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN")) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            // 1. Get total users
            const totalUsers = await db.user.count();

            // 2. Get active users (status = ACTIVE)
            const activeUsers = await db.user.count({
                  where: { status: "ACTIVE" },
            });

            // 3. Get user role distribution
            const roleDistribution = await db.user.groupBy({
                  by: ["role"],
                  _count: {
                        role: true,
                  },
            });

            // 4. Mock system metrics (these can't be fetched from db)
            const systemLoad = Math.floor(Math.random() * (75 - 25 + 1) + 25);
            const storageUsage = Math.floor(Math.random() * (80 - 40 + 1) + 40);

            return NextResponse.json({
                  totalUsers,
                  activeUsers,
                  roleDistribution: roleDistribution.map((item: any) => ({
                        role: item.role,
                        count: item._count.role,
                  })),
                  systemLoad,
                  storageUsage,
            });

      } catch (error) {
            console.error("[GET_DASHBOARD_DATA]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 