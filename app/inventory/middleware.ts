import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getCurrentUserRole } from "@/lib/auth-utils"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 模拟获取用户角色
  // 在实际应用中，这应该从cookie或会话中获取
  const userRole = getCurrentUserRole()
  const isAdmin = userRole === "admin" || userRole === "finance_admin"

  // 如果是直接访问 /inventory 路径
  if (pathname === "/inventory") {
    // 如果是管理员或财务管理员，允许访问管理页面
    if (isAdmin) {
      return NextResponse.next()
    }

    // 如果是普通成员，重定向到成员页面
    return NextResponse.redirect(new URL("/inventory/member", request.url))
  }

  // 如果普通成员尝试访问管理员专用页面
  if (!isAdmin) {
    if (
      pathname.startsWith("/inventory/items/create") ||
      pathname.startsWith("/inventory/categories") ||
      pathname.startsWith("/inventory/locations") ||
      pathname.startsWith("/inventory/reports") ||
      pathname.startsWith("/inventory/settings")
    ) {
      return NextResponse.redirect(new URL("/inventory/member", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/inventory", "/inventory/:path*"],
}
