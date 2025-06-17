"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MessageSquare, Star, Reply, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// 模拟讨论数据
const discussionsData = {
  disc1: {
    id: "disc1",
    projectId: "1",
    author: "张三",
    avatar: "/abstract-zs.png",
    date: "2024-04-01",
    content: "我们需要讨论一下温度传感器的选型问题，DHT11的精度可能不够，考虑使用DHT22。",
    replies: [
      {
        id: "reply1",
        author: "李四",
        avatar: "/abstract-geometric-ls.png",
        date: "2024-04-01 14:30",
        content: "我同意，DHT22的精度更高，价格也可以接受。",
      },
      {
        id: "reply2",
        author: "王五",
        avatar: "/double-w-abstract.png",
        date: "2024-04-01 15:45",
        content: "我已经做了一些测试，DHT22在我们的使用场景下表现更好。",
      },
      {
        id: "reply3",
        author: "赵六",
        avatar: "/abstract-geometric-zl.png",
        date: "2024-04-01 16:20",
        content: "我可以负责更新原理图和PCB设计。",
      },
    ],
  },
  disc2: {
    id: "disc2",
    projectId: "1",
    author: "李四",
    avatar: "/abstract-geometric-ls.png",
    date: "2024-04-03",
    content: "APP界面设计已经完成，请大家查看并提出修改意见。",
    replies: [
      {
        id: "reply4",
        author: "张三",
        avatar: "/abstract-zs.png",
        date: "2024-04-03 10:15",
        content: "界面看起来不错，但我建议在首页添加实时数据展示。",
      },
      {
        id: "reply5",
        author: "王五",
        avatar: "/double-w-abstract.png",
        date: "2024-04-03 11:30",
        content: "同意张三的建议，用户需要直观地看到传感器数据。",
      },
    ],
  },
}

export default function DiscussionDetailPage() {
  const { id, discussionId } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 获取讨论数据
  const discussion = discussionsData[discussionId as string]

  if (!discussion) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] p-6">
        <h1 className="text-2xl font-bold mb-4">讨论不存在</h1>
        <p className="text-muted-foreground mb-6">无法找到ID为 {discussionId} 的讨论</p>
        <Button asChild>
          <Link href={`/projects/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回项目
          </Link>
        </Button>
      </div>
    )
  }

  // 处理回复提交
  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: "回复失败",
        description: "回复内容不能为空",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "回复成功",
        description: "您的回复已发布",
      })
      setReplyContent("")

      // 模拟添加新回复
      // 在实际应用中，这里应该是通过API更新数据
    }, 1000)
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
            <BreadcrumbLink href={`/projects/${id}/discussions/${discussionId}`}>讨论详情</BreadcrumbLink>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            讨论详情
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-6">
          <div className="space-y-6">
            {/* 主讨论 */}
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                  <AvatarFallback>{discussion.author.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{discussion.author}</p>
                    <Badge variant="outline">发起人</Badge>
                    <span className="text-sm text-muted-foreground">{discussion.date}</span>
                  </div>
                  <p className="mt-2">{discussion.content}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Star className="h-4 w-4" />
                      收藏
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Reply className="h-4 w-4" />
                      引用
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 回复列表 */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                回复 ({discussion.replies.length})
              </h3>

              {discussion.replies.map((reply) => (
                <div key={reply.id} className="p-4 border rounded-md ml-6">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
                      <AvatarFallback>{reply.author.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{reply.author}</p>
                        <span className="text-xs text-muted-foreground">{reply.date}</span>
                      </div>
                      <p className="mt-1">{reply.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 添加回复 */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium">添加回复</h3>
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>您</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="添加您的回复..."
                    className="min-h-[100px]"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitReply} disabled={isSubmitting} className="gap-1">
                      {isSubmitting ? (
                        <>发送中...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          发送回复
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="outline" asChild className="w-full">
            <Link href={`/projects/${id}`}>返回项目讨论列表</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
