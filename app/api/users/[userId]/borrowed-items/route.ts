import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(
      request: Request,
      { params }: { params: { userId: string } }
) {
      try {
            const userId = params.userId;

            if (!userId) {
                  return new NextResponse("User ID is required", { status: 400 });
            }

            const borrowedItems = await db.item.findMany({
                  where: {
                        borrowedById: userId,
                  },
                  include: {
                        category: true,
                  },
                  orderBy: {
                        borrowedAt: 'desc',
                  }
            });

            return NextResponse.json(borrowedItems);
      } catch (error) {
            console.error(`[USER_BORROWED_ITEMS_GET] Error fetching items for user ${params.userId}:`, error);
            return new NextResponse('Internal Error', { status: 500 });
      }
} 