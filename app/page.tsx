import { redirect } from "next/navigation"

export default function RootPage() {
  // 检查用户是否已登录
  const isLoggedIn = false // 这里应该是实际的登录状态检查逻辑

  // 如果已登录，重定向到个人主页
  // 如果未登录，重定向到欢迎页面
  if (isLoggedIn) {
    redirect("/dashboard")
  } else {
    redirect("/welcome")
  }

  // 由于使用了redirect，这里的返回语句不会执行
  return null
}
