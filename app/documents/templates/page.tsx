"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { redirect } from "next/navigation"
import {
  ChevronRight,
  FileText,
  Filter,
  Grid,
  List,
  Plus,
  Search,
  SlidersHorizontal,
  Clock,
  Download,
  Copy,
  Trash,
  FileEdit,
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

// 模拟文档模板数据
const documentTemplates = [
  {
    id: "template-1",
    name: "实验报告模板",
    description: "标准实验报告模板，包含实验目的、原理、步骤、结果和分析等部分",
    category: "实验报告",
    createdBy: "张三",
    createdAt: "2023-05-15",
    updatedAt: "2023-08-20",
    usageCount: 156,
    fields: [
      { name: "实验名称", type: "text", required: true },
      { name: "实验日期", type: "date", required: true },
      { name: "实验目的", type: "textarea", required: true },
      { name: "实验原理", type: "textarea", required: true },
      { name: "实验设备", type: "textarea", required: true },
      { name: "实验步骤", type: "textarea", required: true },
      { name: "实验结果", type: "textarea", required: true },
      { name: "结果分析", type: "textarea", required: true },
      { name: "实验结论", type: "textarea", required: true },
    ],
  },
  {
    id: "template-2",
    name: "项目申请书",
    description: "用于申请新项目的标准模板，包含项目概述、目标、计划、预算等",
    category: "项目管理",
    createdBy: "李四",
    createdAt: "2023-06-10",
    updatedAt: "2023-09-05",
    usageCount: 87,
    fields: [
      { name: "项目名称", type: "text", required: true },
      { name: "申请人", type: "text", required: true },
      { name: "申请日期", type: "date", required: true },
      { name: "项目概述", type: "textarea", required: true },
      { name: "项目目标", type: "textarea", required: true },
      { name: "项目计划", type: "textarea", required: true },
      { name: "预期成果", type: "textarea", required: true },
      { name: "预算", type: "number", required: true },
      { name: "团队成员", type: "textarea", required: false },
    ],
  },
  {
    id: "template-3",
    name: "设备借用申请",
    description: "用于申请借用实验室设备的表单模板",
    category: "设备管理",
    createdBy: "王五",
    createdAt: "2023-07-22",
    updatedAt: "2023-07-22",
    usageCount: 213,
    fields: [
      { name: "申请人", type: "text", required: true },
      { name: "申请日期", type: "date", required: true },
      { name: "设备名称", type: "text", required: true },
      { name: "设备编号", type: "text", required: true },
      { name: "借用日期", type: "date", required: true },
      { name: "预计归还日期", type: "date", required: true },
      { name: "借用原因", type: "textarea", required: true },
      { name: "使用地点", type: "text", required: true },
    ],
  },
  {
    id: "template-4",
    name: "会议纪要模板",
    description: "用于记录会议内容和决议的标准模板",
    category: "会议管理",
    createdBy: "赵六",
    createdAt: "2023-08-05",
    updatedAt: "2023-10-12",
    usageCount: 78,
    fields: [
      { name: "会议名称", type: "text", required: true },
      { name: "会议日期", type: "date", required: true },
      { name: "会议地点", type: "text", required: true },
      { name: "主持人", type: "text", required: true },
      { name: "参会人员", type: "textarea", required: true },
      { name: "会议议程", type: "textarea", required: true },
      { name: "会议内容", type: "textarea", required: true },
      { name: "会议决议", type: "textarea", required: true },
      { name: "下次会议时间", type: "date", required: false },
    ],
  },
  {
    id: "template-5",
    name: "竞赛报名表",
    description: "用于竞赛报名的标准表单模板",
    category: "竞赛管理",
    createdBy: "钱七",
    createdAt: "2023-09-18",
    updatedAt: "2023-09-18",
    usageCount: 45,
    fields: [
      { name: "竞赛名称", type: "text", required: true },
      { name: "参赛者姓名", type: "text", required: true },
      { name: "学号", type: "text", required: true },
      { name: "联系电话", type: "text", required: true },
      { name: "邮箱", type: "email", required: true },
      { name: "参赛项目", type: "text", required: true },
      { name: "团队成员", type: "textarea", required: false },
      { name: "指导老师", type: "text", required: false },
    ],
  },
  {
    id: "template-6",
    name: "财务报销单",
    description: "用于财务报销的标准表单模板",
    category: "财务管理",
    createdBy: "孙八",
    createdAt: "2023-10-05",
    updatedAt: "2023-11-10",
    usageCount: 132,
    fields: [
      { name: "报销人", type: "text", required: true },
      { name: "报销日期", type: "date", required: true },
      { name: "报销项目", type: "text", required: true },
      { name: "报销金额", type: "number", required: true },
      { name: "报销类别", type: "select", required: true, options: ["差旅费", "办公用品", "设备采购", "其他"] },
      { name: "报销事由", type: "textarea", required: true },
      { name: "发票数量", type: "number", required: true },
      { name: "银行账号", type: "text", required: true },
      { name: "开户行", type: "text", required: true },
    ],
  },
]

export default function DocumentTemplatesPage() {
  const { toast } = useToast()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // 获取所有类别
  const categories = Array.from(new Set(documentTemplates.map((template) => template.category)))

  // 过滤模板
  const filteredTemplates = documentTemplates.filter(
    (template) =>
      (selectedCategory === null || template.category === selectedCategory) &&
      (template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // 处理使用模板
  const handleUseTemplate = (templateId: string) => {
    toast({
      title: "模板已选择",
      description: "您可以开始填写文档内容",
    })
  }

  // 处理复制模板
  const handleCopyTemplate = (templateId: string) => {
    toast({
      title: "模板已复制",
      description: "您可以编辑复制的模板",
    })
  }

  // 处理删除模板
  const handleDeleteTemplate = (templateId: string) => {
    toast({
      title: "模板已删除",
      description: "文档模板已成功删除",
    })
  }

  if (pathname === "/documents/templates") {
    redirect("/documents?category=template")
  }

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/documents" className="hover:text-foreground">
            文档
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>模板</span>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">文档模板</h1>
            <p className="text-muted-foreground">管理和使用文档模板，提高文档创建效率</p>
          </div>
          <Button asChild>
            <Link href="/documents/templates/create">
              <Plus className="mr-2 h-4 w-4" />
              创建模板
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索模板..."
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
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                排序
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>名称 (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>名称 (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>最近更新</DropdownMenuItem>
              <DropdownMenuItem>使用次数</DropdownMenuItem>
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

      {selectedCategory && (
        <div className="flex items-center">
          <Badge variant="outline" className="flex items-center gap-1">
            {selectedCategory}
            <button
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => setSelectedCategory(null)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">移除筛选</span>
            </button>
          </Badge>
        </div>
      )}

      {viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">{template.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>更新于 {template.updatedAt}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <span>已使用 {template.usageCount} 次</span>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium">包含字段：</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {template.fields.slice(0, 3).map((field) => (
                      <Badge key={field.name} variant="secondary" className="text-xs">
                        {field.name}
                      </Badge>
                    ))}
                    {template.fields.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.fields.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/documents/templates/${template.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    查看
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      操作
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleUseTemplate(template.id)}>
                      <Download className="mr-2 h-4 w-4" />
                      使用模板
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyTemplate(template.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      复制模板
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/documents/templates/${template.id}/edit`}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        编辑模板
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      删除模板
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>模板名称</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>创建者</TableHead>
                <TableHead>更新时间</TableHead>
                <TableHead>使用次数</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{template.description}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{template.category}</Badge>
                  </TableCell>
                  <TableCell>{template.createdBy}</TableCell>
                  <TableCell>{template.updatedAt}</TableCell>
                  <TableCell>{template.usageCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/documents/templates/${template.id}`}>
                          <FileText className="mr-2 h-4 w-4" />
                          查看
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            操作
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUseTemplate(template.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            使用模板
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCopyTemplate(template.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            复制模板
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/documents/templates/${template.id}/edit`}>
                              <FileEdit className="mr-2 h-4 w-4" />
                              编辑模板
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            删除模板
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
