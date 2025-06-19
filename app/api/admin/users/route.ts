import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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

            const where = searchQuery
                  ? {
                        OR: [
                              { name: { contains: searchQuery, mode: "insensitive" as const } },
                              { email: { contains: searchQuery, mode: "insensitive" as const } },
                        ],
                  }
                  : {};

            const users = await db.user.findMany({
                  where,
                  skip: (page - 1) * limit,
                  take: limit,
                  orderBy: { createdAt: "desc" },
            });

            const totalUsers = await db.user.count({ where });

            return NextResponse.json({
                  users: users,
                  totalUsers: totalUsers,
                  totalPages: Math.ceil(totalUsers / limit),
            });
      } catch (error) {
            console.error("[ADMIN_USERS_GET]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
}

export async function POST(req: Request) {
      const session = await auth();

      if (!session?.user || session.user.role !== Role.ADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      try {
            const body = await req.json();
            const { name, email, password, role } = body;

            if (!name || !email || !password || !role) {
                  return new NextResponse("Missing required fields", { status: 400 });
            }

            const existingUser = await db.user.findUnique({ where: { email } });
            if (existingUser) {
                  return new NextResponse("Email already in use", { status: 409 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.user.create({
                  data: {
                        name,
                        email,
                        password: hashedPassword,
                        role,
                  },
            });

            return NextResponse.json(newUser, { status: 201 });
      } catch (error) {
            console.error("[ADMIN_USERS_POST]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
} 