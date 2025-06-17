"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ChevronDown,
  FileText,
  Filter,
  Grid3X3,
  List,
  Plus,
  SlidersHorizontal,
  FileSpreadsheet,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// Manually define types to decouple from Prisma client generation issues
interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  category: string | null;
  tags: string[];
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
  uploaderId: string;
}

type DocumentWithUploader = Document & {
  uploader: {
    name: string | null
  }
}

interface DocumentClientProps {
  initialDocuments: DocumentWithUploader[]
  categories: { id: string; name: string }[]
  tags: string[]
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export function DocumentClient({ initialDocuments, categories, tags }: DocumentClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [documents, setDocuments] = useState(initialDocuments)
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      if (activeCategory) {
        if (activeCategory === "template") {
          return doc.isTemplate
        }
        return doc.category === activeCategory
      }
      return true
    })
  }, [documents, searchTerm, activeCategory])

  const handleUpload = () => {
    router.push("/documents/upload")
  }

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category)
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">文件管理</h1>
        <Button className="gap-1" onClick={handleUpload}>
          <Plus className="h-4 w-4" />
          上传文件
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="md:w-1/4 lg:w-1/5 space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 font-semibold">文件分类</h2>
            <div className="space-y-2">
              <Button
                variant={activeCategory === null ? "default" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => handleCategoryClick(null)}
              >
                所有文件
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "ghost"}
                  className="w-full justify-start font-normal"
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.id === "template" && <FileSpreadsheet className="mr-2 h-4 w-4" />}
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 font-semibold">标签</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button key={tag} variant="outline" size="sm" className="rounded-full" asChild>
                  <Link href={`/documents/tags/${tag.toLowerCase()}`}>{tag}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-3/4 lg:w-4/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="搜索文件..."
                className="w-full rounded-lg pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 ml-4">
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

          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all" className="mt-4 space-y-4">
              {filteredDocuments.length === 0 ? (
                <div className="rounded-lg border p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">没有找到文件</h3>
                  <p className="text-muted-foreground mb-6">尝试更改搜索条件或上传新文件</p>
                  <Button onClick={handleUpload}>上传文件</Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <CardTitle className="text-base">{doc.name}</CardTitle>
                          </a>
                          {doc.isTemplate && <Badge variant="outline">模板</Badge>}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>
                            {doc.type} · {formatBytes(doc.size)}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
                        <span>{doc.uploader?.name || "未知"}</span>
                        <span>{format(new Date(doc.createdAt), "yyyy-MM-dd")}</span>
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
                    <div className="col-span-1 text-right">操作</div>
                  </div>
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/50 items-center">
                      <div className="col-span-5 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                          {doc.name}
                        </a>
                        {doc.isTemplate && <Badge variant="outline">模板</Badge>}
                      </div>
                      <div className="col-span-2 text-muted-foreground">{doc.type}</div>
                      <div className="col-span-2 text-muted-foreground">{formatBytes(doc.size)}</div>
                      <div className="col-span-2 text-muted-foreground">
                        {format(new Date(doc.createdAt), "yyyy-MM-dd")}
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                查看/下载
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>重命名</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 