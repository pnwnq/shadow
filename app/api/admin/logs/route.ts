import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/auth";
import { db } from "@/lib/prisma";

export async function GET(req: Request) {
      try {
            const session = await getServerSession(authOptions);
            const { searchParams } = new URL(req.url);

            // @ts-ignore
            const userRole = session?.user?.role;
            if (!session?.user?.id || (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN")) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            const page = parseInt(searchParams.get("page") || "1", 10);
            const limit = parseInt(searchParams.get("limit") || "10", 10);
            const searchQuery = searchParams.get("search") || "";
            const type = searchParams.get("type") || undefined;
            const level = searchParams.get("level") || undefined;
            const sortBy = searchParams.get("sortBy") || "timestamp";
            const sortOrder = searchParams.get("sortOrder") || "desc";

            const where: any = {
                  AND: [
                        searchQuery ? {
                              OR: [
                                    { user: { name: { contains: searchQuery, mode: "insensitive" } } },
                                    { action: { contains: searchQuery, mode: "insensitive" } },
                                    { entityType: { contains: searchQuery, mode: "insensitive" } },
                                    { ip: { contains: searchQuery, mode: "insensitive" } },
                              ],
                        } : {},
                        type ? { type: { equals: type } } : {},
                        level ? { level: { equals: level } } : {},
                  ],
            };

            const logs = await db.auditLog.findMany({
                  where,
                  include: {
                        user: {
                              select: {
                                    name: true,
                              },
                        },
                  },
                  orderBy: {
                        [sortBy]: sortOrder,
                  },
                  skip: (page - 1) * limit,
                  take: limit,
            });

            const totalLogs = await db.auditLog.count({ where });

            const formattedLogs = logs.map((log: any) => ({
                  id: log.id,
                  timestamp: log.timestamp.toISOString(),
                  type: log.type,
                  level: log.level,
                  user: log.user?.name || "System",
                  userId: log.userId,
                  action: log.action,
                  details: `[${log.entityType}] - ID: ${log.entityId}`,
                  ip: log.ip,
            }));

            return NextResponse.json({
                  data: formattedLogs,
                  pagination: {
                        page,
                        limit,
                        total: totalLogs,
                        totalPages: Math.ceil(totalLogs / limit),
                  },
            });
      } catch (error) {
            console.error("[GET_LOGS]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 