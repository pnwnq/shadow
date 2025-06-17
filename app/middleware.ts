import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 定义不需要认证的公共路径
const publicPaths = ["/welcome", "/about", "/achievements", "/contact", "/login", "/register", "/api/auth"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否是公共路径
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // 如果是API路由，跳过认证检查
  if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // 模拟检查用户是否已登录的逻辑
  // 在实际应用中，这应该检查cookie或会话状态
  const isAuthenticated = false // 这里应该是实际的认证检查

  // 如果用户未登录且尝试访问非公共路径，重定向到登录页面
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // 如果用户已登录且尝试访问登录或注册页面，重定向到主页
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// 配置中间件应用的路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径除了:
     * - _next (Next.js 内部文件)
     * - 静态文件 (public 文件夹)
     * - 图片 (通常存储在 public/images)
     * - favicon.ico (浏览器自动请求)
     */
    "/((?!_next/static|_next/image|images|favicon.ico).*)",
  ],
}
