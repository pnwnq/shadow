import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
      const session = await auth();

      if (!session?.user || (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      try {
            const settings = await db.systemSetting.findMany();

            const settingsObject = settings.reduce((acc: any, setting: { key: string, value: string }) => {
                  acc[setting.key] = setting.value;
                  return acc;
            }, {});

            return NextResponse.json(settingsObject);
      } catch (error) {
            console.error("[GET_SETTINGS]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
}

export async function POST(req: Request) {
      const session = await auth();

      if (!session?.user || (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      try {
            const body = await req.json();

            const updatePromises = Object.keys(body).map(key =>
                  db.systemSetting.upsert({
                        where: { key },
                        update: { value: body[key] },
                        create: { key, value: body[key] },
                  })
            );

            await db.$transaction(updatePromises);

            await db.auditLog.create({
                  data: {
                        action: "SECURITY_SETTINGS_UPDATED",
                        entityType: "SYSTEM",
                        entityId: session.user.id, // The user who performed the action
                        userId: session.user.id,
                        level: "WARN",
                        type: "security"
                  }
            });

            return NextResponse.json({ message: "Settings updated successfully" });
      } catch (error) {
            console.error("[POST_SETTINGS]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 