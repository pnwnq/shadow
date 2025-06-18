"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Plus, Save, Trash, X, ArrowUp, ArrowDown, GripVertical, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// 字段类型选项
const fieldTypes = [
  { value: "text", label: "单行文本" },
  { value: "textarea", label: "多行文本" },
  { value: "number", label: "数字" },
  { value: "date", label: "日期" },
  { value: "select", label: "下拉选择" },
  { value: "checkbox", label: "复选框" },
  { value: "radio", label: "单选按钮" },
  { value: "email", label: "电子邮件" },
  { value: "tel", label: "电话号码" },
  { value: "url", label: "网址" },
  { value: "file", label: "文件上传" },
]

// 文档分类选项
const categories = ["实验报告", "项目管理", "设备管理", "会议管理", "竞赛管理", "财务管理", "学习资料", "其他"]

export default function CreateTemplatePage() {
  const { toast } = useToast()
  const router = useRouter()

  // ���板基本信息
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")
  const [templateCategory, setTemplateCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  // 字段列表
  const [fields, setFields] = useState([{ id: "1", name: "", type: "text", required: true, options: [] }])

  // 当前编辑的字段选项
  const [currentFieldIndex, setCurrentFieldIndex] = useState<number | null>(null)
  const [currentOption, setCurrentOption] = useState("")
  const [fieldOptions, setFieldOptions] = useState<string[]>([])
  const [isOptionsDialogOpen, setIsOptionsDialogOpen] = useState(false)

  // 添加新字段
  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        name: "",
        type: "text",
        required: false,
        options: [],
      },
    ])
  }

  // 删除字段
  const removeField = (index: number) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
  }

  // 更新字段属性
  const updateField = (index: number, field: any) => {
    const newFields = [...fields]
    newFields[index] = { ...newFields[index], ...field }
    setFields(newFields)
  }

  // 移动字段位置
  const moveField = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === fields.length - 1)) {
      return
    }

    const newFields = [...fields]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    const temp = newFields[index]
    newFields[index] = newFields[targetIndex]
    newFields[targetIndex] = temp
    setFields(newFields)
  }

  // 打开字段选项对话框
  const openOptionsDialog = (index: number) => {
    setCurrentFieldIndex(index)
    setFieldOptions(fields[index].options || [])
    setIsOptionsDialogOpen(true)
  }

  // 添加字段选项
  const addOption = () => {
    if (currentOption.trim() && !fieldOptions.includes(currentOption.trim())) {
      setFieldOptions([...fieldOptions, currentOption.trim()])
      setCurrentOption("")
    }
  }

  // 删除字段选项
  const removeOption = (option: string) => {
    setFieldOptions(fieldOptions.filter((o) => o !== option))
  }

  // 保存字段选项
  const saveOptions = () => {
    if (currentFieldIndex !== null) {
      const newFields = [...fields]
      newFields[currentFieldIndex].options = fieldOptions
      setFields(newFields)
      setIsOptionsDialogOpen(false)
      setCurrentFieldIndex(null)
    }
  }

  // 添加自定义分类
  const addCustomCategory = () => {
    if (customCategory.trim() && !categories.includes(customCategory.trim())) {
      setTemplateCategory(customCategory.trim())
      setIsAddingCategory(false)
      setCustomCategory("")
    }
  }

  // 保存模板
  const saveTemplate = () => {
    // 验证必填字段
    if (!templateName.trim()) {
      toast({
        title: "请填写模板名称",
        description: "模板名称不能为空",
        variant: "destructive",
      })
      return
    }

    if (!templateCategory) {
      toast({
        title: "请选择分类",
        description: "请为模板选择一个分类",
        variant: "destructive",
      })
      return
    }

    // 验证字段
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].name.trim()) {
        toast({
          title: "字段名称不能为空",
          description: `第 ${i + 1} 个字段的名称不能为空`,
          variant: "destructive",
        })
        return
      }

      // 验证选择类型字段必须有选项
      if (
        (fields[i].type === "select" || fields[i].type === "radio") &&
        (!fields[i].options || fields[i].options.length < 2)
      ) {
        toast({
          title: "选项不足",
          description: `${fields[i].name} 字段至少需要两个选项`,
          variant: "destructive",
        })
        return
      }
    }

    // 保存模板逻辑
    toast({
      title: "模板已保存",
      description: "文档模板已成功创建",
    })

    // 跳转到模板列表页
    router.push("/documents/templates")
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
          <span>创建模板</span>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">创建文档模板</h1>
            <p className="text-muted-foreground">创建新的文档模板，定义字段和属性</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/documents/templates">取消</Link>
            </Button>
            <Button onClick={saveTemplate}>
              <Save className="mr-2 h-4 w-4" />
              保存模板
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-6">
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>设置模板的基本信息和元数据</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="template-name">
                  模板名称 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="template-name"
                  placeholder="输入模板名称"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-category">
                  分类 <span className="text-destructive">*</span>
                </Label>
                {isAddingCategory ? (
                  <div className="flex gap-2">
                    <Input
                      id="custom-category"
                      placeholder="输入自定义分类"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                    />
                    <Button size="sm" onClick={addCustomCategory}>
                      添加
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsAddingCategory(false)}>
                      取消
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Select value={templateCategory} onValueChange={setTemplateCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline" onClick={() => setIsAddingCategory(true)}>
                      自定义
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-description">描述</Label>
              <Textarea
                id="template-description"
                placeholder="输入模板描述"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>字段定义</CardTitle>
              <CardDescription>定义模板包含的字段及其属性</CardDescription>
            </div>
            <Button onClick={addField}>
              <Plus className="mr-2 h-4 w-4" />
              添加字段
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">暂无字段</p>
                  <Button variant="outline" className="mt-2" onClick={addField}>
                    <Plus className="mr-2 h-4 w-4" />
                    添加字段
                  </Button>
                </div>
              </div>
            ) : (
              fields.map((field, index) => (
                <div key={field.id} className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">字段 {index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => moveField(index, "up")} disabled={index === 0}>
                        <ArrowUp className="h-4 w-4" />
                        <span className="sr-only">上移</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveField(index, "down")}
                        disabled={index === fields.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                        <span className="sr-only">下移</span>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4 text-destructive" />
                            <span className="sr-only">删除</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除</AlertDialogTitle>
                            <AlertDialogDescription>您确定要删除此字段吗？此操作无法撤销。</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction onClick={() => removeField(index)}>确认删除</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`field-name-${index}`}>
                        字段名称 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id={`field-name-${index}`}
                        placeholder="输入字段名称"
                        value={field.name}
                        onChange={(e) => updateField(index, { name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`field-type-${index}`}>
                        字段类型 <span className="text-destructive">*</span>
                      </Label>
                      <Select value={field.type} onValueChange={(value) => updateField(index, { type: value })}>
                        <SelectTrigger id={`field-type-${index}`}>
                          <SelectValue placeholder="选择字段类型" />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`field-required-${index}`}
                        checked={field.required}
                        onCheckedChange={(checked) => updateField(index, { required: checked })}
                      />
                      <Label htmlFor={`field-required-${index}`}>必填字段</Label>
                    </div>

                    {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
                      <Button variant="outline" size="sm" onClick={() => openOptionsDialog(index)}>
                        管理选项
                        {field.options && field.options.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {field.options.length}
                          </Badge>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={addField}>
              <Plus className="mr-2 h-4 w-4" />
              添加字段
            </Button>
            <Button onClick={saveTemplate}>
              <Save className="mr-2 h-4 w-4" />
              保存模板
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* 字段选项对话框 */}
      <Dialog open={isOptionsDialogOpen} onOpenChange={setIsOptionsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>管理选项</DialogTitle>
            <DialogDescription>
              {currentFieldIndex !== null && `为 "${fields[currentFieldIndex]?.name || "字段"}" 添加选项`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="输入选项值"
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addOption()
                  }
                }}
              />
              <Button type="button" onClick={addOption}>
                添加
              </Button>
            </div>

            <div className="space-y-2">
              <Label>当前选项</Label>
              {fieldOptions.length === 0 ? (
                <div className="flex h-20 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-sm text-muted-foreground">暂无选项</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {fieldOptions.map((option, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-2">
                      <span>{option}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeOption(option)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">删除</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {(fieldOptions.length === 0 || fieldOptions.length === 1) &&
                currentFieldIndex !== null &&
                (fields[currentFieldIndex]?.type === "select" || fields[currentFieldIndex]?.type === "radio") && (
                  <div className="mt-2 flex items-center text-sm text-amber-600">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <span>{fieldOptions.length === 0 ? "请至少添加两个选项" : "还需要至少一个选项"}</span>
                  </div>
                )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOptionsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={saveOptions}>保存选项</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
