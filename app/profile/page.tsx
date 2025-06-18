import { auth } from "@/auth"
import { ProfileClient } from "./profile-client"
import { db } from "@/lib/prisma"

export default async function ProfilePage() {
  const session = await auth()

  // Redirect if not logged in, although middleware should handle this.
  if (!session?.user) {
    return <div>请先登录</div>
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!user) {
    return <div>用户不存在</div>
  }

  return <ProfileClient user={user} />
}
