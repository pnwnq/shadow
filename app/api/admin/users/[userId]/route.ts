import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Role } from "@prisma/client";

async function checkPermissions() {
      const session = await getServerSession(authOptions);
      if (!session || !session.user || (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)) {
            return false;
      }
      return true;
}

export async function PATCH(
      request: Request,
      { params }: { params: { userId: string } }
) {
      if (!(await checkPermissions())) {
            return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
      }

      try {
            const { userId } = params;
            const body = await request.json();
            const { status, role } = body;

            if (!userId) {
                  return new NextResponse(JSON.stringify({ error: "User ID is required" }), { status: 400 });
            }

            if (!status && !role) {
                  return new NextResponse(JSON.stringify({ error: "Either status or role is required to update" }), { status: 400 });
            }

            const updatedUser = await db.user.update({
                  where: {
                        id: userId,
                  },
                  data: {
                        ...(status && { status }),
                        ...(role && { role }),
                  },
            });

            return NextResponse.json(updatedUser);
      } catch (error) {
            console.error("[USER_PATCH]", error);
            return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
      }
}


export async function DELETE(
      request: Request,
      { params }: { params: { userId: string } }
) {
      if (!(await checkPermissions())) {
            return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
      }

      try {
            const { userId } = params;

            if (!userId) {
                  return new NextResponse(JSON.stringify({ error: "User ID is required" }), { status: 400 });
            }

            // You might want to prevent users from deleting themselves.
            // const session = await getServerSession(authOptions);
            // if (session?.user?.id === userId) {
            //   return new NextResponse(JSON.stringify({ error: "You cannot delete your own account." }), { status: 403 });
            // }

            await db.user.delete({
                  where: {
                        id: userId,
                  },
            });

            return new NextResponse(null, { status: 204 }); // 204 No Content
      } catch (error) {
            console.error("[USER_DELETE]", error);
            return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
      }
} 