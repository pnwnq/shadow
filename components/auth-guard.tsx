"use client"

import { type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { type Role } from "@/types"

// Note: This is a simplified, client-side permission check.
// For critical operations, permissions should always be re-validated on the server-side.
const rolePermissions: Record<Role, string[]> = {
  SUPER_ADMIN: ["all"],
  ADMIN: ["admin"],
  MEMBER: ["member"],
  COMPETITION_ACCOUNTANT: ["accountant"],
}

export function hasPermission(userRole: Role, requiredPermission: string): boolean {
  if (!userRole) return false
  const userPermissions = rolePermissions[userRole]
  if (!userPermissions) return false

  if (userPermissions.includes("all")) return true
  return userPermissions.includes(requiredPermission)
}

interface AuthGuardProps {
  children: ReactNode
  requiredPermission: string
  fallback?: ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, requiredPermission, fallback, redirectTo }: AuthGuardProps) {
  const router = useRouter()
  const { data: session, status } = useSession()

  // Handle loading state
  if (status === "loading") {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    )
  }

  // Handle unauthenticated state or missing role
  if (status === "unauthenticated" || !session?.user?.role) {
    if (redirectTo) {
      router.push(redirectTo)
      return null // or a loading spinner
    }
    return fallback || <DefaultFallback /> // Show fallback or default message
  }

  // Check permission
  const userRole = session.user.role
  const hasAccess = hasPermission(userRole, requiredPermission)

  if (hasAccess) {
    return <>{children}</>
  }

  // Handle no access
  if (redirectTo) {
    router.push(redirectTo)
    return null // or a loading spinner
  }

  return fallback || <DefaultFallback />
}

const DefaultFallback = () => {
  const router = useRouter()
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
