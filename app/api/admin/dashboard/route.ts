import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { Role, UserStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
      const session = await auth();

      // Allow both ADMIN and SUPER_ADMIN
      if (!session?.user || (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      try {
            const totalUsers = await db.user.count();
            const activeUsers = await db.user.count({ where: { status: UserStatus.ACTIVE } });

            const roleDistribution = await db.user.groupBy({
                  by: ['role'],
                  _count: {
                        role: true,
                  },
            });

            const formattedRoleDistribution = roleDistribution.map(item => ({
                  role: item.role,
                  count: item._count.role,
            }));

            // Mock data for system load and storage as the original did
            const systemLoad = Math.floor(Math.random() * 100);
            const storageUsage = Math.floor(Math.random() * 100);

            return NextResponse.json({
                  totalUsers,
                  activeUsers,
                  roleDistribution: formattedRoleDistribution,
                  systemLoad,
                  storageUsage,
            });
      } catch (error) {
            console.error("[ADMIN_DASHBOARD_GET]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
} 