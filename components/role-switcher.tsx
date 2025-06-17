"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Shield } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { type UserRole, getRoleName } from "@/lib/auth-utils"
import { useToast } from "@/components/ui/use-toast"

// 更新后的角色列表
const roles: UserRole[] = [
  "super_admin", // 超级管理员
  "admin", // 管理员
  "finance_manager", // 财务管理员
  "lab_member", // 实验室成员
  "guest", // 访客
]

// 定义每个角色对应的首页
const roleHomepages: Record<UserRole, string> = {
  super_admin: "/admin", // 超级管理员 -> 管理中心
  admin: "/home", // 管理员 -> 首页
  finance_manager: "/finance", // 财务管理员 -> 财务管理
  lab_member: "/home", // 实验室成员 -> 首页
  guest: "/welcome", // 访客 -> 欢迎页
}

export function RoleSwitcher() {
  const [open, setOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>("lab_member")
  const { toast } = useToast()

  // 初始化时从localStorage获取角色
  useEffect(() => {
    const savedRole = localStorage.getItem("currentUserRole") as UserRole
    if (savedRole && Object.keys(roleHomepages).includes(savedRole)) {
      setSelectedRole(savedRole)
    }
  }, [])

  // 切换角色
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role)
    localStorage.setItem("currentUserRole", role)
    setOpen(false)

    toast({
      title: "角色已切换",
      description: `当前角色: ${getRoleName(role)}`,
      duration: 3000,
    })

    // 跳转到角色对应的首页
    const homepage = roleHomepages[role] || "/welcome"
    window.location.href = homepage
  }

  return (
    <div className="flex items-center">
      <Badge variant="outline" className="mr-2 hidden sm:flex">
        <Shield className="mr-1 h-3 w-3" />
        测试模式
      </Badge>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] justify-between">
            <Shield className="mr-2 h-4 w-4" />
            {getRoleName(selectedRole)}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0">
          <Command>
            <CommandInput placeholder="搜索角色..." />
            <CommandList>
              <CommandEmpty>未找到角色</CommandEmpty>
              <CommandGroup>
                {roles.map((role) => (
                  <CommandItem key={role} value={role} onSelect={() => handleRoleChange(role)}>
                    <Check className={cn("mr-2 h-4 w-4", selectedRole === role ? "opacity-100" : "opacity-0")} />
                    {getRoleName(role)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
