import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { novu } from '@/lib/novu';

export async function POST() {
      const session = await auth();

      if (!session?.user?.id || !session.user.email) {
            // 即使是内部API调用，也返回标准未授权响应
            return new NextResponse('Unauthorized', { status: 401 });
      }

      try {
            // 使用从会话中获取的用户信息，在Novu中创建或更新订阅者。
            // 这是连接我们用户系统和Novu平台的关键步骤。
            await novu.subscribers.identify(session.user.id, {
                  email: session.user.email,
                  firstName: session.user.name ?? '',
                  avatar: session.user.image ?? '',
            });

            return NextResponse.json({ success: true });
      } catch (error) {
            console.error('Error identifying subscriber in Novu:', error);
            // 在生产环境中，这里应该有更详细的日志记录
            return new NextResponse('Internal Server Error', { status: 500 });
      }
} 