import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Role } from "@prisma/client";

export async function GET(request: Request) {
      const session = await getServerSession(authOptions);

      // Protect the route
      if (!session || !session.user || (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)) {
            return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
      }

      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);
      const search = searchParams.get("search") || "";

      const skip = (page - 1) * limit;

      try {
            const whereCondition = search
                  ? {
                        OR: [
                              { name: { contains: search, mode: "insensitive" as const } },
                              { email: { contains: search, mode: "insensitive" as const } },
                        ],
                  }
                  : {};

            const users = await db.user.findMany({
                  where: whereCondition,
                  skip: skip,
                  take: limit,
                  orderBy: {
                        createdAt: "desc",
                  },
            });

            const totalUsers = await db.user.count({ where: whereCondition });

            return NextResponse.json({
                  users,
                  totalPages: Math.ceil(totalUsers / limit),
                  currentPage: page,
                  totalUsers,
            });
      } catch (error) {
            console.error("[USERS_GET]", error);
            return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
      }
} 