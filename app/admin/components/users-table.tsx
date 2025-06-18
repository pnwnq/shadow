"use client"

import { useState, useEffect, useCallback } from "react"
import {
      ArrowUpDown,
      Check,
      Edit,
      Filter,
      MoreHorizontal,
      Plus,
      Search,
      Shield,
      Trash,
      UserCheck,
      Download,
} from "lucide-react"

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
import { useDebounce } from "use-debounce"

export function UsersTable() {
      const { toast } = useToast()
      const [users, setUsers] = useState<any[]>([])
      const [isLoading, setIsLoading] = useState(true)
      const [searchQuery, setSearchQuery] = useState("")
      const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
      const [currentPage, setCurrentPage] = useState(1)
      const [totalPages, setTotalPages] = useState(1)
      const [totalUsers, setTotalUsers] = useState(0)

      const itemsPerPage = 8

      const fetchUsers = useCallback(async () => {
            setIsLoading(true)
            try {
                  const params = new URLSearchParams({
                        page: currentPage.toString(),
                        limit: itemsPerPage.toString(),
                        search: debouncedSearchQuery,
                  })
                  const response = await fetch(`/api/admin/users?${params.toString()}`)

                  if (!response.ok) {
                        throw new Error("Failed to fetch users")
                  }

                  const data = await response.json()
                  setUsers(data.data)
                  setTotalPages(data.pagination.totalPages)
                  setTotalUsers(data.pagination.total)
            } catch (error) {
                  toast({
                        title: "Error",
                        description: "Could not fetch users. Please try again.",
                        variant: "destructive",
                  })
            } finally {
                  setIsLoading(false)
            }
      }, [currentPage, debouncedSearchQuery, toast])

      useEffect(() => {
            fetchUsers()
      }, [fetchUsers])

      const handleUserAction = async (userId: string, action: "approve" | "delete" | "deactivate") => {
            let apiPath = `/api/admin/users/${userId}`
            let method = "PATCH"
            let body: any = {}
            let successMessage = ""

            if (action === "approve") {
                  body.status = "ACTIVE"
                  successMessage = "用户已激活。"
            } else if (action === "deactivate") {
                  body.status = "PENDING"
                  successMessage = "用户已被禁用，状态变为待审核。"
            } else if (action === "delete") {
                  method = "DELETE"
                  successMessage = "用户已删除。"
            }

            try {
                  const response = await fetch(apiPath, {
                        method,
                        headers: { "Content-Type": "application/json" },
                        ...(method !== "DELETE" && { body: JSON.stringify(body) }),
                  })

                  if (!response.ok) {
                        const errorData = await response.json()
                        throw new Error(errorData.error || "An error occurred")
                  }

                  toast({
                        title: "Success",
                        description: successMessage,
                  })

                  fetchUsers() // Refresh the user list
            } catch (error) {
                  const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
                  toast({
                        title: "Action Failed",
                        description: errorMessage,
                        variant: "destructive",
                  })
            }
      }

      return (
            <Card className="border-0 shadow-none">
                  <CardHeader className="px-0">
                        <CardTitle className="text-2xl">用户列表</CardTitle>
                        <CardDescription>查看、管理和审核系统中的所有用户。</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="relative w-full max-w-sm">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                          type="search"
                                          placeholder="通过姓名或邮箱搜索..."
                                          className="pl-9"
                                          value={searchQuery}
                                          onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                              </div>
                              <div className="flex gap-3">
                                    <Button variant="outline" size="sm">
                                          <Filter className="mr-2 h-4 w-4" />
                                          筛选
                                    </Button>
                                    <Button variant="outline" size="sm">
                                          <Download className="mr-2 h-4 w-4" />
                                          导出
                                    </Button>
                                    <Button size="sm">
                                          <Plus className="mr-2 h-4 w-4" />
                                          添加用户
                                    </Button>
                              </div>
                        </div>

                        <div className="mt-6 rounded-lg border overflow-hidden">
                              <Table>
                                    <TableHeader>
                                          <TableRow>
                                                <TableHead>用户名</TableHead>
                                                <TableHead>邮箱</TableHead>
                                                <TableHead>角色</TableHead>
                                                <TableHead>加入日期</TableHead>
                                                <TableHead>状态</TableHead>
                                                <TableHead className="text-right">操作</TableHead>
                                          </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                          {isLoading ? (
                                                <TableRow>
                                                      <TableCell colSpan={6} className="text-center h-24">
                                                            正在加载...
                                                      </TableCell>
                                                </TableRow>
                                          ) : users.length === 0 ? (
                                                <TableRow>
                                                      <TableCell colSpan={6} className="text-center h-24">
                                                            未找到用户。
                                                      </TableCell>
                                                </TableRow>
                                          ) : (
                                                users.map((user) => (
                                                      <TableRow key={user.id}>
                                                            <TableCell className="font-medium">{user.name}</TableCell>
                                                            <TableCell>{user.email}</TableCell>
                                                            <TableCell>
                                                                  <RoleBadge role={user.role.toLowerCase() as any} />
                                                            </TableCell>
                                                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                                            <TableCell>
                                                                  {user.status === "ACTIVE" && <Badge variant="outline" className="text-green-600 border-green-600">活跃</Badge>}
                                                                  {user.status === "PENDING" && <Badge variant="outline" className="text-yellow-600 border-yellow-600">待审核</Badge>}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                  <DropdownMenu>
                                                                        <DropdownMenuTrigger asChild>
                                                                              <Button variant="ghost" size="icon">
                                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                                    <span className="sr-only">操作</span>
                                                                              </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end">
                                                                              {user.status === "PENDING" && (
                                                                                    <DropdownMenuItem onClick={() => handleUserAction(user.id, "approve")}>
                                                                                          <UserCheck className="mr-2 h-4 w-4" />
                                                                                          审核通过
                                                                                    </DropdownMenuItem>
                                                                              )}
                                                                              <DropdownMenuItem>
                                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                                    编辑用户
                                                                              </DropdownMenuItem>
                                                                              <DropdownMenuItem>
                                                                                    <Shield className="mr-2 h-4 w-4" />
                                                                                    更改角色
                                                                              </DropdownMenuItem>
                                                                              <DropdownMenuSeparator />
                                                                              {user.status === "ACTIVE" && (
                                                                                    <DropdownMenuItem onClick={() => handleUserAction(user.id, "deactivate")}>
                                                                                          <Check className="mr-2 h-4 w-4" />
                                                                                          禁用账号
                                                                                    </DropdownMenuItem>
                                                                              )}
                                                                              <DropdownMenuItem
                                                                                    onClick={() => handleUserAction(user.id, "delete")}
                                                                                    className="text-destructive"
                                                                              >
                                                                                    <Trash className="mr-2 h-4 w-4" />
                                                                                    删除用户
                                                                              </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                  </DropdownMenu>
                                                            </TableCell>
                                                      </TableRow>
                                                ))
                                          )}
                                    </TableBody>
                              </Table>
                        </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t py-4 mt-6 px-0">
                        <div className="text-sm text-muted-foreground">
                              共 {totalUsers} 个用户
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
      )
} 