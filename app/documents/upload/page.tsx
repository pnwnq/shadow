"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, FileText, Upload, X, File as FileIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Uppy from "@uppy/core"
import XHRUpload from "@uppy/xhr-upload"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function UploadFilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  })

  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: false,
      restrictions: {
        maxFileSize: 1024 * 1024 * 50, // 50MB
      },
    }).use(XHRUpload, {
      endpoint: "/api/upload",
      fieldName: "file",
      formData: true,
    })
  )

  useEffect(() => {
    const onComplete = (result: any) => {
      setIsSubmitting(false)
      if (result.successful.length > 0) {
        toast({
          title: "文件上传成功",
          description: `文件"${result.successful[0].meta.title || result.successful[0].name}"已成功上传`,
        })
        router.push("/documents")
        router.refresh()
      } else if (result.failed.length > 0) {
        toast({
          title: "上传失败",
          description: result.failed[0].error || "文件上传失败，请稍后重试。",
          variant: "destructive",
        })
      }
    }

    const onUploadError = (file: any, error: any) => {
      setIsSubmitting(false)
      toast({
        title: "上传出错",
        description: error.message,
        variant: "destructive",
      })
    }

    uppy.on("complete", onComplete)
    uppy.on("upload-error", onUploadError)

    return () => {
      uppy.off("complete", onComplete)
      uppy.off("upload-error", onUploadError)
    }
  }, [uppy, router, toast])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0])
    }
  }

  const handleFileSelection = (file: File) => {
    setSelectedFile(file)

    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }

    const fileName = file.name
    const titleWithoutExtension = fileName.substring(0, fileName.lastIndexOf(".")) || fileName
    setFormData((prev) => ({ ...prev, title: titleWithoutExtension }))

    const fileExtension = fileName.split(".").pop()?.toLowerCase() || ""
    let detectedFileType = "其他"

    if (["doc", "docx", "pdf", "txt", "rtf"].includes(fileExtension)) {
      detectedFileType = "文档"
    } else if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(fileExtension)) {
      detectedFileType = "图片"
    } else if (["mp4", "webm", "avi", "mov", "wmv"].includes(fileExtension)) {
      detectedFileType = "视频"
    } else if (["mp3", "wav", "ogg", "flac"].includes(fileExtension)) {
      detectedFileType = "音频"
    } else if (["js", "ts", "py", "java", "c", "cpp", "html", "css", "php"].includes(fileExtension)) {
      detectedFileType = "代码"
    } else if (["xls", "xlsx", "csv"].includes(fileExtension)) {
      detectedFileType = "电子表格"
    } else if (["ppt", "pptx"].includes(fileExtension)) {
      detectedFileType = "演示文稿"
    } else if (["zip", "rar", "7z", "tar", "gz"].includes(fileExtension)) {
      detectedFileType = "压缩包"
    } else if (["dwg", "dxf", "skp"].includes(fileExtension)) {
      detectedFileType = "图纸/CAD"
    }

    setFileType(detectedFileType)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setFileType("")
    setFormData((prev) => ({ ...prev, title: "" }))
    uppy.cancelAll()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      toast({ title: "请选择文件", description: "您需要上传一个文件才能继续", variant: "destructive" })
      return
    }
    if (!formData.title.trim()) {
      toast({ title: "请输入标题", description: "文件标题不能为空", variant: "destructive" })
      return
    }
    if (!formData.category) {
      toast({ title: "请选择分类", description: "请为文件选择一个分类", variant: "destructive" })
      return
    }

    setIsSubmitting(true)

    try {
      uppy.addFile({
        name: selectedFile.name,
        type: selectedFile.type,
        data: selectedFile,
        meta: {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          size: selectedFile.size,
        },
      })
      await uppy.upload()
    } catch (error) {
      console.error("Upload error:", error)
      setIsSubmitting(false)
      toast({ title: "上传准备失败", description: "无法开始上传，请检查配置或文件。", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/documents" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            返回文件列表
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">上传文件</h1>
        <p className="text-muted-foreground">上传文档、图片、视频、代码或其他类型的文件</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>文件信息</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>选择文件</Label>
                <div
                  className={`relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                  {selectedFile ? (
                    <div className="flex w-full flex-col items-center">
                      <div className="flex w-full items-center justify-between rounded-md border bg-background p-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          {previewUrl ? (
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                              <img
                                src={previewUrl}
                                alt="预览"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <FileText className="h-8 w-8 flex-shrink-0 text-primary" />
                          )}
                          <div className="flex flex-col overflow-hidden">
                            <span className="truncate text-sm font-medium">{selectedFile.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · {fileType}
                            </span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveFile()
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                      <p className="mb-1 text-sm font-medium">拖放文件到此处或点击上传</p>
                      <p className="text-xs text-muted-foreground">支持各种文件格式，最大 50MB</p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">文件标题</Label>
                  <Input
                    id="title"
                    placeholder="输入文件标题"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">文件分类</Label>
                  <Select value={formData.category} onValueChange={handleSelectChange}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">项目文件</SelectItem>
                      <SelectItem value="tech">技术文档</SelectItem>
                      <SelectItem value="study">学习资料</SelectItem>
                      <SelectItem value="manual">设备手册</SelectItem>
                      <SelectItem value="report">报告</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">文件描述</Label>
                <Textarea
                  id="description"
                  placeholder="请输入文件描述"
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/documents")}>
                取消
              </Button>
              <Button type="submit" disabled={isSubmitting || !selectedFile || !formData.title.trim() || !formData.category}>
                {isSubmitting ? (
                  <>
                    <FileIcon className="mr-2 h-4 w-4 animate-spin" />
                    上传中...
                  </>
                ) : (
                  <>
                    <FileIcon className="mr-2 h-4 w-4" />
                    上传文件
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
