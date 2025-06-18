"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export function GlobalNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const userRole = session?.user?.role

  // 检查路径是否是公共路径
  const isPublicPath = ["/welcome", "/about", "/achievements", "/contact", "/login", "/register"].some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )

  // 检查是否是管理路径
  const isAdminPath = pathname.startsWith("/admin")

  // 如果是公共路径，显示公共导航
  if (isPublicPath) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container global-nav-container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">Shadow实验室</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/welcome"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/welcome" ? "text-foreground" : "text-foreground/60",
                )}
              >
                首页
              </Link>
              <Link
                href="/about"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/about" ? "text-foreground" : "text-foreground/60",
                )}
              >
                关于我们
              </Link>
              <Link
                href="/achievements"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/achievements" ? "text-foreground" : "text-foreground/60",
                )}
              >
                成果展示
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/contact" ? "text-foreground" : "text-foreground/60",
                )}
              >
                联系方式
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button asChild>
                <Link href="/login">登录</Link>
              </Button>
            </div>
            <nav className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </nav>
          </div>
        </div>
        {isOpen && (
          <div className="container md:hidden">
            <nav className="flex flex-col space-y-3 pb-3 pt-1">
              <Link
                href="/welcome"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/welcome" ? "text-foreground" : "text-foreground/60",
                )}
                onClick={() => setIsOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/about"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/about" ? "text-foreground" : "text-foreground/60",
                )}
                onClick={() => setIsOpen(false)}
              >
                关于我们
              </Link>
              <Link
                href="/achievements"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/achievements" ? "text-foreground" : "text-foreground/60",
                )}
                onClick={() => setIsOpen(false)}
              >
                成果展示
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/contact" ? "text-foreground" : "text-foreground/60",
                )}
                onClick={() => setIsOpen(false)}
              >
                联系方式
              </Link>
            </nav>
          </div>
        )}
      </header>
    )
  }

  // 如果是管理路径，显示简化导航
  if (isAdminPath) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container global-nav-container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="flex items-center space-x-2">
              <span className="font-bold">管理中心</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/home">返回系统</Link>
            </Button>
            <UserNav />
          </div>
        </div>
      </header>
    )
  }

  // 否则显示主导航
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container global-nav-container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Shadow实验室</span>
          </Link>
          {status === 'authenticated' && <MainNav userRole={userRole} />}
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center">
            {status === 'authenticated' && (userRole === "SUPER_ADMIN" || userRole === "ADMIN") && (
              <Button variant="ghost" size="sm" asChild className="mr-2">
                <Link href="/admin">管理中心</Link>
              </Button>
            )}
            <UserNav />
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-3 pb-3 pt-1">
            {status === 'authenticated' && <MainNav userRole={userRole} mobile />}
          </nav>
        </div>
      )}
    </header>
  )
}
