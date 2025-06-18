import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/auth";
import { db } from "@/lib/prisma";

export async function GET() {
      try {
            const session = await getServerSession(authOptions);

            // @ts-ignore
            const userRole = session?.user?.role;
            if (!session?.user?.id || (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN")) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

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
      try {
            const session = await getServerSession(authOptions);

            // @ts-ignore
            const userRole = session?.user?.role;
            if (!session?.user?.id || (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN")) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            const body = await req.json();

            const updatePromises = Object.keys(body).map(key =>
                  db.systemSetting.upsert({
                        where: { key },
                        update: { value: body[key] },
                        create: { key, value: body[key] },
                  })
            );

            await db.$transaction(updatePromises);

            return NextResponse.json({ message: "Settings updated successfully" });
      } catch (error) {
            console.error("[POST_SETTINGS]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 