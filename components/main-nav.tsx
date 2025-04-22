"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, FileText, Folder, Home, MessageSquare, Package } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  {
    title: "控制面板",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "物品管理",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "文档管理",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "项目管理",
    href: "/projects",
    icon: Folder,
  },
  {
    title: "学习路径",
    href: "/learning",
    icon: BookOpen,
  },
  {
    title: "社区论坛",
    href: "/community",
    icon: MessageSquare,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6">
      <Link href="/" className="flex items-center gap-2 font-bold">
        Shadow
      </Link>
      <nav className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href || pathname.startsWith(`${item.href}/`) ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export function MobileNav() {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Home className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>导航菜单</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link
              href={item.href}
              className={cn(
                "flex w-full items-center gap-2",
                pathname === item.href || pathname.startsWith(`${item.href}/`) ? "font-medium" : "",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
