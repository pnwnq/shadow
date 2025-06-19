"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, ChevronDown, Edit, Plus, Search, Shield, Trash, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { hasPermission } from "@/components/auth-guard"
import { type Role } from "@/types"

// 角色定义 - 已简化为5个角色
const roles = [
  {
    id: "super_admin",
    name: "超级管理员",
    description: "拥有系统最高权限，可以管理所有功能和用户角色",
    users: 2,
    permissions: ["all"],
    color: "red",
  },
  {
    id: "admin",
    name: "管理员",
    description: "拥有大部分系统管理权限，可以管理竞赛、项目、设备等各个模块",
    users: 5,
    permissions: ["dashboard", "projects", "inventory", "finance", "competitions", "documents", "community", "users"],
    color: "orange",
  },
  {
    id: "finance_manager",
    name: "财务管理员",
    description: "负责管理财务申请和预算",
    users: 3,
    permissions: ["dashboard", "finance", "projects_view", "competitions_view", "documents_view", "community"],
    color: "blue",
  },
  {
    id: "lab_member",
    name: "实验室成员",
    description: "实验室正式成员，可以参与项目和使用资源",
    users: 25,
    permissions: [
      "dashboard",
      "projects_view",
      "inventory_request",
      "finance_request",
      "competitions_view",
      "documents_view",
      "community",
    ],
    color: "slate",
  },
  {
    id: "guest",
    name: "访客",
    description: "未登录的访客用户",
    users: "-",
    permissions: ["public"],
    color: "zinc",
  },
]

// 权限模块定义
const permissionModules = [
  {
    id: "dashboard",
    name: "控制面板",
    permissions: [
      { id: "dashboard_view", name: "查看控制面板", description: "允许查看控制面板及基本统计信息" },
      { id: "dashboard_analytics", name: "查看详细分析", description: "允许查看详细的数据分析和报表" },
    ],
  },
  {
    id: "projects",
    name: "项目管理",
    permissions: [
      { id: "projects_view", name: "查看项目", description: "允许查看项目列表和详情" },
      { id: "projects_create", name: "创建项目", description: "允许创建新项目" },
      { id: "projects_edit", name: "编辑项目", description: "允许编辑项目信息" },
      { id: "projects_delete", name: "删除项目", description: "允许删除项目" },
      { id: "projects_manage_members", name: "管理项目成员", description: "允许添加和移除项目成员" },
    ],
  },
  {
    id: "inventory",
    name: "物品管理",
    permissions: [
      { id: "inventory_view", name: "查看物品", description: "允许查看物品列表和详情" },
      { id: "inventory_request", name: "申请借用", description: "允许申请借用物品" },
      { id: "inventory_add", name: "添加物品", description: "允许添加新物品" },
      { id: "inventory_edit", name: "编辑物品", description: "允许编辑物品信息" },
      { id: "inventory_delete", name: "删除物品", description: "允许删除物品" },
      { id: "inventory_approve", name: "审批借用", description: "允许审批物品借用申请" },
    ],
  },
  {
    id: "finance",
    name: "财务管理",
    permissions: [
      { id: "finance_view", name: "查看财务", description: "允许查看财务记录和预算" },
      { id: "finance_request", name: "申请报销/采购", description: "允许提交报销和采购申请" },
      { id: "finance_approve", name: "审批财务申请", description: "允许审批财务申请" },
      { id: "finance_manage", name: "管理预算", description: "允许管理和分配预算" },
    ],
  },
  {
    id: "competitions",
    name: "竞赛管理",
    permissions: [
      { id: "competitions_view", name: "查看竞赛", description: "允许查看竞赛信息" },
      { id: "competitions_register", name: "报名竞赛", description: "允许报名参加竞赛" },
      { id: "competitions_manage", name: "管理竞赛", description: "允许管理竞赛信息和团队" },
    ],
  },
  {
    id: "documents",
    name: "文档管理",
    permissions: [
      { id: "documents_view", name: "查看文档", description: "允许查看文档" },
      { id: "documents_upload", name: "上传文档", description: "允许上传新文档" },
      { id: "documents_edit", name: "编辑文档", description: "允许编辑文档" },
      { id: "documents_delete", name: "删除文档", description: "允许删除文档" },
    ],
  },
  {
    id: "community",
    name: "社区论坛",
    permissions: [
      { id: "community_view", name: "查看社区", description: "允许查看社区内容" },
      { id: "community_post", name: "发布内容", description: "允许在社区发布内容" },
      { id: "community_comment", name: "评论", description: "允许评论社区内容" },
      { id: "community_moderate", name: "内容管理", description: "允许管理社区内容" },
      { id: "community_chat", name: "实时聊天", description: "允许参与实时聊天" },
      { id: "community_members", name: "成员目录", description: "允许访问成员目录" },
    ],
  },
  {
    id: "users",
    name: "用户管理",
    permissions: [
      { id: "users_view", name: "查看用户", description: "允许查看用户列表和详情" },
      { id: "users_edit", name: "编辑用户", description: "允许编辑用户信息" },
      { id: "users_delete", name: "删除用户", description: "允许删除用户" },
    ],
  },
  {
    id: "system",
    name: "系统管理",
    permissions: [
      { id: "system_settings", name: "系统设置", description: "允许修改系统设置" },
      { id: "system_logs", name: "系统日志", description: "允许查看系统日志" },
      { id: "roles_manage", name: "角色管理", description: "允许管理用户角色和权限" },
    ],
  },
]

// 用户列表（示例数据）- 更新角色以匹配新的角色系统
const users = [
  {
    id: "user1",
    name: "张三",
    email: "zhangsan@example.com",
    role: "admin",
    department: "电子工程",
    joinDate: "2022-09-01",
  },
  {
    id: "user2",
    name: "李四",
    email: "lisi@example.com",
    role: "admin",
    department: "计算机科学",
    joinDate: "2022-10-15",
  },
  {
    id: "user3",
    name: "王五",
    email: "wangwu@example.com",
    role: "lab_member",
    department: "机械工程",
    joinDate: "2023-02-20",
  },
  {
    id: "user4",
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "finance_manager",
    department: "管理学院",
    joinDate: "2022-08-10",
  },
  {
    id: "user5",
    name: "钱七",
    email: "qianqi@example.com",
    role: "admin",
    department: "电子工程",
    joinDate: "2023-01-05",
  },
  {
    id: "user6",
    name: "孙八",
    email: "sunba@example.com",
    role: "lab_member",
    department: "计算机科学",
    joinDate: "2023-03-12",
  },
  {
    id: "user7",
    name: "周九",
    email: "zhoujiu@example.com",
    role: "lab_member",
    department: "机械工程",
    joinDate: "2023-04-18",
  },
  {
    id: "user8",
    name: "吴十",
    email: "wushi@example.com",
    role: "finance_manager",
    department: "电子工程",
    joinDate: "2022-11-30",
  },
]

export default function RolesManagementPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false)
  const [isEditPermissionsDialogOpen, setIsEditPermissionsDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [currentRole, setCurrentRole] = useState<string>("lab_member")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [userList, setUserList] = useState(users)

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      toast({
        title: "需要认证",
        description: "请登录后访问此页面。",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    const userRole = session?.user?.role as Role
    if (!hasPermission(userRole, "roles_manage")) {
      toast({
        title: "权限不足",
        description: "您没有权限管理角色和权限。",
        variant: "destructive",
      })
      router.push("/admin")
    }
  }, [status, session, router, toast])

  if (status !== "authenticated" || !session?.user?.role || !hasPermission(session.user.role as Role, "roles_manage")) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <p className="text-muted-foreground">正在验证权限...</p>
      </div>
    )
  }

  // 过滤角色
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // 过滤用户
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      getRoleName(user.role).toLowerCase().includes(userSearchQuery.toLowerCase()),
  )

  // 获取角色名称
  function getRoleName(roleId: string) {
    const role = roles.find((r) => r.id === roleId)
    return role ? role.name : roleId
  }

  // 获取角色颜色
  function getRoleColor(roleId: string) {
    const role = roles.find((r) => r.id === roleId)
    return role ? role.color : "gray"
  }

  // 处理角色编辑
  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setIsEditRoleDialogOpen(true)
  }

  // 处理权限编辑
  const handleEditPermissions = (role: any) => {
    setSelectedRole(role)
    setIsEditPermissionsDialogOpen(true)
  }

  // 处理保存角色
  const handleSaveRole = () => {
    toast({
      title: "角色已更新",
      description: `角色 "${selectedRole.name}" 已成功更新`,
    })
    setIsEditRoleDialogOpen(false)
  }

  // 处理保存权限
  const handleSavePermissions = () => {
    toast({
      title: "权限已更新",
      description: `角色 "${selectedRole.name}" 的权限已成功更新`,
    })
    setIsEditPermissionsDialogOpen(false)
  }

  // 处理删除角色
  const handleDeleteRole = (role: any) => {
    toast({
      title: "角色已删除",
      description: `角色 "${role.name}" 已成功删除`,
    })
  }

  // 处理用户角色更改
  const handleChangeUserRole = (userId: string, newRoleId: string) => {
    toast({
      title: "用户角色已更新",
      description: `用户角色已更改为 "${getRoleName(newRoleId)}"`,
    })
  }

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">角色与权限管理</h1>
          <p className="text-muted-foreground">管理系统用户角色和权限设置</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin">
              <Shield className="mr-2 h-4 w-4" />
              管理中心
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            角色管理
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            用户角色
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索角色..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              创建角色
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>系统角色</CardTitle>
              <CardDescription>管理系统中的用户角色及其权限</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>角色名称</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>用户数量</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="font-medium flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`bg-${role.color}-50 text-${role.color}-700 hover:bg-${role.color}-50 border-${role.color}-200`}
                          >
                            {role.name}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.users}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditPermissions(role)}>
                            权限
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRole(role)}
                            disabled={role.id === "super_admin" || role.id === "guest"}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索用户..."
              className="pl-8"
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>用户角色分配</CardTitle>
              <CardDescription>管理用户的角色分配</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>用户名</TableHead>
                    <TableHead>邮箱</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>加入日期</TableHead>
                    <TableHead>当前角色</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`bg-${getRoleColor(user.role)}-50 text-${getRoleColor(user.role)}-700 hover:bg-${getRoleColor(user.role)}-50 border-${getRoleColor(user.role)}-200`}
                        >
                          {getRoleName(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              更改角色
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {roles.map((role) => (
                              <DropdownMenuItem
                                key={role.id}
                                onClick={() => handleChangeUserRole(user.id, role.id)}
                                className="flex items-center gap-2"
                              >
                                {role.id === user.role && <Check className="h-4 w-4" />}
                                <span className={role.id === user.role ? "font-medium" : ""}>{role.name}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                显示 {filteredUsers.length} 个用户中的 {filteredUsers.length} 个
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 编辑角色对话框 */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>编辑角色</DialogTitle>
            <DialogDescription>修改角色信息和基本设置</DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="role-name">角色名称</Label>
                <Input
                  id="role-name"
                  defaultValue={selectedRole.name}
                  disabled={selectedRole.id === "super_admin" || selectedRole.id === "guest"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">角色描述</Label>
                <Input id="role-description" defaultValue={selectedRole.description} />
              </div>
              <div className="space-y-2">
                <Label>角色颜色</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "slate",
                    "gray",
                    "zinc",
                    "red",
                    "orange",
                    "amber",
                    "green",
                    "blue",
                    "indigo",
                    "violet",
                    "purple",
                    "pink",
                  ].map((color) => (
                    <div
                      key={color}
                      className={`h-6 w-6 rounded-full cursor-pointer border-2 ${selectedRole.color === color ? "border-primary" : "border-transparent"
                        } bg-${color}-500`}
                      onClick={() => setSelectedRole({ ...selectedRole, color })}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="role-system">系统角色</Label>
                  <Switch
                    id="role-system"
                    defaultChecked={
                      selectedRole.id === "super_admin" || selectedRole.id === "admin" || selectedRole.id === "guest"
                    }
                    disabled={selectedRole.id === "super_admin" || selectedRole.id === "guest"}
                  />
                </div>
                <p className="text-sm text-muted-foreground">系统角色不能被删除，并且具有特定的系统功能</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveRole}>保存更改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑权限对话框 */}
      <Dialog open={isEditPermissionsDialogOpen} onOpenChange={setIsEditPermissionsDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>编辑角色权限</DialogTitle>
            <DialogDescription>{selectedRole && `为角色 "${selectedRole.name}" 配置权限`}</DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6 py-2">
                {permissionModules.map((module) => (
                  <div key={module.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{module.name}</h3>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`module-${module.id}`} className="text-sm">
                          全选
                        </Label>
                        <Switch
                          id={`module-${module.id}`}
                          defaultChecked={
                            selectedRole.permissions.includes("all") || selectedRole.permissions.includes(module.id)
                          }
                          disabled={selectedRole.id === "guest" && module.id !== "public"}
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="grid gap-4 md:grid-cols-2">
                      {module.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={permission.id}
                            defaultChecked={
                              selectedRole.permissions.includes("all") ||
                              selectedRole.permissions.includes(module.id) ||
                              selectedRole.permissions.includes(permission.id)
                            }
                            disabled={selectedRole.id === "guest" && !permission.id.startsWith("public")}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor={permission.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {permission.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPermissionsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSavePermissions}>保存权限</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
