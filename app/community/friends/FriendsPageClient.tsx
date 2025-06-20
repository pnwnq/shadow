"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { User } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  UserPlus,
  Users,
  MessageSquare,
  MoreHorizontal,
  UserMinus,
  UserX,
  Clock,
  Share2,
  PlusCircle,
} from "lucide-react"
import Link from "next/link"
import { MemberCard, MemberCardSkeleton } from "@/components/member-card"

export default function FriendsPageClient() {
  const [activeTab, setActiveTab] = useState("friends")
  const [searchQuery, setSearchQuery] = useState("")

  // 模拟好友请求数据
  const friendRequests = [
    {
      id: 101,
      name: "孙八",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "视觉算法工程师",
      department: "计算机视觉组",
      time: "2小时前",
      skills: ["深度学习", "目标检测", "图像分割"],
      projects: ["自动驾驶视觉系统"],
    },
    {
      id: 102,
      name: "周九",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "机器学习工程师",
      department: "AI研究组",
      time: "1天前",
      skills: ["强化学习", "自然语言处理", "神经网络"],
      projects: ["智能对话系统"],
    },
  ]

  // 模拟推荐好友数据
  const recommendedFriends = [
    {
      id: 201,
      name: "吴十",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "控制工程师",
      department: "控制系统组",
      mutualFriends: 3,
      skills: ["PID控制", "状态估计", "轨迹规划"],
      projects: ["四足机器人运动控制"],
      matchScore: 85,
      reason: "在机器人控制领域有丰富经验，与您的四足机器人项目高度相关",
    },
    {
      id: 202,
      name: "郑十一",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "嵌入式工程师",
      department: "嵌入式系统组",
      mutualFriends: 2,
      skills: ["ARM开发", "RTOS", "驱动开发"],
      projects: ["智能传感器网络"],
      matchScore: 78,
      reason: "嵌入式系统专家，可以协助您的硬件项目开发",
    },
    {
      id: 203,
      name: "王十二",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "机器人工程师",
      department: "机器人研究组",
      mutualFriends: 5,
      skills: ["机器人学", "运动规划", "SLAM"],
      projects: ["服务机器人开发"],
      matchScore: 92,
      reason: "在SLAM和导航算法方面有专长，与您的研究方向高度匹配",
    },
  ]

  // 模拟协作机会数据
  const collaborationOpportunities = [
    {
      id: 301,
      title: "四足机器人视觉模块开发",
      initiator: {
        id: 1,
        name: "张三",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "寻找具有计算机视觉经验的合作者，共同开发四足机器人的视觉感知模块",
      skills: ["计算机视觉", "ROS", "深度学习"],
      deadline: "2023-12-15",
      participants: 2,
      maxParticipants: 4,
    },
    {
      id: 302,
      title: "智能家居控制系统",
      initiator: {
        id: 2,
        name: "李四",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "招募软件和硬件开发人员，共同开发基于Arduino的智能家居控制系统",
      skills: ["Arduino", "Web开发", "嵌入式系统"],
      deadline: "2023-12-20",
      participants: 3,
      maxParticipants: 5,
    },
  ]

  const { data: friends = [], isLoading: isLoadingFriends } = useQuery<User[]>({
    queryKey: ["friends"],
    queryFn: async () => {
      const { data } = await axios.get("/api/community/friends")
      return data
    },
    enabled: activeTab === 'friends', // Only fetch when the tab is active
  })

  // 过滤好友列表
  const filteredFriends = friends.filter(
    (friend) =>
      friend.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">好友与协作</h1>
          <p className="text-muted-foreground">管理您的好友和协作伙伴，开展高效协作</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            添加好友
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            创建协作组
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索好友或协作组..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="friends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="friends" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            我的好友
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            协作组
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            好友请求
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingFriends ? (
              Array.from({ length: 3 }).map((_, i) => <MemberCardSkeleton key={i} />)
            ) : filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <MemberCard key={friend.id} member={friend} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">您还没有好友。</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>项目协作组 {i + 1}</CardTitle>
                    <Badge>{i + 3} 成员</Badge>
                  </div>
                  <CardDescription>{["研究项目", "竞赛小组", "学习小组", "实验室管理"][i % 4]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex -space-x-2 overflow-hidden mb-4">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Avatar key={j} className="border-2 border-background">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&query=member-${j + 1}`} />
                        <AvatarFallback>成员</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-medium">
                      +{i}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      进入
                    </Button>
                    <Button size="sm" variant="outline">
                      管理
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>好友请求</CardTitle>
              <CardDescription>您有 {friendRequests.length} 个待处理的好友请求</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                      <AvatarFallback>{request.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{request.name}</h4>
                      <p className="text-sm text-muted-foreground">{request.role}</p>
                      <p className="text-sm text-muted-foreground mt-1">{request.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">接受</Button>
                    <Button size="sm" variant="outline">
                      拒绝
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
