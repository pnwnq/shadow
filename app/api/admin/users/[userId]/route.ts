import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
      req: Request,
      { params }: { params: { userId: string } }
) {
      const session = await auth();

      if (!session?.user || session.user.role !== Role.ADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      try {
            const user = await db.user.findUnique({
                  where: { id: params.userId },
            });
            if (!user) {
                  return new NextResponse("User not found", { status: 404 });
            }
            return NextResponse.json(user);
      } catch (error) {
            console.error("[ADMIN_USER_GET]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
}

export async function PATCH(
      req: Request,
      { params }: { params: { userId: string } }
) {
      const session = await auth();

      if (!session?.user || session.user.role !== Role.ADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      try {
            const body = await req.json();
            const { name, email, role } = body;

            const updatedUser = await db.user.update({
                  where: { id: params.userId },
                  data: { name, email, role },
            });
            return NextResponse.json(updatedUser);
      } catch (error) {
            console.error("[ADMIN_USER_PATCH]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
}

export async function DELETE(
      req: Request,
      { params }: { params: { userId: string } }
) {
      const session = await auth();

      if (!session?.user || session.user.role !== Role.ADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      try {
            await db.user.delete({
                  where: { id: params.userId },
            });
            return new NextResponse(null, { status: 204 });
      } catch (error) {
            console.error("[ADMIN_USER_DELETE]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
} 