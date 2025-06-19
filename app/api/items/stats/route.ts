import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { ItemStatus } from '@prisma/client';

export async function GET(request: Request) {
      try {
            const total = await db.item.count();
            const inStock = await db.item.count({ where: { status: ItemStatus.IN_STOCK } });
            const borrowed = await db.item.count({ where: { status: ItemStatus.BORROWED } });
            const inRepair = await db.item.count({ where: { status: ItemStatus.IN_REPAIR } });
            const lost = await db.item.count({ where: { status: ItemStatus.LOST } });
            const disposed = await db.item.count({ where: { status: ItemStatus.DISPOSED } });

            const stats = {
                  total,
                  inStock,
                  borrowed,
                  inRepair,
                  lost,
                  disposed,
            };

            return NextResponse.json(stats);
      } catch (error) {
            console.error('[ITEM_STATS_GET]', error);
            return new NextResponse('Internal Error', { status: 500 });
      }
} 