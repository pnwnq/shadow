import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
      const session = await auth();

      if (!session?.user || (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      try {
            const { searchParams } = new URL(req.url);
            const page = parseInt(searchParams.get("page") || "1", 10);
            const limit = parseInt(searchParams.get("limit") || "10", 10);
            const searchQuery = searchParams.get("search") || "";
            const logType = searchParams.get("type");
            const logLevel = searchParams.get("level");
            const sortBy = searchParams.get("sortBy") || "timestamp";
            const sortOrder = searchParams.get("sortOrder") || "desc";

            let where: any = {
                  OR: searchQuery ? [
                        { action: { contains: searchQuery, mode: "insensitive" } },
                        { entityType: { contains: searchQuery, mode: "insensitive" } },
                        { ip: { contains: searchQuery, mode: "insensitive" } },
                        { user: { name: { contains: searchQuery, mode: "insensitive" } } },
                  ] : undefined,
            };

            if (logType) {
                  where.type = logType;
            }
            if (logLevel) {
                  where.level = logLevel;
            }

            const logs = await db.auditLog.findMany({
                  where,
                  include: {
                        user: {
                              select: {
                                    name: true,
                              }
                        }
                  },
                  skip: (page - 1) * limit,
                  take: limit,
                  orderBy: { [sortBy]: sortOrder },
            });

            const totalLogs = await db.auditLog.count({ where });

            const formattedLogs = logs.map(log => ({
                  ...log,
                  user: log.user?.name || "System",
                  details: `Action on ${log.entityType} with ID: ${log.entityId}`
            }))

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
            console.error("[ADMIN_LOGS_GET]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 