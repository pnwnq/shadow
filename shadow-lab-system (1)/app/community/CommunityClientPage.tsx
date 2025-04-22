"use client"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PostCard } from "@/components/post-card"
import { useToast } from "@/components/ui/use-toast"

// 模拟数据
const posts = [
  {
    id: "1",
    title: "Arduino入门实践：从零开始的智能小车项目",
    content:
      "本文将详细介绍如何使用Arduino开发板制作一个简单的智能小车，包括硬件连接、代码编写和调试过程。通过这个项目，初学者可以快速掌握Arduino的基本使用方法和电机控制原理。",
    author: {
      id: "zhangsan",
      name: "张三",
      avatar: "ZS",
    },
    date: "2024-04-20 10:30",
    tags: ["Arduino", "智能小车", "入门教程"],
    likes: 24,
    comments: 8,
    views: 156,
  },
  {
    id: "2",
    title: "PCB设计经验分享：常见错误与解决方案",
    content:
      "在PCB设计过程中，初学者常常会遇到各种问题。本文总结了我在设计过程中遇到的常见错误和解决方案，包括布线技巧、元件布局、信号完整性等方面的经验，希望能帮助大家避免这些坑。",
    author: {
      id: "lisi",
      name: "李四",
      avatar: "LS",
    },
    date: "2024-04-19 15:45",
    tags: ["PCB设计", "经验分享", "问题解决"],
    likes: 36,
    comments: 12,
    views: 203,
  },
  {
    id: "3",
    title: "树莓派实现环境监测系统：从硬件到云端",
    content:
      "本文介绍如何使用树莓派和各种传感器构建一个完整的环境监测系统，包括温湿度、光照、空气质量等数据的采集，以及如何将数据上传到云端进行可视化和分析。这个项目适合有一定基础的同学尝试。",
    author: {
      id: "wangwu",
      name: "王五",
      avatar: "WW",
    },
    date: "2024-04-18 09:15",
    tags: ["树莓派", "传感器", "物联网"],
    likes: 18,
    comments: 5,
    views: 142,
  },
]

export default function CommunityClientPage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleCreatePost = () => {
    router.push("/community/posts/create")
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">社区交流</h1>
        <div className="flex items-center gap-2">
          <Button className="gap-1" onClick={handleCreatePost}>
            <Plus className="h-4 w-4" />
            发布博客
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="md:w-1/4 lg:w-1/5 space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 font-semibold">分类</h2>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start font-normal">
                全部
              </Button>
              <Button variant="ghost" className="w-full justify-start font-normal">
                技术分享
              </Button>
              <Button variant="ghost" className="w-full justify-start font-normal">
                项目展示
              </Button>
              <Button variant="ghost" className="w-full justify-start font-normal">
                学习心得
              </Button>
              <Button variant="ghost" className="w-full justify-start font-normal">
                活动通知
              </Button>
              <Button variant="ghost" className="w-full justify-start font-normal">
                问题讨论
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 font-semibold">热门标签</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-full">
                单片机
              </Badge>
              <Badge variant="outline" className="rounded-full">
                Arduino
              </Badge>
              <Badge variant="outline" className="rounded-full">
                PCB设计
              </Badge>
              <Badge variant="outline" className="rounded-full">
                树莓派
              </Badge>
              <Badge variant="outline" className="rounded-full">
                传感器
              </Badge>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 font-semibold">活跃成员</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Link href="/community/members/zhangsan" className="flex items-center gap-2 text-sm hover:text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">ZS</div>
                  <div>
                    <p className="font-medium">张三</p>
                    <p className="text-xs text-muted-foreground">发表了 15 篇博客</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/community/members/lisi" className="flex items-center gap-2 text-sm hover:text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">LS</div>
                  <div>
                    <p className="font-medium">李四</p>
                    <p className="text-xs text-muted-foreground">发表了 12 篇博客</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/community/members/wangwu" className="flex items-center gap-2 text-sm hover:text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">WW</div>
                  <div>
                    <p className="font-medium">王五</p>
                    <p className="text-xs text-muted-foreground">发表了 8 篇博客</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="mt-3 text-center">
              <Link href="/community/members" className="text-xs text-primary hover:underline">
                查看全部成员
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-3/4 lg:w-4/5 space-y-4">
          <Tabs defaultValue="latest" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="latest">最新</TabsTrigger>
              <TabsTrigger value="popular">热门</TabsTrigger>
              <TabsTrigger value="following">关注</TabsTrigger>
              <TabsTrigger value="my">我的博客</TabsTrigger>
            </TabsList>
            <TabsContent value="latest" className="mt-4 space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>
            <TabsContent value="popular" className="mt-4 space-y-4">
              {posts
                .sort((a, b) => b.views - a.views)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </TabsContent>
            <TabsContent value="following" className="mt-4">
              <Card className="flex h-40 items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <p className="text-muted-foreground">您还没有关注任何人</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/community/members">浏览成员</Link>
                  </Button>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="my" className="mt-4">
              <Card className="flex h-40 items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <p className="text-muted-foreground">您还没有发布任何博客</p>
                  <Button size="sm" onClick={handleCreatePost}>
                    发布第一篇博客
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
