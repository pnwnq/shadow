"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronLeft, FileText, Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react"

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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function RecentDocumentsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [searchTerm, setSearchTerm] = useState("")

  const recentDocuments = [
    {
      id: "1",
      title: "机器人控制系统设计.pdf",
      type: "PDF",
      size: "2.4 MB",
      accessDate: "2024-04-15 14:32",
      category: "tech",
    },
    {
      id: "2",
      title: "四足机器人运动学分析.docx",
      type: "Word",
      size: "1.8 MB",
      accessDate: "2024-04-15 11:20",
      category: "tech",
    },
    {
      id: "3",
      title: "视觉传感器应用手册.pdf",
      type: "PDF",
      size: "3.2 MB",
      accessDate: "2024-04-14 16:45",
      category: "tech",
    },
    {
      id: "4",
      title: "ROS机器人开发示例代码.zip",
      type: "ZIP",
      size: "1.5 MB",
      accessDate: "2024-04-14 09:12",
      category: "study",
    },
    {
      id: "5",
      title: "机器人竞赛报告模板.docx",
      type: "Word",
      size: "0.9 MB",
      accessDate: "2024-04-13 17:30",
      category: "study",
    },
    {
      id: "6",
      title: "无人机导航系统方案.pdf",
      type: "PDF",
      size: "4.1 MB",
      accessDate: "2024-04-13 10:05",
      category: "project",
    },
    {
      id: "7",
      title: "传感器数据分析报告.xlsx",
      type: "Excel",
      size: "1.2 MB",
      accessDate: "2024-04-12 14:22",
      category: "project",
    },
    {
      id: "8",
      title: "实验室安全手册.pdf",
      type: "PDF",
      size: "5.3 MB",
      accessDate: "2024-04-12 11:40",
      category: "manual",
    },
  ]

  const filteredDocuments = recentDocuments.filter((doc) => doc.title.toLowerCase().includes(searchTerm.toLowerCase()))

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
            <BreadcrumbLink href="/documents/recent">最近访问</BreadcrumbLink>
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
        <h1 className="text-2xl font-bold tracking-tight">最近访问的文档</h1>
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
              <DropdownMenuLabel>访问时间</DropdownMenuLabel>
              <DropdownMenuItem>今天</DropdownMenuItem>
              <DropdownMenuItem>昨天</DropdownMenuItem>
              <DropdownMenuItem>本周</DropdownMenuItem>
              <DropdownMenuItem>本月</DropdownMenuItem>
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
              <DropdownMenuItem>访问时间 (最新)</DropdownMenuItem>
              <DropdownMenuItem>访问时间 (最早)</DropdownMenuItem>
              <DropdownMenuItem>名称 (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>名称 (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>大小 (大到小)</DropdownMenuItem>
              <DropdownMenuItem>大小 (小到大)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative ml-4 hidden md:flex">
            <Input
              type="search"
              placeholder="搜索最近文档..."
              className="w-64 rounded-lg pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
            <span className="sr-only">列表视图</span>
          </Button>
          <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
            <span className="sr-only">网格视图</span>
          </Button>
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h3 className="text-lg font-medium mb-2">没有找到匹配的文档</h3>
          <p className="text-muted-foreground mb-6">尝试使用不同的搜索关键词</p>
          <Button variant="outline" onClick={() => setSearchTerm("")}>
            清除搜索
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>
                    {doc.type} · {doc.size}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <span className="text-xs text-muted-foreground">访问于 {doc.accessDate}</span>
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
                    <DropdownMenuItem>重命名</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">从最近列表中移除</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
            <div className="col-span-5">文件名</div>
            <div className="col-span-2">类型</div>
            <div className="col-span-2">大小</div>
            <div className="col-span-2">访问时间</div>
            <div className="col-span-1">操作</div>
          </div>
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/50">
              <div className="col-span-5 flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <Link href={`/documents/${doc.id}`} className="hover:text-primary">
                  {doc.title}
                </Link>
              </div>
              <div className="col-span-2 text-muted-foreground">{doc.type}</div>
              <div className="col-span-2 text-muted-foreground">{doc.size}</div>
              <div className="col-span-2 text-muted-foreground">{doc.accessDate}</div>
              <div className="col-span-1">
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
                    <DropdownMenuItem>重命名</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">从最近列表中移除</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
