"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronRight,
  Filter,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  Archive,
  RotateCcw,
  Trash2,
  Tag,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// 模拟归档文档数据
const archivedDocuments = [
  {
    id: "doc-1",
    name: "2023年第一季度实验室报告",
    description: "包含2023年第一季度实验室的所有实验数据和分析结果",
    category: "实验报告",
    tags: ["季度报告", "数据分析"],
    createdBy: "张三",
    createdAt: "2023-03-25",
    archivedAt: "2023-06-10",
    archivedBy: "李四",
    size: "2.4 MB",
    version: "1.3",
  },
  {
    id: "doc-2",
    name: "智能家居项目申请书",
    description: "智能家居系统开发项目的申请文档，包含项目计划和预算",
    category: "项目管理",
    tags: ["项目申请", "智能家居"],
    createdBy: "王五",
    createdAt: "2023-02-15",
    archivedAt: "2023-05-20",
    archivedBy: "赵六",
    size: "1.8 MB",
    version: "2.0",
  },
  {
    id: "doc-3",
    name: "实验室设备采购清单",
    description: "2023年度实验室设备采购计划和清单",
    category: "设备管理",
    tags: ["采购", "设备"],
    createdBy: "钱七",
    createdAt: "2023-01-10",
    archivedAt: "2023-04-15",
    archivedBy: "孙八",
    size: "1.2 MB",
    version: "1.5",
  },
  {
    id: "doc-4",
    name: "人工智能研讨会会议纪要",
    description: "2023年4月人工智能技术研讨会的会议记录和决议",
    category: "会议管理",
    tags: ["会议纪要", "人工智能"],
    createdBy: "周九",
    createdAt: "2023-04-05",
    archivedAt: "2023-07-01",
    archivedBy: "吴十",
    size: "3.1 MB",
    version: "1.0",
  },
  {
    id: "doc-5",
    name: "机器学习竞赛报名表",
    description: "2023年全国大学生机器学习竞赛的团队报名表",
    category: "竞赛管理",
    tags: ["竞赛", "机器学习"],
    createdBy: "郑十一",
    createdAt: "2023-05-12",
    archivedAt: "2023-08-05",
    archivedBy: "王十二",
    size: "0.8 MB",
    version: "1.1",
  },
  {
    id: "doc-6",
    name: "实验室设备维修报告",
    description: "激光切割机维修记录和状态报告",
    category: "设备管理",
    tags: ["设备维修", "报告"],
    createdBy: "刘十三",
    createdAt: "2023-06-20",
    archivedAt: "2023-09-10",
    archivedBy: "陈十四",
    size: "1.5 MB",
    version: "1.2",
  },
]

export default function DocumentArchivePage() {
  const { toast } = useToast()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  // 获取所有类别
  const categories = Array.from(new Set(archivedDocuments.map((doc) => doc.category)))

  // 获取所有标签
  const tags = Array.from(new Set(archivedDocuments.flatMap((doc) => doc.tags || [])))

  // 过滤文档
  const filteredDocuments = archivedDocuments.filter(
    (doc) =>
      (selectedCategory === null || doc.category === selectedCategory) &&
      (selectedTag === null || (doc.tags && doc.tags.includes(selectedTag))) &&
      (doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.tags && doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))),
  )

  // 处理恢复文档
  const handleRestoreDocument = () => {
    if (selectedDocument) {
      toast({
        title: "文档已恢复",
        description: `文档 "${selectedDocument.name}" 已从归档中恢复`,
      })
      setIsRestoreDialogOpen(false)
    }
  }

  // 处理永久删除文档
  const handleDeleteDocument = () => {
    if (selectedDocument) {
      toast({
        title: "文档已删除",
        description: `文档 "${selectedDocument.name}" 已永久删除`,
      })
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/documents" className="hover:text-foreground">
            文档
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>归档</span>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">文档归档</h1>
            <p className="text-muted-foreground">查看和管理已归档的文档</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索归档文档..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                分类
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>全部分类</DropdownMenuItem>
              <Separator className="my-1" />
              {categories.map((category) => (
                <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Tag className="mr-2 h-4 w-4" />
                标签
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedTag(null)}>全部标签</DropdownMenuItem>
              <Separator className="my-1" />
              {tags.map((tag) => (
                <DropdownMenuItem key={tag} onClick={() => setSelectedTag(tag)}>
                  {tag}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                排序
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>名称 (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>名称 (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>归档时间 (最新)</DropdownMenuItem>
              <DropdownMenuItem>归档时间 (最早)</DropdownMenuItem>
              <DropdownMenuItem>文件大小</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            className="h-9 w-9 p-0"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">网格视图</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            className="h-9 w-9 p-0"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">列表视图</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {selectedCategory && (
          <Badge variant="outline" className="flex items-center gap-1">
            <span>分类: {selectedCategory}</span>
            <button
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => setSelectedCategory(null)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">移除筛选</span>
            </button>
          </Badge>
        )}
        {selectedTag && (
          <Badge variant="outline" className="flex items-center gap-1">
            <span>标签: {selectedTag}</span>
            <button
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => setSelectedTag(null)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">移除筛选</span>
            </button>
          </Badge>
        )}
      </div>

      {viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{doc.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">{doc.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{doc.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Archive className="mr-1 h-4 w-4" />
                  <span>归档于 {doc.archivedAt}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <span>由 {doc.archivedBy} 归档</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <span>
                    版本 {doc.version} · {doc.size}
                  </span>
                </div>
                {doc.tags && doc.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {doc.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDocument(doc)
                    setIsRestoreDialogOpen(true)
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  恢复
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => {
                    setSelectedDocument(doc)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  删除
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>文档名称</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>归档时间</TableHead>
                <TableHead>归档人</TableHead>
                <TableHead>版本</TableHead>
                <TableHead>大小</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{doc.description}</div>
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.category}</Badge>
                  </TableCell>
                  <TableCell>{doc.archivedAt}</TableCell>
                  <TableCell>{doc.archivedBy}</TableCell>
                  <TableCell>{doc.version}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedDocument(doc)
                          setIsRestoreDialogOpen(true)
                        }}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        恢复
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          setSelectedDocument(doc)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 恢复文档对话框 */}
      <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>恢复文档</DialogTitle>
            <DialogDescription>
              您确定要将此文档从归档中恢复吗？恢复后，文档将重新出现在活动文档列表中。
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="py-4">
              <div className="rounded-lg border p-4">
                <div className="font-medium">{selectedDocument.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{selectedDocument.description}</div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Archive className="mr-1 h-4 w-4" />
                  <span>归档于 {selectedDocument.archivedAt}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestoreDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleRestoreDocument}>
              <RotateCcw className="mr-2 h-4 w-4" />
              确认恢复
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除文档对话框 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>永久删除文档</DialogTitle>
            <DialogDescription>您确定要永久删除此文档吗？此操作无法撤销，文档将被永久删除。</DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="py-4">
              <div className="rounded-lg border p-4">
                <div className="font-medium">{selectedDocument.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{selectedDocument.description}</div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Archive className="mr-1 h-4 w-4" />
                  <span>归档于 {selectedDocument.archivedAt}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteDocument}>
              <Trash2 className="mr-2 h-4 w-4" />
              永久删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
