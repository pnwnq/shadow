"use client"

import * as React from "react"
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
import { Icons } from "@/components/icons"

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

interface MainNavProps {
  items?: { title: string; href?: string; disabled?: boolean }[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          Shadow
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    pathname?.startsWith(item.href) 
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      {children}
    </div>
  )
}

export function MobileNav() {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Home className="size-[1.2rem]" />
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
                pathname === item.href || pathname?.startsWith(`${item.href}/`) ? "font-medium" : "",
              )}
            >
              <item.icon className="size-4" />
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
