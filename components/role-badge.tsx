import { Badge } from "@/components/ui/badge"
import { getRoleName, type UserRole } from "@/lib/auth-utils"

interface RoleBadgeProps {
  role: UserRole
  showName?: boolean
}

export function RoleBadge({ role, showName = true }: RoleBadgeProps) {
  // 角色颜色映射 - 仅保留5个角色的映射
  const roleColors: Record<UserRole, string> = {
    super_admin: "bg-red-50 text-red-700 hover:bg-red-50 border-red-200",
    admin: "bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200",
    finance_manager: "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200",
    lab_member: "bg-slate-50 text-slate-700 hover:bg-slate-50 border-slate-200",
    guest: "bg-zinc-50 text-zinc-700 hover:bg-zinc-50 border-zinc-200",
  }

  return (
    <Badge variant="outline" className={roleColors[role]}>
      {showName ? getRoleName(role) : role}
    </Badge>
  )
}
