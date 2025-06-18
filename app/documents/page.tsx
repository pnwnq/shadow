"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, FileText, Filter, Grid3X3, List, Plus, SlidersHorizontal, FileSpreadsheet } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { Document } from "@/types"
import { format } from "date-fns"

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function DocumentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [files, setFiles] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (searchTerm) {
          params.append("search", searchTerm)
        }
        if (activeCategory) {
          params.append("category", activeCategory)
        }
        const response = await fetch(`/api/documents?${params.toString()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch documents")
        }
        const data = await response.json()
        setFiles(data)
      } catch (error) {
        console.error(error)
        toast({
          title: "Error",
          description: "Could not fetch documents.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchDocuments()
  }, [searchTerm, activeCategory, toast])

  const filteredFiles = files

  const handleUpload = () => {
    router.push("/documents/upload")
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category)
  }

  const handleUseTemplate = (templateId: string) => {
    toast({
      title: "使用模板",
      description: "已创建新文件，您可以开始编辑",
    })
    // Here you can navigate to the edit page
    // router.push(`/documents/edit?template=${templateId}`)
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">文件管理</h1>
        <div className="flex items-center gap-2">
          <Button className="gap-1" onClick={handleUpload}>
            <Plus className="h-4 w-4" />
            上传文件
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="md:w-1/4 lg:w-1/5 space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 font-semibold">文件分类</h2>
            <div className="space-y-2">
              <Button
                variant={activeCategory === null ? "default" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => setActiveCategory(null)}
              >
                所有文件
              </Button>
              <Button
                variant={activeCategory === "tech" ? "default" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => handleCategoryClick("tech")}
              >
                技术文件
              </Button>
              <Button
                variant={activeCategory === "study" ? "default" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => handleCategoryClick("study")}
              >
                学习资料
              </Button>
              <Button
                variant={activeCategory === "project" ? "default" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => handleCategoryClick("project")}
              >
                项目文件
              </Button>
              <Button
                variant={activeCategory === "manual" ? "default" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => handleCategoryClick("manual")}
              >
                设备手册
              </Button>
              <Button
                variant={activeCategory === "template" ? "default" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => handleCategoryClick("template")}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                文件模板
              </Button>
              <Button
                variant={activeCategory === "other" ? "default" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => handleCategoryClick("other")}
              >
                其他
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 font-semibold">最近使用的文件</h2>
            <div className="space-y-2">
              {files.slice(0, 3).map((doc) => (
                <div key={doc.id} className="text-sm border-b pb-2">
                  <Link href={`/documents/${doc.id}`} className="hover:text-primary">
                    {doc.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{format(new Date(doc.createdAt), "yyyy-MM-dd")}</p>
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
                <Link href="/documents/tags/robot">机器人</Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <Link href="/documents/tags/vision">计算机视觉</Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <Link href="/documents/tags/sensor">传感器</Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <Link href="/documents/tags/ros">ROS</Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <Link href="/documents/tags/navigation">自主导航</Link>
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
                    <SlidersHorizontal className="h-4 w-4" />
                    排序
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>名称 (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>名称 (Z-A)</DropdownMenuItem>
                  <DropdownMenuItem>按修改日期排序</DropdownMenuItem>
                  <DropdownMenuItem>按文件大小排序</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative ml-4 hidden md:flex">
                <Input
                  type="search"
                  placeholder="搜索文件..."
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

          {activeCategory === "template" && (
            <div className="bg-muted/50 p-4 rounded-lg mb-2">
              <h2 className="text-lg font-medium mb-2">文件模板</h2>
              <p className="text-sm text-muted-foreground mb-2">
                使用模板可以快速创建标准化文件。点击"使用模板"按钮创建基于模板的新文件。
              </p>
            </div>
          )}

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="recent">最近</TabsTrigger>
              <TabsTrigger value="favorites">收藏</TabsTrigger>
              <TabsTrigger value="shared">共享</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4 space-y-4">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {[...Array(8)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </CardContent>
                      <CardFooter>
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {filteredFiles.map((file) => (
                    <Card key={file.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <FileText className="h-6 w-6 text-primary" />
                          <Badge variant={file.isTemplate ? "default" : "secondary"}>
                            {file.isTemplate ? "模板" : file.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-1">
                        <CardTitle className="text-base truncate leading-snug" title={file.title}>
                          <Link href={`/documents/${file.id}`}>{file.title}</Link>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{file.type}</p>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground justify-between">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{format(new Date(file.createdAt), "yyyy-MM-dd")}</span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-4 border rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr className="[&_th]:px-4 [&_th]:py-2 [&_th]:text-left">
                        <th>标题</th>
                        <th>分类</th>
                        <th>大小</th>
                        <th>上传日期</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFiles.map((file) => (
                        <tr key={file.id} className="border-t [&_td]:px-4 [&_td]:py-2">
                          <td className="font-medium truncate" title={file.title}>
                            <Link href={`/documents/${file.id}`} className="hover:underline">
                              {file.title}
                            </Link>
                          </td>
                          <td>
                            <Badge variant={file.isTemplate ? "default" : "secondary"}>
                              {file.isTemplate ? "模板" : file.category}
                            </Badge>
                          </td>
                          <td>{formatFileSize(file.size)}</td>
                          <td>{format(new Date(file.createdAt), "yyyy-MM-dd")}</td>
                          <td>
                            <Button variant="ghost" size="sm">
                              详情
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {!loading && filteredFiles.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>没有找到文件。</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="recent" className="mt-4">
              <div className="rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium mb-2">最近访问的文件</h3>
                <p className="text-muted-foreground mb-6">这里显示您最近访问过的文件</p>
                <Button asChild>
                  <Link href="/documents/recent">查看全部最近文件</Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="favorites" className="mt-4">
              <div className="rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium mb-2">收藏的文件</h3>
                <p className="text-muted-foreground mb-6">您尚未收藏任何文件</p>
                <Button variant="outline">开始收藏文件</Button>
              </div>
            </TabsContent>
            <TabsContent value="shared" className="mt-4">
              <div className="rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium mb-2">共享文件</h3>
                <p className="text-muted-foreground mb-6">这里显示与您共享的文件</p>
                <Button asChild>
                  <Link href="/documents/shared">查看全部共享文件</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
