import type React from "react"
import { SiteHeader } from "@/components/site-header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}
