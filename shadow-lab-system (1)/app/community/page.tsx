import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import CommunityClientPage from "./CommunityClientPage"

export const metadata: Metadata = {
  title: "社区交流 | Shadow 实验室管理系统",
  description: "Shadow 实验室管理系统社区交流页面",
}

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CommunityClientPage />
      </main>
    </div>
  )
}
