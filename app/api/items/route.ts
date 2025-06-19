import { db } from "@/lib/prisma";
import { createItemSchema } from "@/schemas/item";
import { ItemStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
      try {
            const { searchParams } = new URL(req.url);
            const page = parseInt(searchParams.get("page") || "1", 10);
            const limit = parseInt(searchParams.get("limit") || "10", 10);
            const name = searchParams.get("name");
            const categoryId = searchParams.get("categoryId");
            const status = searchParams.get("status") as ItemStatus;

            const skip = (page - 1) * limit;

            const where: any = {};
            if (name) {
                  where.name = { contains: name, mode: "insensitive" };
            }
            if (categoryId) {
                  where.categoryId = categoryId;
            }
            if (status) {
                  where.status = status;
            }

            const [items, total] = await db.$transaction([
                  db.item.findMany({
                        where,
                        skip,
                        take: limit,
                        orderBy: { createdAt: "desc" },
                        include: {
                              category: true,
                              owner: { select: { id: true, name: true, image: true } },
                              borrowedBy: { select: { id: true, name: true, image: true } },
                        },
                  }),
                  db.item.count({ where }),
            ]);

            return NextResponse.json({
                  data: items,
                  total,
                  page,
                  limit,
                  totalPages: Math.ceil(total / limit),
            });
      } catch (error) {
            console.error("[ITEMS_GET]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
}

export async function POST(req: Request) {
      try {
            const body = await req.json();
            const data = createItemSchema.parse(body);

            const item = await db.item.create({
                  data,
            });

            return NextResponse.json(item, { status: 201 });
      } catch (error) {
            if (error instanceof ZodError) {
                  return new NextResponse(JSON.stringify(error.issues), { status: 400 });
            }
            if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
                  return new NextResponse("An item with this serial number or NFC tag already exists.", { status: 409 });
            }
            console.error("[ITEMS_POST]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 