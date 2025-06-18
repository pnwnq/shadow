import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { HomeClient } from './home-client';
import { db } from '@/lib/prisma';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  // 在真实的服务器组件中，我们应该总是从数据库获取最新的用户信息
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (!user) {
    // 理论上中间件会处理未登录情况，但这里是一个安全兜底
    return <div>请先登录...</div>;
  }

  return <HomeClient user={user} />;
}
