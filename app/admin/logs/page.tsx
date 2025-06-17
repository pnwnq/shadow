"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  Download,
  Filter,
  Info,
  Lock,
  MoreHorizontal,
  Search,
  Shield,
  User,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 日志数据
const logs = [
  {
    id: "log1",
    timestamp: "2023-07-15 08:32:45",
    type: "login",
    level: "info",
    user: "张三",
    userId: "user1",
    action: "用户登录",
    details: "用户成功登录系统",
    ip: "192.168.1.101",
  },
  {
    id: "log2",
    timestamp: "2023-07-15 09:15:22",
    type: "action",
    level: "info",
    user: "李四",
    userId: "user2",
    action: "创建项目",
    details: "创建了新项目 'AI机器人研发'",
    ip: "192.168.1.102",
  },
  {
    id: "log3",
    timestamp: "2023-07-15 10:05:18",
    type: "security",
    level: "warning",
    user: "未知",
    userId: null,
    action: "登录失败",
    details: "用户名或密码错误，IP: 192.168.1.150",
    ip: "192.168.1.150",
  },
  {
    id: "log4",
    timestamp: "2023-07-15 11:22:33",
    type: "action",
    level: "info",
    user: "王五",
    userId: "user3",
    action: "更新文档",
    details: "更新了文档 '项目规划书'",
    ip: "192.168.1.103",
  },
  {
    id: "log5",
    timestamp: "2023-07-15 13:45:12",
    type: "system",
    level: "error",
    user: "系统",
    userId: null,
    action: "数据库错误",
    details: "数据库连接超时，尝试重新连接",
    ip: "127.0.0.1",
  },
  {
    id: "log6",
    timestamp: "2023-07-15 14:30:55",
    type: "action",
    level: "info",
    user: "赵六",
    userId: "user4",
    action: "提交报销",
    details: "提交了报销申请，金额: ¥1,250.00",
    ip: "192.168.1.104",
  },
  {
    id: "log7",
    timestamp: "2023-07-15 15:18:40",
    type: "security",
    level: "critical",
    user: "系统",
    userId: null,
    action: "安全警报",
    details: "检测到可能的暴力破解尝试，IP已被临时封禁",
    ip: "192.168.1.200",
  },
  {
    id: "log8",
    timestamp: "2023-07-15 16:05:27",
    type: "action",
    level: "info",
    user: "钱七",
    userId: "user5",
    action: "审批申请",
    details: "审批通过了设备借用申请",
    ip: "192.168.1.105",
  },
  {
    id: "log9",
    timestamp: "2023-07-15 16:45:33",
    type: "system",
    level: "warning",
    user: "系统",
    userId: null,
    action: "存储警告",
    details: "系统存储空间低于20%，请及时清理",
    ip: "127.0.0.1",
  },
  {
    id: "log10",
    timestamp: "2023-07-15 17:30:15",
    type: "login",
    level: "info",
    user: "孙八",
    userId: "user6",
    action: "用户登出",
    details: "用户成功登出系统",
    ip: "192.168.1.106",
  },
  {
    id: "log11",
    timestamp: "2023-07-15 18:12:50",
    type: "action",
    level: "info",
    user: "周九",
    userId: "user7",
    action: "上传文件",
    details: "上传了文件 '竞赛方案.pdf'",
    ip: "192.168.1.107",
  },
  {
    id: "log12",
    timestamp: "2023-07-15 19:05:22",
    type: "system",
    level: "info",
    user: "系统",
    userId: null,
    action: "系统备份",
    details: "系统数据自动备份完成",
    ip: "127.0.0.1",
  },
]

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const [logLevel, setLogLevel] = useState("all")
  const itemsPerPage = 8

  // 过滤日志
  const filteredLogs = logs.filter((log) => {
    // 搜索过滤
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchQuery.toLowerCase())

    // 类型过滤
    const matchesType = activeTab === "all" || log.type === activeTab

    // 级别过滤
    const matchesLevel = logLevel === "all" || log.level === logLevel

    return matchesSearch && matchesType && matchesLevel
  })

  // 分页
  const indexOfLastLog = currentPage * itemsPerPage
  const indexOfFirstLog = indexOfLastLog - itemsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)

  // 获取日志级别徽章
  const getLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Info className="mr-1 h-3 w-3" />
            信息
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="mr-1 h-3 w-3" />
            警告
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            错误
          </Badge>
        )
      case "critical":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 font-bold">
            <XCircle className="mr-1 h-3 w-3" />
            严重
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            未知
          </Badge>
        )
    }
  }

  // 获取日志类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "login":
        return <User className="h-4 w-4 text-blue-500" />
      case "action":
        return <Info className="h-4 w-4 text-green-500" />
      case "security":
        return <Lock className="h-4 w-4 text-red-500" />
      case "system":
        return <Shield className="h-4 w-4 text-purple-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">系统日志</h1>
          <p className="text-muted-foreground">查看和分析系统操作日志</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin">
              <Shield className="mr-2 h-4 w-4" />
              管理中心
            </Link>
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            选择日期
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            导出日志
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>日志记录</CardTitle>
          <CardDescription>系统操作和事件的详细日志记录</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="action">操作</TabsTrigger>
                <TabsTrigger value="security">安全</TabsTrigger>
                <TabsTrigger value="system">系统</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="搜索日志..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={logLevel} onValueChange={setLogLevel}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="日志级别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部级别</SelectItem>
                    <SelectItem value="info">信息</SelectItem>
                    <SelectItem value="warning">警告</SelectItem>
                    <SelectItem value="error">错误</SelectItem>
                    <SelectItem value="critical">严重</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  高级筛选
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center gap-1">
                          时间
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]">类型</TableHead>
                      <TableHead className="w-[100px]">级别</TableHead>
                      <TableHead className="w-[120px]">用户</TableHead>
                      <TableHead>操作</TableHead>
                      <TableHead className="w-[120px]">IP地址</TableHead>
                      <TableHead className="w-[80px] text-right">详情</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(log.type)}
                            <span className="capitalize">{log.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getLevelBadge(log.level)}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{log.action}</TableCell>
                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">详情</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[300px]">
                              <div className="p-4 space-y-2">
                                <h4 className="font-medium">日志详情</h4>
                                <div className="text-sm space-y-1">
                                  <p>
                                    <span className="font-medium">ID:</span> {log.id}
                                  </p>
                                  <p>
                                    <span className="font-medium">时间:</span> {log.timestamp}
                                  </p>
                                  <p>
                                    <span className="font-medium">用户:</span> {log.user}{" "}
                                    {log.userId ? `(${log.userId})` : ""}
                                  </p>
                                  <p>
                                    <span className="font-medium">操作:</span> {log.action}
                                  </p>
                                  <p>
                                    <span className="font-medium">详细信息:</span> {log.details}
                                  </p>
                                  <p>
                                    <span className="font-medium">IP地址:</span> {log.ip}
                                  </p>
                                </div>
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="login" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center gap-1">
                          时间
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]">级别</TableHead>
                      <TableHead className="w-[120px]">用户</TableHead>
                      <TableHead>操作</TableHead>
                      <TableHead className="w-[120px]">IP地址</TableHead>
                      <TableHead className="w-[80px] text-right">详情</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                        <TableCell>{getLevelBadge(log.level)}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{log.action}</TableCell>
                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="action" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center gap-1">
                          时间
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]">级别</TableHead>
                      <TableHead className="w-[120px]">用户</TableHead>
                      <TableHead>操作</TableHead>
                      <TableHead className="w-[120px]">IP地址</TableHead>
                      <TableHead className="w-[80px] text-right">详情</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                        <TableCell>{getLevelBadge(log.level)}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{log.action}</TableCell>
                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center gap-1">
                          时间
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]">级别</TableHead>
                      <TableHead className="w-[120px]">用户</TableHead>
                      <TableHead>操作</TableHead>
                      <TableHead className="w-[120px]">IP地址</TableHead>
                      <TableHead className="w-[80px] text-right">详情</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                        <TableCell>{getLevelBadge(log.level)}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{log.action}</TableCell>
                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center gap-1">
                          时间
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]">级别</TableHead>
                      <TableHead className="w-[120px]">用户</TableHead>
                      <TableHead>操作</TableHead>
                      <TableHead className="w-[120px]">IP地址</TableHead>
                      <TableHead className="w-[80px] text-right">详情</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                        <TableCell>{getLevelBadge(log.level)}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{log.action}</TableCell>
                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            显示 {indexOfFirstLog + 1}-{Math.min(indexOfLastLog, filteredLogs.length)} 条日志，共 {filteredLogs.length}{" "}
            条
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
