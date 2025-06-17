"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronLeft, MessageSquare, Share2, ThumbsUp } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// 模拟数据
const post = {
  id: "1",
  title: "Arduino入门实践：从零开始的智能小车项目",
  content: `
    <p>本文将详细介绍如何使用Arduino开发板制作一个简单的智能小车，包括硬件连接、代码编写和调试过程。通过这个项目，初学者可以快速掌握Arduino的基本使用方法和电机控制原理。</p>
    <h2>项目概述</h2>
    <p>我们将使用Arduino Uno开发板、L298N电机驱动模块、两个直流电机和一些基础电子元件来构建一个能够前进、后退、转弯的简单智能小车。这个项目适合Arduino初学者，只需要基础的电子知识和简单的编程能力。</p>
    <h2>材料准备</h2>
    <ul>
      <li>Arduino Uno开发板 x1</li>
      <li>L298N电机驱动模块 x1</li>
      <li>直流减速电机 x2</li>
      <li>小车底盘 x1</li>
      <li>轮子 x2</li>
      <li>9V电池 x1</li>
      <li>面包板 x1</li>
      <li>杜邦线若干</li>
    </ul>
  `,
  author: {
    id: "zhangsan",
    name: "张三",
    avatar: "ZS",
  },
  date: "2024-04-20 10:30",
  tags: ["Arduino", "智能小车", "入门教程"],
  likes: 24,
  comments: [
    {
      id: "1",
      author: {
        id: "lisi",
        name: "李四",
        avatar: "LS",
      },
      content:
        "非常详细的教程，我按照步骤成功做出了一个小车，谢谢分享！有一个问题，我的小车左转时总是不太灵敏，可能是什么原因呢？",
      date: "2024-04-20 11:15",
      likes: 5,
    },
    {
      id: "2",
      author: {
        id: "zhangsan",
        name: "张三",
        avatar: "ZS",
      },
      content:
        "@李四 可能是左侧电机的功率不足或者连接不良。你可以尝试检查一下电机连接，或者在代码中调整左转时的PWM值，增加左侧电机的功率。",
      date: "2024-04-20 11:30",
      likes: 3,
    },
  ],
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "链接已复制",
      description: "博客链接已复制到剪贴板",
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="mb-6">
          <Link
            href="/community"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            返回社区
          </Link>
        </div>
        <div className="mx-auto max-w-4xl">
          <article className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{post.author.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/community/members/${post.author.id}`} className="font-medium hover:underline">
                      {post.author.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="prose prose-sm max-w-none dark:prose-invert md:prose-base"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="flex items-center gap-4">
              <Button variant={isLiked ? "default" : "outline"} size="sm" className="gap-1" onClick={handleLike}>
                <ThumbsUp className="h-4 w-4" />
                点赞 ({likeCount})
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                分享
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <BookOpen className="h-4 w-4" />
                收藏
              </Button>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">评论 ({post.comments.length})</h3>
              <div className="space-y-4">
                {post.comments.map((comment) => (
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
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-7 gap-1 px-2">
                          <ThumbsUp className="h-3 w-3" />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 gap-1 px-2">
                          <MessageSquare className="h-3 w-3" />
                          <span className="text-xs">回复</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">发表评论</h4>
                <form onSubmit={handleSubmitComment}>
                  <Textarea
                    placeholder="写下你的评论..."
                    className="min-h-[100px]"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" type="submit" disabled={!comment.trim()}>
                      提交评论
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}
