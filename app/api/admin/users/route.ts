import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import bcrypt from 'bcryptjs';

import { authOptions } from "@/auth";
import { db } from "@/lib/prisma";

const userSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      role: z.string(),
      status: z.string(),
      password: z.string().optional(),
});

export async function GET(req: Request) {
      try {
            const session = await getServerSession(authOptions);

            // @ts-ignore
            const userRole = session?.user?.role;
            if (!session?.user?.id || (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN")) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            const { searchParams } = new URL(req.url);
            const page = parseInt(searchParams.get("page") || "1", 10);
            const limit = parseInt(searchParams.get("limit") || "10", 10);
            const search = searchParams.get("search") || "";
            const skip = (page - 1) * limit;

            const whereCondition = search
                  ? {
                        OR: [
                              { name: { contains: search, mode: 'insensitive' } },
                              { email: { contains: search, mode: 'insensitive' } },
                        ],
                  }
                  : {};

            const users = await db.user.findMany({
                  where: whereCondition,
                  orderBy: { createdAt: 'desc' },
                  skip,
                  take: limit,
            });

            const totalUsers = await db.user.count({ where: whereCondition });

            return NextResponse.json({
                  data: users,
                  pagination: {
                        total: totalUsers,
                        page,
                        limit,
                        totalPages: Math.ceil(totalUsers / limit),
                  },
            });
      } catch (error) {
            console.error("[USERS_GET]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
}

export async function POST(req: Request) {
      try {
            const session = await getServerSession(authOptions);
            const { values } = await req.json();

            // @ts-ignore
            const userRole = session?.user?.role;
            if (!session?.user?.id || (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN")) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            const validatedFields = userSchema.safeParse(values);
            if (!validatedFields.success) {
                  return new NextResponse("Invalid input", { status: 400 });
            }

            const { name, email, password, role, status } = validatedFields.data;

            const existingUser = await db.user.findUnique({ where: { email } });
            if (existingUser) {
                  return new NextResponse("Email already in use", { status: 409 });
            }

            const hashedPassword = await bcrypt.hash(password || "password123", 10);

            const newUser = await db.user.create({
                  data: {
                        name,
                        email,
                        password: hashedPassword,
                        // @ts-ignore
                        role,
                        // @ts-ignore
                        status,
                  },
            });

            return NextResponse.json(newUser);

      } catch (error) {
            console.error("[USERS_POST]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 