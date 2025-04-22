"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, type File, FileText, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function UploadDocumentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

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
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟上传
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "文档上传成功",
        description: "您的文档已成功上传",
      })
      router.push("/documents")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-6 p-4 md:p-8">
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
              <BreadcrumbLink href="/documents/upload">上传文档</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/documents" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              返回文档列表
            </Link>
          </Button>
        </div>
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>上传文档</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">文档标题</Label>
                  <Input id="title" placeholder="请输入文档标题" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">分类</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">技术文档</SelectItem>
                      <SelectItem value="study">学习资料</SelectItem>
                      <SelectItem value="project">项目文档</SelectItem>
                      <SelectItem value="manual">设备手册</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">标签</Label>
                  <Input id="tags" placeholder="输入标签，用逗号分隔" />
                  <p className="text-xs text-muted-foreground">例如：Arduino, 单片机, 传感器</p>
                </div>
                <div className="space-y-2">
                  <Label>文件</Label>
                  <div
                    className={`relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors ${
                      dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                    />
                    {selectedFile ? (
                      <div className="flex w-full flex-col items-center">
                        <div className="flex w-full items-center justify-between rounded-md border bg-background p-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-8 w-8 text-primary" />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{selectedFile.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
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
                        <p className="text-xs text-muted-foreground">
                          支持 PDF, Word, Excel, PowerPoint, TXT, ZIP, RAR 格式
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">文档描述</Label>
                  <Textarea id="description" placeholder="请输入文档描述" className="min-h-[100px]" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/documents")}>
                  取消
                </Button>
                <Button type="submit" disabled={isSubmitting || !selectedFile}>
                  {isSubmitting ? "上传中..." : "上传文档"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
