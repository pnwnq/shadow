"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, Download, FileText, MessageSquare, Share2, Star, ThumbsUp } from "lucide-react"
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

// 模拟文档数据
const documents = [
  {
    id: "1",
    title: "单片机入门指南.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-04-15",
    category: "tech",
    description: "本文档详细介绍了单片机的基本原理、开发环境搭建、基础编程和常见应用案例。适合单片机初学者阅读。",
    author: {
      id: "zhangsan",
      name: "张三",
      avatar: "ZS",
    },
    tags: ["单片机", "Arduino", "入门指南"],
    versions: [
      {
        version: "1.0",
        date: "2024-04-15",
        description: "初始版本",
      },
      {
        version: "0.9",
        date: "2024-04-10",
        description: "草稿版本",
      },
    ],
    comments: [
      {
        id: "1",
        author: {
          id: "lisi",
          name: "李四",
          avatar: "LS",
        },
        content: "这份入门指南非常详细，对我理解单片机基础概念很有帮助！",
        date: "2024-04-16 10:30",
      },
      {
        id: "2",
        author: {
          id: "wangwu",
          name: "王五",
          avatar: "WW",
        },
        content: "第三章关于中断的讲解可以再详细一些，对于初学者来说有点难理解。",
        date: "2024-04-17 15:45",
      },
    ],
  },
  {
    id: "2",
    title: "PCB设计规范.docx",
    type: "Word",
    size: "1.8 MB",
    uploadDate: "2024-04-10",
    category: "tech",
    description: "本文档包含实验室PCB设计的标准规范，包括线宽、间距、布线技巧、元件布局等方面的指导和要求。",
    author: {
      id: "lisi",
      name: "李四",
      avatar: "LS",
    },
    tags: ["PCB设计", "规范", "电路设计"],
    versions: [
      {
        version: "2.1",
        date: "2024-04-10",
        description: "更新了高速信号布线规范",
      },
      {
        version: "2.0",
        date: "2024-03-20",
        description: "全面修订版本",
      },
      {
        version: "1.0",
        date: "2023-10-15",
        description: "初始版本",
      },
    ],
    comments: [
      {
        id: "1",
        author: {
          id: "zhangsan",
          name: "张三",
          avatar: "ZS",
        },
        content: "这个规范文档非常全面，建议所有成员在设计PCB前仔细阅读。",
        date: "2024-04-12 09:15",
      },
    ],
  },
]

export default function DocumentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [comment, setComment] = useState("")
  const [isStarred, setIsStarred] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const docId = params.id as string
  const document = documents.find((doc) => doc.id === docId)

  const handleDownload = () => {
    toast({
      title: "开始下载",
      description: `${document?.title} 下载已开始`,
    })
  }

  const handleShare = () => {
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
          <BreadcrumbItem>
            <BreadcrumbLink href={`/documents/categories/${document.category}`}>
              {document.category === "tech"
                ? "技术文档"
                : document.category === "study"
                  ? "学习资料"
                  : document.category === "project"
                    ? "项目文档"
                    : document.category === "manual"
                      ? "设备手册"
                      : "其他"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/documents/${document.id}`}>{document.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{document.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {document.type} · {document.size}
            </span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">上传于 {document.uploadDate}</span>
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

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>文档预览</CardTitle>
              <CardDescription>查看 {document.title} 的内容</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center rounded-lg border bg-muted/50">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">文档预览</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {document.type === "PDF"
                      ? "PDF 预览功能即将上线"
                      : document.type === "Word"
                        ? "Word 文档预览功能即将上线"
                        : document.type === "Excel"
                          ? "Excel 预览功能即将上线"
                          : "文件预览功能即将上线"}
                  </p>
                  <Button variant="outline" className="mt-4 gap-2" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    下载文档
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>文档描述</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{document.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {document.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/documents/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold hover:bg-muted/50"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>评论 ({document.comments.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {document.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{comment.author.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/community/members/${comment.author.id}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {comment.author.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="ghost" size="sm" className="h-7 gap-1 px-2">
                        <ThumbsUp className="h-3 w-3" />
                        <span className="text-xs">赞</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 gap-1 px-2">
                        <MessageSquare className="h-3 w-3" />
                        <span className="text-xs">回复</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Separator className="my-4" />

              <form onSubmit={handleSubmitComment}>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">发表评论</h4>
                  <Textarea
                    placeholder="写下你的评论..."
                    className="min-h-[100px]"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" disabled={!comment.trim()}>
                      提交评论
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI助手问答</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAskQuestion}>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">提问</h4>
                  <Textarea
                    placeholder="向AI助手提问..."
                    className="min-h-[100px]"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" disabled={!question.trim()}>
                      提问
                    </Button>
                  </div>
                </div>
              </form>
              {answer && (
                <div>
                  <h4 className="text-sm font-medium">AI助手的回答</h4>
                  <p className="text-sm">{answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>文档信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">上传者</span>
                  <Link
                    href={`/community/members/${document.author.id}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {document.author.name}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">上传日期</span>
                  <span className="text-sm">{document.uploadDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">文件类型</span>
                  <span className="text-sm">{document.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">文件大小</span>
                  <span className="text-sm">{document.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">分类</span>
                  <Link
                    href={`/documents/categories/${document.category}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {document.category === "tech"
                      ? "技术文档"
                      : document.category === "study"
                        ? "学习资料"
                        : document.category === "project"
                          ? "项目文档"
                          : document.category === "manual"
                            ? "设备手册"
                            : "其他"}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>版本历史</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={document.versions[0].version}>
                <TabsList className="w-full">
                  {document.versions.map((version, index) => (
                    <TabsTrigger key={index} value={version.version} className="flex-1">
                      v{version.version}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {document.versions.map((version, index) => (
                  <TabsContent key={index} value={version.version} className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">版本 {version.version}</h4>
                        <span className="text-xs text-muted-foreground">{version.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{version.description}</p>
                      <Button variant="outline" size="sm" className="gap-1 w-full mt-2">
                        <ArrowDown className="h-4 w-4" />
                        下载此版本
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>相关文档</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents
                  .filter((doc) => doc.id !== document.id)
                  .filter(
                    (doc) => doc.category === document.category || doc.tags.some((tag) => document.tags.includes(tag)),
                  )
                  .slice(0, 3)
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <Link href={`/documents/${doc.id}`} className="text-sm hover:text-primary hover:underline">
                          {doc.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} · {doc.size}
                        </p>
                      </div>
                    </div>
                  ))}
                {documents
                  .filter((doc) => doc.id !== document.id)
                  .filter(
                    (doc) => doc.category === document.category || doc.tags.some((tag) => document.tags.includes(tag)),
                  ).length === 0 && <p className="text-sm text-muted-foreground text-center py-2">暂无相关文档</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
