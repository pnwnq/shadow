"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, FileText, File, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function UploadDocumentPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [documentTitle, setDocumentTitle] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [documentDescription, setDocumentDescription] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      // 如果是图片类型，创建预览
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreviewUrl(null)
      }

      // 自动设置文档标题为文件名（不含扩展名）
      const fileName = file.name.split(".").slice(0, -1).join(".")
      setDocumentTitle(fileName)
    }
  }

  // 移除已选择的文件
  const removeFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      toast({
        title: "上传失败",
        description: "请选择要上传的文件",
        variant: "destructive",
      })
      return
    }

    if (!documentTitle.trim()) {
      toast({
        title: "上传失败",
        description: "请输入文档标题",
        variant: "destructive",
      })
      return
    }

    if (!documentType) {
      toast({
        title: "上传失败",
        description: "请选择文档类型",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // 模拟上传过程
    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)

      toast({
        title: "上传成功",
        description: "文档已成功上传到项目中",
      })

      // 延迟后返回项目详情页
      setTimeout(() => {
        router.push(`/projects/${id}?tab=documents&uploaded=true`)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="space-y-6 p-6 md:p-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">项目管理</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects/${id}`}>项目详情</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects/${id}/documents/upload`}>上传文件</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/projects/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回项目
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">上传项目文件</h1>
        <p className="text-muted-foreground">上传与项目相关的文档、图纸、代码、图片或其他文件</p>
      </div>

      {uploadSuccess ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">文件上传成功！正在返回项目详情页...</AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>文件信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!selectedFile ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                  <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <h3 className="font-medium">上传文件</h3>
                    <p className="text-sm text-muted-foreground">
                      支持各种文件格式，包括文档、图片、视频、代码、压缩包等，最大 50MB
                    </p>
                    <Button size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
                      选择文件
                    </Button>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {previewUrl ? (
                          <div className="w-16 h-16 overflow-hidden rounded bg-muted">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="文件预览"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex items-center justify-center rounded bg-muted">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type || "未知类型"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                      onClick={removeFile}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">移除文件</span>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="document-title">文件标题</Label>
                      <Input
                        id="document-title"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        placeholder="输入文件标题"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="document-type">文件类型</Label>
                      <Select value={documentType} onValueChange={setDocumentType} required>
                        <SelectTrigger id="document-type">
                          <SelectValue placeholder="选择文件类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">文档</SelectItem>
                          <SelectItem value="image">图片</SelectItem>
                          <SelectItem value="video">视频</SelectItem>
                          <SelectItem value="code">代码</SelectItem>
                          <SelectItem value="drawing">图纸</SelectItem>
                          <SelectItem value="presentation">演示文稿</SelectItem>
                          <SelectItem value="spreadsheet">电子表格</SelectItem>
                          <SelectItem value="archive">压缩包</SelectItem>
                          <SelectItem value="other">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="document-description">文件描述</Label>
                      <Textarea
                        id="document-description"
                        value={documentDescription}
                        onChange={(e) => setDocumentDescription(e.target.value)}
                        placeholder="输入文件描述（可选）"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" asChild>
                <Link href={`/projects/${id}`}>取消</Link>
              </Button>
              <Button type="submit" disabled={isUploading || !selectedFile || !documentTitle.trim() || !documentType}>
                {isUploading ? (
                  <>
                    <File className="mr-2 h-4 w-4 animate-spin" />
                    上传中...
                  </>
                ) : (
                  <>
                    <File className="mr-2 h-4 w-4" />
                    上传文件
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  )
}
