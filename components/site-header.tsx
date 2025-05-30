import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { MainNav, MobileNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <MobileNav />
          <MainNav />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input type="search" placeholder="搜索..." className="w-64 rounded-lg pl-8" />
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  )
} 