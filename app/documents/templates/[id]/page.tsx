"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ChevronRight,
  Download,
  FileText,
  Copy,
  Trash,
  FileEdit,
  Calendar,
  User,
  Clock,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
    recentDocuments: [
      { id: "doc-1", name: "光学实验报告", createdBy: "李明", createdAt: "2023-11-10" },
      { id: "doc-2", name: "电路实验报告", createdBy: "王芳", createdAt: "2023-11-05" },
      { id: "doc-3", name: "力学实验报告", createdBy: "张伟", createdAt: "2023-10-28" },
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
    recentDocuments: [
      { id: "doc-4", name: "智能家居项目申请", createdBy: "赵明", createdAt: "2023-11-12" },
      { id: "doc-5", name: "校园导航APP项目申请", createdBy: "钱伟", createdAt: "2023-11-01" },
    ],
  },
]

export default function TemplateDetailPage() {
  const { toast } = useToast()
  const params = useParams()
  const templateId = params.id as string

  // 查找模板
  const template = documentTemplates.find((t) => t.id === templateId)

  // 如果模板不存在
  if (!template) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">模板不存在</h2>
          <p className="mt-2 text-sm text-muted-foreground">您请求的文档模板不存在或已被删除</p>
          <Button asChild className="mt-4">
            <Link href="/documents/templates">返回模板列表</Link>
          </Button>
        </div>
      </div>
    )
  }

  // 处理使用模板
  const handleUseTemplate = () => {
    toast({
      title: "模板已选择",
      description: "您可以开始填写文档内容",
    })
  }

  // 处理复制模板
  const handleCopyTemplate = () => {
    toast({
      title: "模板已复制",
      description: "您可以编辑复制的模板",
    })
  }

  // 处理删除模板
  const handleDeleteTemplate = () => {
    toast({
      title: "模板已删除",
      description: "文档模板已成功删除",
    })
  }

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/documents" className="hover:text-foreground">
            文档
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/documents/templates" className="hover:text-foreground">
            模板
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="truncate max-w-[200px]">{template.name}</span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{template.name}</h1>
            <p className="text-muted-foreground">{template.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/documents/templates/${template.id}/edit`}>
                <FileEdit className="mr-2 h-4 w-4" />
                编辑模板
              </Link>
            </Button>
            <Button onClick={handleUseTemplate}>
              <Download className="mr-2 h-4 w-4" />
              使用模板
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">模板详情</TabsTrigger>
          <TabsTrigger value="fields">字段定义</TabsTrigger>
          <TabsTrigger value="usage">使用记录</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>模板的基本信息和元数据</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">模板名称</div>
                  <div>{template.name}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">分类</div>
                  <div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">创建者</div>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    {template.createdBy}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">创建时间</div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {template.createdAt}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">最后更新</div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {template.updatedAt}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">使用次数</div>
                  <div>{template.usageCount} 次</div>
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">描述</div>
                <div className="mt-1">{template.description}</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleCopyTemplate}>
                <Copy className="mr-2 h-4 w-4" />
                复制模板
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    删除模板
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>确认删除</DialogTitle>
                    <DialogDescription>
                      您确定要删除此模板吗？此操作无法撤销，但不会影响已使用此模板创建的文档。
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">取消</Button>
                    <Button variant="destructive" onClick={handleDeleteTemplate}>
                      确认删除
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="fields" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>字段定义</CardTitle>
              <CardDescription>模板包含的所有字段及其属性</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {template.fields.map((field, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{field.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{field.type}</Badge>
                        {field.required ? (
                          <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-50">
                            必填
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">
                            选填
                          </Badge>
                        )}
                      </div>
                    </div>
                    {field.options && (
                      <div className="mt-2">
                        <div className="text-sm font-medium text-muted-foreground">选项：</div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {field.options.map((option, i) => (
                            <Badge key={i} variant="outline">
                              {option}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUseTemplate} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                使用此模板创建文档
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>使用记录</CardTitle>
              <CardDescription>使用此模板创建的最近文档</CardDescription>
            </CardHeader>
            <CardContent>
              {template.recentDocuments && template.recentDocuments.length > 0 ? (
                <div className="space-y-4">
                  {template.recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            由 {doc.createdBy} 创建于 {doc.createdAt}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/documents/${doc.id}`}>查看</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">暂无使用记录</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleUseTemplate} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                使用此模板创建文档
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
