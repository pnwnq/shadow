import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { FriendshipStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
      const session = await auth();

      if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      const userId = session.user.id;

      try {
            const friendships = await db.friendship.findMany({
                  where: {
                        status: FriendshipStatus.ACCEPTED,
                        OR: [
                              { requesterId: userId },
                              { receiverId: userId },
                        ],
                  },
                  include: {
                        requester: true,
                        receiver: true,
                  },
            });

            const friends = friendships.map(friendship => {
                  return friendship.requesterId === userId ? friendship.receiver : friendship.requester;
            });

            return NextResponse.json(friends);
      } catch (error) {
            console.error("[FRIENDS_GET]", error);
            return new NextResponse("Internal Error", { status: 500 });
      }
} 