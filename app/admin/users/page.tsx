"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Check, Download, Edit, Filter, MoreHorizontal, Plus, Search, Shield, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { RoleBadge } from "@/components/role-badge"

// 用户数据
const users = [
  {
    id: "user1",
    name: "张三",
    email: "zhangsan@example.com",
    role: "admin",
    department: "电子工程",
    joinDate: "2022-09-01",
    status: "active",
  },
  {
    id: "user2",
    name: "李四",
    email: "lisi@example.com",
    role: "admin",
    department: "计算机科学",
    joinDate: "2022-10-15",
    status: "active",
  },
  {
    id: "user3",
    name: "王五",
    email: "wangwu@example.com",
    role: "lab_member",
    department: "机械工程",
    joinDate: "2023-02-20",
    status: "active",
  },
  {
    id: "user4",
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "finance_manager",
    department: "管理学院",
    joinDate: "2022-08-10",
    status: "active",
  },
  {
    id: "user5",
    name: "钱七",
    email: "qianqi@example.com",
    role: "admin",
    department: "电子工程",
    joinDate: "2023-01-05",
    status: "active",
  },
  {
    id: "user6",
    name: "孙八",
    email: "sunba@example.com",
    role: "lab_member",
    department: "计算机科学",
    joinDate: "2023-03-12",
    status: "active",
  },
  {
    id: "user7",
    name: "周九",
    email: "zhoujiu@example.com",
    role: "lab_member",
    department: "机械工程",
    joinDate: "2023-04-18",
    status: "inactive",
  },
  {
    id: "user8",
    name: "吴十",
    email: "wushi@example.com",
    role: "finance_manager",
    department: "电子工程",
    joinDate: "2022-11-30",
    status: "active",
  },
  {
    id: "user9",
    name: "郑十一",
    email: "zhengshiyi@example.com",
    role: "lab_member",
    department: "计算机科学",
    joinDate: "2023-05-22",
    status: "active",
  },
  {
    id: "user10",
    name: "王十二",
    email: "wangshier@example.com",
    role: "lab_member",
    department: "电子工程",
    joinDate: "2023-06-15",
    status: "pending",
  },
]

export default function UsersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // 过滤用户
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // 分页
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // 处理用户删除
  const handleDeleteUser = (userId: string) => {
    toast({
      title: "用户已删除",
      description: `用户ID: ${userId} 已成功删除`,
    })
  }

  // 处理用户状态更改
  const handleChangeUserStatus = (userId: string, newStatus: string) => {
    toast({
      title: "用户状态已更新",
      description: `用户状态已更改为 "${newStatus}"`,
    })
  }

  return (
    <div className="space-y-8 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
          <p className="text-muted-foreground text-lg">管理系统用户账号和信息</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" asChild className="h-10">
            <Link href="/admin">
              <Shield className="mr-2 h-5 w-5" />
              管理中心
            </Link>
          </Button>
          <Button size="lg" className="h-10">
            <Plus className="mr-2 h-5 w-5" />
            添加用户
          </Button>
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">用户列表</CardTitle>
          <CardDescription>管理系统中的所有用户账号</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索用户..."
                className="pl-9 bg-muted/50 border-muted focus-visible:bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="h-9 px-3 gap-1.5 hover:bg-muted">
                <Filter className="h-4 w-4" />
                筛选
              </Button>
              <Button variant="outline" size="sm" className="h-9 px-3 gap-1.5 hover:bg-muted">
                <Download className="h-4 w-4" />
                导出
              </Button>
            </div>
          </div>

          <div className="mt-6 rounded-lg border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[200px]">
                    <div className="flex items-center gap-1 font-medium">
                      用户名
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead>部门</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>加入日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <RoleBadge role={user.role} />
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      {user.status === "active" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-2.5 py-0.5">
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                            活跃
                          </span>
                        </Badge>
                      )}
                      {user.status === "inactive" && (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 px-2.5 py-0.5">
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                            未活跃
                          </span>
                        </Badge>
                      )}
                      {user.status === "pending" && (
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200 px-2.5 py-0.5"
                        >
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                            待审核
                          </span>
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">操作</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            编辑用户
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            更改角色
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleChangeUserStatus(user.id, user.status === "active" ? "inactive" : "active")
                            }
                          >
                            <Check className="mr-2 h-4 w-4" />
                            {user.status === "active" ? "禁用账号" : "激活账号"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            删除用户
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t py-4">
          <div className="text-sm text-muted-foreground">
            显示 {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} 个用户，共{" "}
            {filteredUsers.length} 个
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  )
}
