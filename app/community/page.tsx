import type { Metadata } from "next"
import CommunityClientPage from "./CommunityClientPage"

export const metadata: Metadata = {
  title: "社区交流 | Shadow 实验室管理系统",
  description: "Shadow 实验室管理系统社区交流页面",
}

export default function CommunityPage() {
  return (
    <main className="flex-1">
      <CommunityClientPage />
    </main>
  )
}
