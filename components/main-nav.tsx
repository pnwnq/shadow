"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Package, CreditCard, Trophy, MessageSquare, Zap, Bell, BarChart } from "lucide-react"

import { cn } from "@/lib/utils"
import { type Role } from "@/types"

interface MainNavProps {
  userRole: Role | undefined | null
  mobile?: boolean
}

const navItems = [
  { title: "首页", href: "/home", icon: Home, roles: ["SUPER_ADMIN", "ADMIN", "MEMBER", "COMPETITION_ACCOUNTANT"] },
  { title: "项目", href: "/projects", icon: BarChart, roles: ["SUPER_ADMIN", "ADMIN", "MEMBER"] },
  { title: "物品", href: "/inventory", icon: Package, roles: ["SUPER_ADMIN", "ADMIN", "MEMBER"] },
  { title: "财务", href: "/finance", icon: CreditCard, roles: ["SUPER_ADMIN", "ADMIN", "COMPETITION_ACCOUNTANT"] },
  { title: "竞赛", href: "/competitions", icon: Trophy, roles: ["SUPER_ADMIN", "ADMIN", "MEMBER", "COMPETITION_ACCOUNTANT"] },
  { title: "文档", href: "/documents", icon: FileText, roles: ["SUPER_ADMIN", "ADMIN", "MEMBER", "COMPETITION_ACCOUNTANT"] },
  { title: "社区", href: "/community", icon: MessageSquare, roles: ["SUPER_ADMIN", "ADMIN", "MEMBER"] },
  { title: "AI助手", href: "/ai-assistant", icon: Zap, roles: ["SUPER_ADMIN", "ADMIN", "MEMBER"] },
  { title: "通知", href: "/notifications", icon: Bell, roles: ["SUPER_ADMIN"] },
]

export function MainNav({ userRole, mobile = false }: MainNavProps) {
  const pathname = usePathname()

  if (!userRole) {
    return null // or a loading skeleton
  }

  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

  const navLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-2 transition-colors hover:text-foreground/80",
      pathname.startsWith(href) ? "text-foreground" : "text-foreground/60"
    )

  if (mobile) {
    return (
      <nav className="grid gap-4 text-sm font-medium">
        {filteredNavItems.map((item) => (
          <Link key={item.href} href={item.href} className={navLinkClasses(item.href)}>
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    )
  }

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium main-nav-links">
      {filteredNavItems.map((item) => (
        <Link key={item.href} href={item.href} className={navLinkClasses(item.href)}>
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
