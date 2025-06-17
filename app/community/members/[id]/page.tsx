"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Github, Mail, MessageSquare, Phone, ThumbsUp, Users } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// 模拟数据
const member = {
  id: "zhangsan",
  name: "张三",
  avatar: "ZS",
  role: "管理员",
  online: true,
  major: "电子工程",
  grade: "2020级",
  studentId: "2020123456",
  joinDate: "2022-09-01",
  bio: "电子工程专业学生，对单片机和嵌入式系统开发有浓厚兴趣。擅长Arduino和PCB设计，曾参与多个智能硬件项目的开发。希望在实验室中不断学习和成长，与志同道合的伙伴一起探索电子世界的奥秘。",
  contact: {
    email: "zhangsan@example.com",
    phone: "138****1234",
    wechat: "zhangsan_wx",
    qq: "123456789",
    github: "github.com/zhangsan",
  },
  skills: [
    { name: "Arduino开发", level: "精通", percentage: 90 },
    { name: "PCB设计", level: "熟练", percentage: 80 },
    { name: "单片机编程", level: "熟练", percentage: 75 },
    { name: "电路设计", level: "良好", percentage: 65 },
  ],
  posts: [
    {
      id: "1",
      title: "Arduino入门实践：从零开始的智能小车项目",
      date: "2024-04-20 10:30",
      content:
        "本文将详细介绍如何使用Arduino开发板制作一个简单的智能小车，包括硬件连接、代码编写和调试过程。通过这个项目，初学者可以快速掌握Arduino的基本使用方法和电机控制原理。",
      likes: 24,
      comments: 8,
    },
    {
      id: "4",
      title: "单片机中断处理详解：原理与实践",
      date: "2024-04-10 14:15",
      content:
        "中断是单片机编程中非常重要的概念，本文将深入讲解中断的工作原理、优先级设置、中断向量表等概念，并通过实例演示如何在实际项目中正确使用中断来提高系统响应速度和效率。",
      likes: 32,
      comments: 15,
    },
    {
      id: "7",
      title: "PCB布线技巧：如何设计高质量的电路板",
      date: "2024-03-25 09:45",
      content:
        "PCB布线是电路设计中的关键环节，本文将分享一些实用的PCB布线技巧，包括电源和地平面的处理、信号线的布局、阻抗控制等内容，帮助你设计出更加稳定可靠的电路板。",
      likes: 45,
      comments: 20,
    },
  ],
  friendStatus: "none", // none, pending, friends
}

export default function MemberProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [friendStatus, setFriendStatus] = useState(member.friendStatus)

  const handleFriendAction = () => {
    if (friendStatus === "none") {
      setFriendStatus("pending")
      toast({
        title: "好友请求已发送",
        description: "等待对方确认",
      })
    } else if (friendStatus === "pending") {
      setFriendStatus("none")
      toast({
        title: "已取消好友请求",
        description: "您已取消发送给该用户的好友请求",
      })
    } else if (friendStatus === "friends") {
      setFriendStatus("none")
      toast({
        title: "已取消好友关系",
        description: "您已成功取消与该用户的好友关系",
      })
    }
  }

  const handleSendMessage = () => {
    toast({
      title: "消息功能",
      description: "私信功能即将上线，敬请期待！",
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="mb-6">
          <Link
            href="/community/members"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            返回成员列表
          </Link>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <div className="relative rounded-xl bg-muted/50 p-6">
              <div className="absolute right-6 top-6 flex gap-2">
                <Badge>{member.role}</Badge>
                <Badge variant="outline" className={member.online ? "text-green-500" : "text-red-500"}>
                  {member.online ? "在线" : "离线"}
                </Badge>
              </div>
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center md:text-left">
                  <h1 className="text-2xl font-bold">{member.name}</h1>
                  <p className="text-muted-foreground">
                    {member.major} / {member.grade}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                    {member.skills.map((skill) => (
                      <Badge key={skill.name} variant="secondary" className="rounded-full">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" onClick={handleSendMessage}>
                    <MessageSquare className="h-4 w-4" />
                    发送消息
                  </Button>
                  <Button
                    variant={friendStatus === "friends" ? "destructive" : "outline"}
                    size="sm"
                    className="gap-1"
                    onClick={handleFriendAction}
                  >
                    <Users className="h-4 w-4" />
                    {friendStatus === "none" ? "添加好友" : friendStatus === "pending" ? "取消请求" : "取消好友"}
                  </Button>
                </div>
              </div>
            </div>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="profile">个人资料</TabsTrigger>
                <TabsTrigger value="posts">发布的博客</TabsTrigger>
                <TabsTrigger value="projects">参与的项目</TabsTrigger>
                <TabsTrigger value="friends">好友列表</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>基本信息</CardTitle>
                    <CardDescription>成员的基本个人信息</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">姓名</p>
                        <p>{member.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">学号</p>
                        <p>{member.studentId}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">专业</p>
                        <p>{member.major}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">年级</p>
                        <p>{member.grade}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">角色</p>
                        <p>{member.role}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">加入时间</p>
                        <p>{member.joinDate}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">个人简介</p>
                      <p className="text-sm">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>联系方式</CardTitle>
                    <CardDescription>成员的联系信息</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground">邮箱</p>
                        <p>{member.contact.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground">电话</p>
                        <p>{member.contact.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-muted-foreground"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.87 10.87C9.56 10.56 9.4 10.17 9.4 9.76C9.4 9.35 9.56 8.95 9.88 8.64C10.19 8.33 10.59 8.17 11 8.17C11.41 8.17 11.8 8.33 12.11 8.64C12.42 8.95 12.58 9.35 12.58 9.76C12.58 10.17 12.42 10.56 12.11 10.87C11.8 11.18 11.41 11.34 11 11.34C10.59 11.34 10.18 11.18 9.87 10.87Z"
                            fill="currentColor"
                          />
                          <path
                            d="M16.31 15.66L12.58 19.3C12.21 19.67 11.61 19.67 11.24 19.3L7.51 15.66C4.92 13.12 4.92 8.88 7.51 6.34C8.73 5.15 10.33 4.5 12 4.5C13.67 4.5 15.27 5.15 16.49 6.34C19.08 8.88 19.08 13.12 16.31 15.66Z"
                            fill="currentColor"
                          />
                        </svg>
                        <p className="text-sm font-medium text-muted-foreground">微信</p>
                        <p>{member.contact.wechat}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-muted-foreground"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                            fill="currentColor"
                          />
                        </svg>
                        <p className="text-sm font-medium text-muted-foreground">QQ</p>
                        <p>{member.contact.qq}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground">GitHub</p>
                        <Link href={`https://${member.contact.github}`} className="text-primary hover:underline">
                          {member.contact.github}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>技能与专长</CardTitle>
                    <CardDescription>成员的技术专长和技能</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {member.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{skill.name}</p>
                          <p className="text-sm text-muted-foreground">{skill.level}</p>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${skill.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="posts" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>发布的博客</CardTitle>
                    <CardDescription>成员发布的博客文章</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {member.posts.map((post) => (
                        <div key={post.id} className="rounded-lg border p-4">
                          <h3 className="text-lg font-medium">
                            <Link href={`/community/posts/${post.id}`} className="hover:underline">
                              {post.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">发布于 {post.date}</p>
                          <p className="mt-2 text-sm line-clamp-2">{post.content}</p>
                          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="projects" className="mt-4">
                <Card className="flex h-40 items-center justify-center p-8 text-center">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">暂无项目信息</p>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="friends" className="mt-4">
                <Card className="flex h-40 items-center justify-center p-8 text-center">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">暂无好友信息</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/community/friends">查看我的好友</Link>
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
