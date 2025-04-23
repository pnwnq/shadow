"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, FileText, Filter, Grid3X3, List, Plus, SlidersHorizontal } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SiteHeader } from "@/components/site-header"

export default function DocumentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [searchTerm, setSearchTerm] = useState("")

  const documents = [
    {
      id: "1",
      title: "单片机入门指南.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-04-15",
      category: "tech",
    },
    {
      id: "2",
      title: "PCB设计规范.docx",
      type: "Word",
      size: "1.8 MB",
      uploadDate: "2024-04-10",
      category: "tech",
    },
    {
      id: "3",
      title: "传感器使用手册.pdf",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: "2024-04-05",
      category: "tech",
    },
    {
      id: "4",
      title: "Arduino示例代码.zip",
      type: "ZIP",
      size: "1.5 MB",
      uploadDate: "2024-04-02",
      category: "study",
    },
    {
      id: "5",
      title: "实验报告模板.docx",
      type: "Word",
      size: "0.9 MB",
      uploadDate: "2024-03-28",
      category: "study",
    },
    {
      id: "6",
      title: "智能家居项目方案.pdf",
      type: "PDF",
      size: "4.1 MB",
      uploadDate: "2024-03-25",
      category: "project",
    },
  ]

  const handleUpload = () => {
    toast({
      title: "上传文件",
      description: "文件上传功能即将上线",
    })
  }

  const navigateToCategory = (category: string) => {
    router.push(`/documents/categories/${category}`)
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <SiteHeader />
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/documents">文档管理</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">文档管理</h1>
        <div className="flex items-center gap-2">
          <Button className="gap-1" onClick={handleUpload}>
            <Plus className="size-4" />
            上传文档
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="space-y-4 md:w-1/4 lg:w-1/5">
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
            <h2 className="mb-2 font-semibold">最近使用的文件</h2>
            <div className="space-y-2">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="border-b pb-2 text-sm">
                  <Link href={`/documents/${doc.id}`} className="hover:text-primary">
                    {doc.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                </div>
              ))}
            </div>
            <Button variant="link" size="sm" className="mt-2 p-0" asChild>
              <Link href="/documents/recent">查看全部</Link>
            </Button>
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
        <div className="space-y-4 md:w-3/4 lg:w-4/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="size-4" />
                    筛选
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>文件类型</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/documents/types/pdf">PDF</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/documents/types/word">Word</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/documents/types/excel">Excel</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/documents/types/image">图片</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>上传时间</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/documents/date/today">今天</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/documents/date/week">本周</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/documents/date/month">本月</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/documents/date/year">今年</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <SlidersHorizontal className="size-4" />
                    排序
                    <ChevronDown className="size-4" />
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
                  placeholder="搜索文档..."
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
                <List className="size-4" />
                <span className="sr-only">列表视图</span>
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="size-4" />
                <span className="sr-only">网格视图</span>
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="recent">最近</TabsTrigger>
              <TabsTrigger value="favorites">收藏</TabsTrigger>
              <TabsTrigger value="shared">共享</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4 space-y-4">
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{doc.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="size-4" />
                          <span>
                            {doc.type} · {doc.size}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <span className="text-xs text-muted-foreground">上传于 {doc.uploadDate}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="size-4" />
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
                  <div className="grid grid-cols-12 gap-2 border-b p-4 font-medium">
                    <div className="col-span-5">文件名</div>
                    <div className="col-span-2">类型</div>
                    <div className="col-span-2">大小</div>
                    <div className="col-span-2">上传日期</div>
                    <div className="col-span-1">操作</div>
                  </div>
                  {documents.map((doc) => (
                    <div key={doc.id} className="grid grid-cols-12 gap-2 border-b p-4 hover:bg-muted/50">
                      <div className="col-span-5 flex items-center gap-2">
                        <FileText className="size-4 text-muted-foreground" />
                        <Link href={`/documents/${doc.id}`} className="hover:text-primary">
                          {doc.title}
                        </Link>
                      </div>
                      <div className="col-span-2 text-muted-foreground">{doc.type}</div>
                      <div className="col-span-2 text-muted-foreground">{doc.size}</div>
                      <div className="col-span-2 text-muted-foreground">{doc.uploadDate}</div>
                      <div className="col-span-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="size-4" />
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
              )}
            </TabsContent>
            <TabsContent value="recent" className="mt-4">
              <div className="rounded-lg border p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">最近访问的文档</h3>
                <p className="mb-6 text-muted-foreground">这里显示您最近访问过的文档</p>
                <Button asChild>
                  <Link href="/documents/recent">查看全部最近文档</Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="favorites" className="mt-4">
              <div className="rounded-lg border p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">收藏的文档</h3>
                <p className="mb-6 text-muted-foreground">您尚未收藏任何文档</p>
                <Button variant="outline">开始收藏文档</Button>
              </div>
            </TabsContent>
            <TabsContent value="shared" className="mt-4">
              <div className="rounded-lg border p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">共享文档</h3>
                <p className="mb-6 text-muted-foreground">这里显示与您共享的文档</p>
                <Button asChild>
                  <Link href="/documents/shared">查看全部共享文档</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
