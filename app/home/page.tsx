import { auth } from '@/auth';
import { HomeClient } from './home-client';
import { db } from '@/lib/prisma';

export default async function Home() {
  const session = await auth();

  const user = session?.user
    ? await db.user.findUnique({ where: { id: session.user.id } })
    : null;

  return <HomeClient user={user} />;
}
