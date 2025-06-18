import { type Role } from "@/types"

export function getRoleName(role: Role): string {
      const roleNames: Record<Role, string> = {
            SUPER_ADMIN: "超级管理员",
            ADMIN: "管理员",
            MEMBER: "实验室成员",
            COMPETITION_ACCOUNTANT: "竞赛财务",
      }
      return roleNames[role] || "未知角色"
} 