"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Upload, X, Medal, Loader2, CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// 模拟的证书识别结果
const recognitionResults = {
  全国大学生机器人大赛: {
    name: "全国大学生机器人大赛",
    website: "https://www.cnrobocon.net",
    value: "高",
    description:
      "全国大学生机器人大赛是由教育部高等教育司主办的全国性大学生科技竞赛，是我国高校中规模最大、影响最广的科技竞赛之一。",
    skills: ["机器人设计", "控制算法", "嵌入式系统", "团队协作"],
    recognitionLevel: "国家级",
  },
  中国机器人及人工智能大赛: {
    name: "中国机器人及人工智能大赛",
    website: "https://www.robotai.cn",
    value: "高",
    description:
      "中国机器人及人工智能大赛是由中国自动化学会主办的全国性科技竞赛，旨在促进机器人技术和人工智能的发展与应用。",
    skills: ["人工智能", "机器人技术", "计算机视觉", "自然语言处理"],
    recognitionLevel: "国家级",
  },
  智能车竞赛: {
    name: "全国大学生智能车竞赛",
    website: "https://www.smartcar.org.cn",
    value: "中",
    description: "全国大学生智能车竞赛是教育部高等教育司发起的全国性科技竞赛，旨在培养大学生的创新能力和团队协作精神。",
    skills: ["嵌入式系统", "传感器技术", "控制算法", "电路设计"],
    recognitionLevel: "国家级",
  },
}

export default function UploadCertificatePage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recognitionResult, setRecognitionResult] = useState<any>(null)

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 移除已选择的文件
  const removeFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setRecognitionResult(null)
  }

  // 模拟证书识别
  const analyzeCertificate = () => {
    if (!selectedFile) return

    setIsAnalyzing(true)

    // 模拟分析延迟
    setTimeout(() => {
      // 随机选择一个识别结果
      const keys = Object.keys(recognitionResults)
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      setRecognitionResult(recognitionResults[randomKey as keyof typeof recognitionResults])
      setWebsiteUrl(recognitionResults[randomKey as keyof typeof recognitionResults].website)
      setIsAnalyzing(false)
    }, 2000)
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // 模拟上传过程
    setTimeout(() => {
      setIsUploading(false)
      router.push("/certificates?success=true")
    }, 1500)
  }

  return (
    <div className="space-y-6 p-6 md:p-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile">个人资料</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/certificates">证书与奖项</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/certificates/upload">上传新证书</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/certificates" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            返回证书列表
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">上传新证书</h1>
        <p className="text-muted-foreground">上传您的竞赛证书，系统将自动识别并提取相关信息</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>证书上传</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!selectedFile ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="font-medium">上传证书图片</h3>
                  <p className="text-sm text-muted-foreground">支持 JPG, PNG 或 PDF 格式，最大 10MB</p>
                  <Button size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
                    选择文件
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    {previewUrl && (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="证书预览"
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                    onClick={removeFile}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">移除文件</span>
                  </Button>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>

                {!recognitionResult && !isAnalyzing && (
                  <Button type="button" onClick={analyzeCertificate} className="w-full">
                    <Medal className="mr-2 h-4 w-4" />
                    分析证书
                  </Button>
                )}

                {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center p-4 space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>正在分析证书内容，请稍候...</p>
                  </div>
                )}

                {recognitionResult && (
                  <div className="space-y-4">
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-600">
                        成功识别证书！系统已自动提取相关信息。
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4 rounded-lg border p-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">识别结果</p>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{recognitionResult.name}</h3>
                          <Badge>{recognitionResult.recognitionLevel}</Badge>
                          <Badge variant="outline">含金量: {recognitionResult.value}</Badge>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">竞赛描述</p>
                        <p className="text-sm text-muted-foreground">{recognitionResult.description}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">相关技能</p>
                        <div className="flex flex-wrap gap-2">
                          {recognitionResult.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">竞赛官网</Label>
                        <Input
                          id="website"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          placeholder="输入竞赛官方网站"
                        />
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="h-8" asChild>
                            <a
                              href={websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              访问官网 <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" asChild>
              <Link href="/certificates">取消</Link>
            </Button>
            <Button
              type="submit"
              disabled={isUploading || !selectedFile || isAnalyzing || (!recognitionResult && selectedFile)}
            >
              {isUploading ? "上传中..." : "保存证书"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
