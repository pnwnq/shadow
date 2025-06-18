"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  ChevronLeft,
  FileText,
  Filter,
  Grid3X3,
  List,
  Share2,
  SlidersHorizontal,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SharedDocumentsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"shared-with-me" | "shared-by-me">("shared-with-me")

  const sharedWithMeDocuments = [
    {
      id: "1",
      title: "实验室设备使用规范.pdf",
      type: "PDF",
      size: "1.8 MB",
      sharedDate: "2024-04-14",
      sharedBy: {
        name: "张教授",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "zhang@example.com"
      },
      permission: "view"
    },
    {
      id: "2",
      title: "机器人项目进度报告.docx",
      type: "Word",
      size: "2.3 MB",
      sharedDate: "2024-04-12",
      sharedBy: {
        name: "李研究员",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "li@example.com"
      },
      permission: "edit"
    },
    {
      id: "3",
      title: "实验数据分析.xlsx",
      type: "Excel",
      size: "3.5 MB",
      sharedDate: "2024-04-10",
      sharedBy: {
        name: "王工程师",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "wang@example.com"
      },
      permission: "view"
    },
    {
      id: "4",
      title: "团队会议纪要.docx",
      type: "Word",
      size: "0.9 MB",
      sharedDate: "2024-04-08",
      sharedBy: {
        name: "赵组长",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "zhao@example.com"
      },
      permission: "comment"
    }
  ]

  const sharedByMeDocuments = [
    {
      id: "5",
      title: "传感器校准方法.pdf",
      type: "PDF",
      size: "2.1 MB",
      sharedDate: "2024-04-15",
      sharedWith: [
        { name: "研发团队", type: "group", count: 8 },
        { name: "张教授", type: "user" }
      ]
    },
    {
      id: "6",
      title: "机器人控制算法.docx",
      type: "Word",
      size: "1.7 MB",
      sharedDate: "2024-04-13",
      sharedWith: [
        { name: "李研究员", type: "user" },
        { name: "王工程师", type: "user" }
      ]
    },
    {
      id: "7",
      title: "项目预算表.xlsx",
      type: "Excel",
      size: "1.2 MB",
      sharedDate: "2024-04-11",
      sharedWith: [
        { name: "财务部", type: "group", count: 4 },
        { name: "项目管理组", type: "group", count: 3 }
      ]
    }
  ]

  const activeDocuments = activeTab === "shared-with-me" ? sharedWithMeDocuments : sharedByMeDocuments

  const filteredDocuments = activeDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4 p-4 md:p-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/documents">文档管理</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/documents/shared">共享文档</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/documents" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              返回文档列表
            </Link>
          </Button>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">共享文档</h1>
      </div>

      <div className="flex border-b">
        <Button
          variant={activeTab === "shared-with-me" ? "default" : "ghost"}
          className={`rounded-none border-b-2 ${
            activeTab === "shared-with-me" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => setActiveTab("shared-with-me")}
        >
          与我共享
        </Button>
        <Button
          variant={activeTab === "shared-by-me" ? "default" : "ghost"}
          className={`rounded-none border-b-2 ${
            activeTab === "shared-by-me" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => setActiveTab("shared-by-me")}
        >
          我的共享
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                筛选
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>文件类型</DropdownMenuLabel>
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>Word</DropdownMenuItem>
              <DropdownMenuItem>Excel</DropdownMenuItem>
              <DropdownMenuItem>图片</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>共享时间</DropdownMenuLabel>
              <DropdownMenuItem>今天</DropdownMenuItem>
              <DropdownMenuItem>本周</DropdownMenuItem>
              <DropdownMenuItem>本月</DropdownMenuItem>
              <DropdownMenuItem>今年</DropdownMenuItem>
              {activeTab === "shared-with-me" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>权限</DropdownMenuLabel>
                  <DropdownMenuItem>只读</DropdownMenuItem>
                  <DropdownMenuItem>可编辑</DropdownMenuItem>
                  <DropdownMenuItem>可评论</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                排序
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>共享时间 (最新)</DropdownMenuItem>
              <DropdownMenuItem>共享时间 (最早)</DropdownMenuItem>
              <DropdownMenuItem>名称 (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>名称 (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>大小 (大到小)</DropdownMenuItem>
              <DropdownMenuItem>大小 (小到大)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative ml-4 hidden md:flex">
            <Input
              type="search"
              placeholder="搜索共享文档..."
              className="w-64 rounded-lg pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">列表视图</span>
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="sr-only">网格视图</span>
          </Button>
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h3 className="text-lg font-medium mb-2">没有找到匹配的文档</h3>
          <p className="text-muted-foreground mb-6">尝试使用不同的搜索关键词</p>
          <Button variant="outline" onClick={() => setSearchTerm("")}>清除搜索</Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <FileText className="h-4 w-4" />
                  <span>
                    {doc.type} · {doc.size}
                  </span>
                </div>
                
                {activeTab === "shared-with-me" && "sharedBy" in doc && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">共享者：</span>
                    <div className="flex items-center gap-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={doc.sharedBy.avatar || "/placeholder.svg"} alt={doc.sharedBy.name} />
                        <AvatarFallback>{doc.sharedBy.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{doc.sharedBy.name}</span>
                    </div>
                    <Badge variant={doc.permission === "edit" ? "default" : "outline"} className="ml-auto">
                      {doc.permission === "view" ? "只读" : doc.permission === "edit" ? "可编辑" : "可评论"}
                    </Badge>
                  </div>
                )}
                
                {activeTab === "shared-by-me" && "sharedWith" in doc && (
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="text-muted-foreground">共享给：</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {doc.sharedWith.map((recipient, idx) => (
                        <Badge key={idx} variant="outline" className="flex items-center gap-1">
                          {recipient.type === "group" ? (
                            <Users className="h-3 w-3" />
                          ) : (
                            <Avatar className="h-4 w-4">
                              <AvatarFallback className="text-[10px]">{recipient.name[0]}</AvatarFallback>
                            </Avatar>
                          )}
                          {recipient.name}
                          {recipient.type === "group" && recipient.count && (
                            <span className="text-xs">({recipient.count})</span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <span className="text-xs text-muted-foreground">共享于 {doc.sharedDate}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">操作</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/documents/${doc.id}`}>查看</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>下载</DropdownMenuItem>
                    {activeTab === "shared-with-me" ? (
                      <>
                        {"permission" in doc && doc.permission === "edit" && (
                          <DropdownMenuItem>编辑</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">取消共享</DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          管理共享
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">停止共享</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-2 p-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <FileText className="h-4 w-4" />
                      <span>
                        {doc.type} · {doc.size}
                      </span>
                    </div>
                    
                    {activeTab === "shared-with-me" && "sharedBy" in doc && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">共享者：</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={doc.sharedBy.avatar || "/placeholder.svg"} alt={doc.sharedBy.name} />
                            <AvatarFallback>{doc.sharedBy.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{doc.sharedBy.name}</span>
                        </div>
                        <Badge variant={doc.permission === "edit" ? "default" : "outline"} className="ml-auto">
                          {doc.permission === "view" ? "只读" : doc.permission === "edit" ? "可编辑" : "可评论"}
                        </Badge>
                      </div>
                    )}
                    
                    {activeTab === "shared-by-me" && "sharedWith" in doc && (
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-muted-foreground">共享给：</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doc.sharedWith.map((recipient, idx) => (
                            <Badge key={idx} variant="outline" className="flex items-center gap-1">
                              {recipient.type === "group" ? (
                                <Users className="h-3 w-3" />
                              ) : (
                                <Avatar className="h-4 w-4">
                                  <AvatarFallback className="text-[10px]">{recipient.name[0]}</AvatarFallback>
                                </Avatar>
                              )}
                              {recipient.name}
                              {recipient.type === "group" && recipient.count && (
                                <span className="text-xs">({recipient.count})</span>
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <span className="text-xs text-muted-foreground">共享于 {doc.sharedDate}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">操作</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/documents/${doc.id}`}>查看</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>下载</DropdownMenuItem>
                        {activeTab === "shared-with-me" ? (
                          <>
                            {"permission" in doc && doc.permission === "edit" && (
                              <DropdownMenuItem>编辑</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">取消共享</DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              管理共享
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">停止共享</DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
