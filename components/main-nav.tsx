"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Package, CreditCard, Trophy, MessageSquare, Menu, X, BarChart, Zap, Bell } from "lucide-react"

import { cn } from "@/lib/utils"
import { hasPermission, getCurrentUserRole } from "@/lib/auth-utils"
import { useState } from "react"

interface MobileNavProps {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname()
  const userRole = getCurrentUserRole()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    {
      title: "首页",
      href: "/home",
      icon: <Home className="h-4 w-4" />,
      permission: "home_view",
    },
    {
      title: "项目",
      href: "/projects",
      icon: <BarChart className="h-4 w-4" />,
      permission: "projects_view",
    },
    {
      title: "物品管理",
      href: "/inventory",
      icon: <Package className="h-4 w-4" />,
      permission: "inventory_approve", // 只有管理员才能看到物品管理
    },
    {
      title: "物品",
      href: "/inventory/member",
      icon: <Package className="h-4 w-4" />,
      permission: "inventory_request", // 所有成员都能看到物品
    },
    {
      title: "财务",
      href: "/finance",
      icon: <CreditCard className="h-4 w-4" />,
      permission: "finance_view",
    },
    {
      title: "竞赛",
      href: "/competitions",
      icon: <Trophy className="h-4 w-4" />,
      permission: "competitions_view",
    },
    {
      title: "文档",
      href: "/documents",
      icon: <FileText className="h-4 w-4" />,
      permission: "documents_view",
    },
    {
      title: "社区",
      href: "/community",
      icon: <MessageSquare className="h-4 w-4" />,
      permission: "community_view",
    },
    {
      title: "AI助手",
      href: "/ai-assistant",
      icon: <Zap className="h-4 w-4" />,
      permission: "home_view", // 修改为基本权限，让所有成员都能访问
    },
  ]

  // 只有超级管理员才能看到通知管理
  if (userRole === "super_admin") {
    navItems.push({
      title: "通知",
      href: "/notifications",
      icon: <Bell className="h-4 w-4" />,
      permission: "system_settings",
    })
  }

  const filteredNavItems = navItems.filter((item) => hasPermission(userRole as any, item.permission))

  return (
    <div className={cn("flex items-center", className)}>
      <button onClick={() => setIsOpen(!isOpen)} className="mr-2 md:hidden">
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle Menu</span>
      </button>
      {isOpen && (
        <div className="absolute top-14 left-0 z-50 w-full rounded-md border bg-popover p-4 shadow-md">
          <nav className="grid gap-4 text-sm font-medium">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 transition-colors hover:text-foreground/80",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}

interface MainNavProps {
  userRole?: string
}

export function MainNav({ userRole }: MainNavProps) {
  const pathname = usePathname()
  const currentRole = userRole || getCurrentUserRole()

  const navItems = [
    {
      title: "首页",
      href: "/home",
      icon: <Home className="h-4 w-4" />,
      permission: "home_view",
    },
    {
      title: "项目",
      href: "/projects",
      icon: <BarChart className="h-4 w-4" />,
      permission: "projects_view",
    },
    {
      title: "物品管理",
      href: "/inventory",
      icon: <Package className="h-4 w-4" />,
      permission: "inventory_approve", // 只有管理员才能看到物品管理
    },
    {
      title: "物品",
      href: "/inventory/member",
      icon: <Package className="h-4 w-4" />,
      permission: "inventory_request", // 所有成员都能看到物品
    },
    {
      title: "财务",
      href: "/finance",
      icon: <CreditCard className="h-4 w-4" />,
      permission: "finance_view",
    },
    {
      title: "竞赛",
      href: "/competitions",
      icon: <Trophy className="h-4 w-4" />,
      permission: "competitions_view",
    },
    {
      title: "文档",
      href: "/documents",
      icon: <FileText className="h-4 w-4" />,
      permission: "documents_view",
    },
    {
      title: "社区",
      href: "/community",
      icon: <MessageSquare className="h-4 w-4" />,
      permission: "community_view",
    },
    {
      title: "AI助手",
      href: "/ai-assistant",
      icon: <Zap className="h-4 w-4" />,
      permission: "home_view", // 修改为基本权限，让所有成员都能访问
    },
  ]

  // 只有超级管理员才能看到通知管理
  if (currentRole === "super_admin") {
    navItems.push({
      title: "通知",
      href: "/notifications",
      icon: <Bell className="h-4 w-4" />,
      permission: "system_settings",
    })
  }

  const filteredNavItems = navItems.filter((item) => hasPermission(currentRole, item.permission))

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium main-nav-links">
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-foreground/80",
            pathname === item.href || pathname.startsWith(item.href + "/") ? "text-foreground" : "text-foreground/60",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
