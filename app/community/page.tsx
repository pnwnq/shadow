import type { Metadata } from "next"
import { db } from "@/lib/prisma"
import CommunityClientPage from "./CommunityClientPage"
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config"

export const metadata: Metadata = {
  title: "社区交流 | Shadow 实验室管理系统",
  description: "Shadow 实验室管理系统社区交流页面",
}

export default async function CommunityPage() {
  const initialPosts = await db.communityPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      category: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  })

  return (
    <main className="flex-1">
      <CommunityClientPage initialPosts={initialPosts} />
    </main>
  )
}
