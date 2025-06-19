import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(
      request: Request,
      { params }: { params: { email: string } }
) {
      try {
            const email = params.email;
            const user = await db.user.findUnique({
                  where: {
                        email: decodeURIComponent(email),
                  },
                  select: {
                        id: true,
                  },
            });

            if (!user) {
                  return new NextResponse('User not found', { status: 404 });
            }

            return NextResponse.json(user);
      } catch (error) {
            console.error('[USER_BY_EMAIL_GET]', error);
            return new NextResponse('Internal Error', { status: 500 });
      }
} 