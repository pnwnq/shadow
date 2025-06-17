import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { ProfileClient } from "./profile-client"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return <div>请先登录以查看个人资料。</div>
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    return <div>无法加载用户信息。</div>
  }

  return <ProfileClient user={user} />
}
