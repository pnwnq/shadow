"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { currentUserHasPermission, type Permission, type PermissionModule } from "@/lib/auth-utils"

interface AuthGuardProps {
  children: ReactNode
  requiredPermission: Permission | PermissionModule
  fallback?: ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, requiredPermission, fallback, redirectTo }: AuthGuardProps) {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    // 检查用户是否有所需权限
    const hasPermission = currentUserHasPermission(requiredPermission)
    setHasAccess(hasPermission)

    // 如果没有权限且指定了重定向路径，则重定向
    if (!hasPermission && redirectTo) {
      router.push(redirectTo)
    }
  }, [requiredPermission, redirectTo, router])

  // 加载状态
  if (hasAccess === null) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    )
  }

  // 有权限，显示内容
  if (hasAccess) {
    return <>{children}</>
  }

  // 无权限，显示自定义回退内容或默认的无权限提示
  if (fallback) {
    return <>{fallback}</>
  }

  // 默认的无权限提示
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>访问受限</AlertTitle>
      <AlertDescription className="space-y-4">
        <p>您没有访问此内容的权限。</p>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          返回上一页
        </Button>
      </AlertDescription>
    </Alert>
  )
}
