import { getRoleName } from "@/components/role-utils"
import { type Role } from "@/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RoleBadgeProps {
  role: Role
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const roleVariant: { [key in Role]: "default" | "destructive" | "secondary" | "outline" } = {
    SUPER_ADMIN: "destructive",
    ADMIN: "default",
    MEMBER: "secondary",
    COMPETITION_ACCOUNTANT: "outline",
  }

  return (
    <Badge variant={roleVariant[role]} className={cn(className)}>
      {getRoleName(role)}
    </Badge>
  )
}
