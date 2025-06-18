"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, FileText, Filter, Grid3X3, List, Plus, SlidersHorizontal } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

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
import { useToast } from "@/components/ui/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SiteHeader } from "@/components/site-header"

// 模拟文档数据
const allDocuments = [
  {
    id: "1",
    title: "单片机入门指南.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2024-04-15",
    category: "tech",
  },
  {
    id: "2",
    title: "PCB设计规范.docx",
    type: "word",
    size: "1.8 MB",
    uploadDate: "2024-04-10",
    category: "tech",
  },
  {
    id: "3",
    title: "传感器使用手册.pdf",
    type: "pdf",
    size: "3.2 MB",
    uploadDate: "2024-04-05",
    category: "tech",
  },
  {
    id: "4",
    title: "Arduino示例代码.zip",
    type: "zip",
    size: "1.5 MB",
    uploadDate: "2024-04-02",
    category: "study",
  },
  {
    id: "5",
    title: "实验报告模板.docx",
    type: "word",
    size: "0.9 MB",
    uploadDate: "2024-03-28",
    category: "study",
  },
  {
    id: "6",
    title: "智能家居项目方案.pdf",
    type: "pdf",
    size: "4.1 MB",
    uploadDate: "2024-03-25",
    category: "project",
  },
  {
    id: "7",
    title: "树莓派操作手册.pdf",
    type: "pdf",
    size: "5.2 MB",
    uploadDate: "2024-03-20",
    category: "manual",
  },
  {
    id: "8",
    title: "实验室设备清单.xlsx",
    type: "excel",
    size: "0.7 MB",
    uploadDate: "2024-03-15",
    category: "other",
  },
]

// 类型映射
const typeMap: Record<string, string> = {
  pdf: "PDF文档",
  word: "Word文档",
  excel: "Excel表格",
  ppt: "PowerPoint演示文稿",
  image: "图片",
  zip: "压缩文件",
  other: "其他",
}

export default function DocumentTypePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [searchTerm, setSearchTerm] = useState("")

  const type = params.type as string
  const typeTitle = typeMap[type] || "未知类型"

  // 根据类型筛选文档
  const documents = allDocuments.filter((doc) => doc.type === type)

  const handleUpload = () => {
    router.push("/documents/upload")
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
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
              <BreadcrumbLink href={`/documents/types/${type}`}>{typeTitle}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{typeTitle}</h1>
          <div className="flex items-center gap-2">
            <Button className="gap-1" onClick={handleUpload}>
              <Plus className="h-4 w-4" />
              上传文档
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="md:w-1/4 lg:w-1/5 space-y-4">
            <div className="rounded-lg border p-4">
              <h2 className="mb-2 font-semibold">文档分类</h2>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start font-normal" asChild>
                  <Link href="/documents">所有文档</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal" asChild>
                  <Link href="/documents/categories/tech">技术文档</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal" asChild>
                  <Link href="/documents/categories/study">学习资料</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal" asChild>
                  <Link href="/documents/categories/project">项目文档</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal" asChild>
                  <Link href="/documents/categories/manual">设备手册</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal" asChild>
                  <Link href="/documents/categories/other">其他</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h2 className="mb-2 font-semibold">文档格式</h2>
              <div className="space-y-2">
                <Button
                  variant={type === "pdf" ? "default" : "ghost"}
                  className="w-full justify-start font-normal"
                  asChild
                >
                  <Link href="/documents/types/pdf">PDF</Link>
                </Button>
                <Button
                  variant={type === "word" ? "default" : "ghost"}
                  className="w-full justify-start font-normal"
                  asChild
                >
                  <Link href="/documents/types/word">Word</Link>
                </Button>
                <Button
                  variant={type === "excel" ? "default" : "ghost"}
                  className="w-full justify-start font-normal"
                  asChild
                >
                  <Link href="/documents/types/excel">Excel</Link>
                </Button>
                <Button
                  variant={type === "image" ? "default" : "ghost"}
                  className="w-full justify-start font-normal"
                  asChild
                >
                  <Link href="/documents/types/image">图片</Link>
                </Button>
                <Button
                  variant={type === "zip" ? "default" : "ghost"}
                  className="w-full justify-start font-normal"
                  asChild
                >
                  <Link href="/documents/types/zip">压缩包</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h2 className="mb-2 font-semibold">标签</h2>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <Link href="/documents/tags/arduino">单片机</Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <Link href="/documents/tags/pcb">PCB设计</Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <Link href="/documents/tags/sensor">传感器</Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <Link href="/documents/tags/arduino">Arduino</Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <Link href="/documents/tags/raspberry-pi">树莓派</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="md:w-3/4 lg:w-4/5 space-y-4">
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
                    <DropdownMenuLabel>上传时间</DropdownMenuLabel>
                    <DropdownMenuItem>今天</DropdownMenuItem>
                    <DropdownMenuItem>本周</DropdownMenuItem>
                    <DropdownMenuItem>本月</DropdownMenuItem>
                    <DropdownMenuItem>今年</DropdownMenuItem>
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
                    <DropdownMenuItem>名称 (A-Z)</DropdownMenuItem>
                    <DropdownMenuItem>名称 (Z-A)</DropdownMenuItem>
                    <DropdownMenuItem>上传时间 (最新)</DropdownMenuItem>
                    <DropdownMenuItem>上传时间 (最早)</DropdownMenuItem>
                    <DropdownMenuItem>大小 (大到小)</DropdownMenuItem>
                    <DropdownMenuItem>大小 (小到大)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative ml-4 hidden md:flex">
                  <Input
                    type="search"
                    placeholder={`搜索${typeTitle}...`}
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

            {documents.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{doc.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>
                            {doc.type.toUpperCase()} · {doc.size}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <span className="text-xs text-muted-foreground">上传于 {doc.uploadDate}</span>
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
                            <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
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
                    <div className="col-span-2">上传日期</div>
                    <div className="col-span-1">操作</div>
                  </div>
                  {documents.map((doc) => (
                    <div key={doc.id} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/50">
                      <div className="col-span-5 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <Link href={`/documents/${doc.id}`} className="hover:text-primary">
                          {doc.title}
                        </Link>
                      </div>
                      <div className="col-span-2 text-muted-foreground">{doc.type.toUpperCase()}</div>
                      <div className="col-span-2 text-muted-foreground">{doc.size}</div>
                      <div className="col-span-2 text-muted-foreground">{doc.uploadDate}</div>
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
                            <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="flex h-60 flex-col items-center justify-center rounded-lg border p-8 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">没有找到文档</h3>
                <p className="text-muted-foreground mb-6">该类型下暂无文档，您可以上传新文档</p>
                <Button onClick={handleUpload}>
                  <Plus className="mr-2 h-4 w-4" />
                  上传新文档
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
