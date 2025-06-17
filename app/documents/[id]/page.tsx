"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowDown, Download, FileText, MessageSquare, Share2, Star, ThumbsUp, Loader2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DocumentPreview } from "@/components/document-preview"

// Manually define the Document type as a workaround for Prisma generate issues
interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  category: string | null;
  tags: string[];
  isTemplate: boolean;
  createdAt: string | Date;
  updatedAt:string | Date;
  uploaderId: string;
}

// Define a more detailed document type for the frontend, including relations
// This can be expanded as we build out features like comments, author details etc.
type DocumentDetail = Document & {
  // Example of expanding the type
  // author: { name: string; avatar: string; };
  // comments: any[];
}

export default function DocumentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  
  const [document, setDocument] = useState<DocumentDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [comment, setComment] = useState("")
  const [isStarred, setIsStarred] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const docId = params.id as string

  useEffect(() => {
    if (!docId) return

    const fetchDocument = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/documents/${docId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch document")
        }
        const data = await response.json()
        setDocument(data)
        setError(null)
      } catch (err: any) {
        setError(err.message)
        setDocument(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocument()
  }, [docId])


  const handleDownload = () => {
    if (!document?.url) return;
    window.open(document.url, '_blank');
    toast({
      title: "开始下载",
      description: `${document?.name} 下载已开始`,
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "分享文档",
      description: "文档链接已复制到剪贴板",
    })
  }

  const handleStar = () => {
    setIsStarred(!isStarred)
    toast({
      title: isStarred ? "已取消收藏" : "已添加到收藏",
      description: isStarred ? "文档已从收藏夹中移除" : "文档已添加到收藏夹",
    })
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    toast({
      title: "评论已提交",
      description: "您的评论已成功提交",
    })
    setComment("")
  }

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    // 模拟AI助手的回答
    setAnswer("这是一个模拟的回答。请稍后查看。")
    setQuestion("")
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
     return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">加载失败</h2>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <Button className="mt-4" asChild>
            <Link href="/documents">返回文档列表</Link>
          </Button>
        </div>
      </div>
    )
  }


  if (!document) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">文档不存在</h2>
          <p className="mt-2 text-muted-foreground">找不到请求的文档</p>
          <Button className="mt-4" asChild>
            <Link href="/documents">返回文档列表</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  const formattedDate = new Intl.DateTimeFormat('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(new Date(document.createdAt));
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }


  return (
    <div className="space-y-6 p-4 md:p-8">
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
          {/* Category can be added later if needed */}
          {/* <BreadcrumbItem>
            <BreadcrumbLink href={`/documents/categories/${document.category}`}>
              {document.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbLink href={`/documents/${document.id}`}>{document.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{document.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {document.type} · {formatFileSize(document.size)}
            </span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">上传于 {formattedDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleStar}>
            <Star className={`h-4 w-4 ${isStarred ? "fill-primary text-primary" : ""}`} />
            {isStarred ? "已收藏" : "收藏"}
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            分享
          </Button>
          <Button variant="default" size="sm" className="gap-1" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            下载
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preview">预览</TabsTrigger>
            <TabsTrigger value="comments">评论 (0)</TabsTrigger>
            <TabsTrigger value="history">历史版本</TabsTrigger>
            <TabsTrigger value="ai-qa">AI问答</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview">
            <DocumentPreview fileUrl={document.url} fileType={document.type} />
          </TabsContent>

          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>评论</CardTitle>
                <CardDescription>在这里查看和发表对文档的评论。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Mock comments, replace with real data later */}
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>李四</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">李四</div>
                        <div className="text-xs text-muted-foreground">2 天前</div>
                      </div>
                      <div>这份入门指南非常详细，对我理解单片机基础概念很有帮助！</div>
                      <Button variant="ghost" size="sm" className="w-fit gap-1 text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        赞 (2)
                      </Button>
                    </div>
                  </div>
                </div>
                <Separator />
                <form className="flex w-full items-start gap-4" onSubmit={handleSubmitComment}>
                  <Avatar>
                    <AvatarFallback>我</AvatarFallback>
                  </Avatar>
                  <div className="grid w-full gap-2">
                    <Textarea
                      placeholder="写下你的评论..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button type="submit" size="sm" className="ml-auto">
                      提交评论
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>历史版本</CardTitle>
                <CardDescription>查看和管理文档的历史版本。</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mock version history */}
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">版本 1.0 (当前)</p>
                      <p className="text-sm text-muted-foreground">由 张三 上传于 {formattedDate}</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <ArrowDown className="h-4 w-4" />
                      下载
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-qa">
            <Card>
              <CardHeader>
                <CardTitle>AI 问答</CardTitle>
                <CardDescription>基于文档内容向AI助手提问。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleAskQuestion} className="space-y-4">
                  <Textarea
                    placeholder="例如: 这份文档的主要内容是什么?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <Button type="submit">向AI提问</Button>
                </form>
                {answer && (
                  <div className="rounded-md border bg-muted p-4">
                    <p className="font-semibold">AI 回答:</p>
                    <p className="text-sm text-muted-foreground mt-2">{answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
