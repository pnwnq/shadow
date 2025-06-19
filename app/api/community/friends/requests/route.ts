import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
      const session = await auth();

      if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
      }

      const { targetUserId } = await req.json();

      if (!targetUserId) {
            return new NextResponse("Target user ID is required", { status: 400 });
      }

      const requesterId = session.user.id;

      if (requesterId === targetUserId) {
            return new NextResponse("You cannot send a friend request to yourself", { status: 400 });
      }

      try {
            // Check if a friendship already exists
            const existingFriendship = await db.friendship.findFirst({
                  where: {
                        OR: [
                              { requesterId: requesterId, receiverId: targetUserId },
                              { requesterId: targetUserId, receiverId: requesterId },
                        ],
                  },
            });

            if (existingFriendship) {
                  return new NextResponse("Friendship already exists or request is pending", { status: 409 });
            }

            // Create the friend request
            const newFriendship = await db.friendship.create({
                  data: {
                        requesterId: requesterId,
                        receiverId: targetUserId,
                        status: "PENDING",
                  },
            });

            // Log the action
            await db.auditLog.create({
                  data: {
                        action: "FRIEND_REQUEST_SENT",
                        entityType: "FRIENDSHIP",
                        entityId: newFriendship.id,
                        userId: requesterId,
                        level: "INFO",
                        type: "action"
                  }
            });

            return NextResponse.json({ message: "Friend request sent successfully." }, { status: 201 });
      } catch (error) {
            console.error("[FRIEND_REQUEST_POST]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
} 