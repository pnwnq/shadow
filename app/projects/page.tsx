"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, ChevronDown, Filter, Plus, Search, Trophy, Users } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 模拟项目数据
const projects = [
  {
    id: "1",
    title: "智能家居系统",
    description:
      "基于Arduino和ESP8266的智能家居控制系统，实现灯光、温度、湿度等环境参数的监控和控制。该项目旨在为实验室成员提供物联网开发实践的机会，同时打造一个可用于日常生活的智能家居解决方案。",
    status: "进行中",
    progress: 65,
    startDate: "2024-03-15",
    endDate: "2024-06-30",
    leader: {
      id: "zhangsan",
      name: "张三",
      avatar: "ZS",
    },
    members: 3,
    tasks: 7,
    awards: [{ id: "award1", title: "校级创新项目一等奖", date: "2023-12" }],
  },
  {
    id: "2",
    title: "环境监测站",
    description: "使用多种传感器采集环境数据，并通过无线网络传输到云端进行分析和可视化。",
    status: "进行中",
    progress: 40,
    startDate: "2024-04-01",
    endDate: "2024-07-15",
    leader: {
      id: "lisi",
      name: "李四",
      avatar: "LS",
    },
    members: 2,
    tasks: 5,
    awards: [],
  },
  {
    id: "3",
    title: "四足机器人",
    description: "开发一款四足机器人，实现复杂地形的自主行走和障碍物避障功能。",
    status: "规划中",
    progress: 10,
    startDate: "2024-05-01",
    endDate: "2024-09-30",
    leader: {
      id: "wangwu",
      name: "王五",
      avatar: "WW",
    },
    members: 4,
    tasks: 10,
    awards: [],
  },
  {
    id: "4",
    title: "视觉SLAM导航系统",
    description: "基于视觉SLAM技术的室内导航系统，可用于机器人自主定位和路径规划。",
    status: "已完成",
    progress: 100,
    startDate: "2023-10-01",
    endDate: "2024-02-28",
    leader: {
      id: "zhangsan",
      name: "张三",
      avatar: "ZS",
    },
    members: 3,
    tasks: 8,
    awards: [
      { id: "award2", title: "省级科技创新二等奖", date: "2024-03" },
      { id: "award3", title: "校级优秀项目", date: "2024-01" },
    ],
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [joinedProjects, setJoinedProjects] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("my-projects")

  const searchParams = useSearchParams()
  const { toast } = useToast()

  // 假设当前用户ID为 "zhangsan"，用于模拟"我参与的项目"
  const currentUserId = "zhangsan"

  useEffect(() => {
    const joined = searchParams.get("joined")
    const projectId = searchParams.get("projectId")

    if (joined === "true" && projectId) {
      const project = projects.find((p) => p.id === projectId)
      if (project && !joinedProjects.includes(projectId)) {
        setJoinedProjects((prev) => [...prev, projectId])
        toast({
          title: "项目加入成功",
          description: `您已成功加入"${project.title}"项目`,
        })
      }
    }
  }, [searchParams, joinedProjects])

  // 过滤项目
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter

    // 根据当前选中的标签过滤项目
    const matchesTab =
      activeTab === "all-projects" ||
      (activeTab === "my-projects" && (project.leader.id === currentUserId || joinedProjects.includes(project.id)))

    return matchesSearch && matchesStatus && matchesTab
  })

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">项目管理</h1>
          <p className="text-muted-foreground">管理和参与机器人相关项目</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/certificates">
              <Trophy className="mr-2 h-4 w-4" />
              项目奖项
            </Link>
          </Button>
          <Button asChild>
            <Link href="/projects/create">
              <Plus className="mr-2 h-4 w-4" />
              创建项目
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-projects" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="my-projects">我参与的项目</TabsTrigger>
          <TabsTrigger value="all-projects">实验室所有项目</TabsTrigger>
        </TabsList>

        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索项目..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                状态
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>全部</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("进行中")}>进行中</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("规划中")}>规划中</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("已完成")}>已完成</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <TabsContent value="my-projects" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge
                          variant={
                            project.status === "进行中"
                              ? "default"
                              : project.status === "规划中"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                        {joinedProjects.includes(project.id) && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            新加入
                          </Badge>
                        )}
                        {project.leader.id === currentUserId && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            负责人
                          </Badge>
                        )}
                      </div>
                      {project.awards.length > 0 && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {project.awards.length}项奖励
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="mt-2 text-xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {project.startDate} 至 {project.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          成员: {project.members}人 / 任务: {project.tasks}个
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">{project.leader.avatar}</AvatarFallback>
                        </Avatar>
                        <span>负责人: {project.leader.name}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">进度</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full" asChild>
                      <Link href={`/projects/${project.id}`}>查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex h-40 items-center justify-center rounded-lg border p-8 text-center">
                <div className="space-y-2">
                  <p className="text-muted-foreground">您尚未参与任何项目</p>
                  <Button asChild size="sm">
                    <Link href="/projects/join">加入项目</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all-projects" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge
                          variant={
                            project.status === "进行中"
                              ? "default"
                              : project.status === "规划中"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                        {project.leader.id === currentUserId && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            负责人
                          </Badge>
                        )}
                        {joinedProjects.includes(project.id) && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            已加入
                          </Badge>
                        )}
                      </div>
                      {project.awards.length > 0 && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {project.awards.length}项奖励
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="mt-2 text-xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {project.startDate} 至 {project.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          成员: {project.members}人 / 任务: {project.tasks}个
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">{project.leader.avatar}</AvatarFallback>
                        </Avatar>
                        <span>负责人: {project.leader.name}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">进度</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    {joinedProjects.includes(project.id) || project.leader.id === currentUserId ? (
                      <Button className="w-full" asChild>
                        <Link href={`/projects/${project.id}`}>查看详情</Link>
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" asChild>
                        <Link href={`/projects/join?projectId=${project.id}`}>申请加入</Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex h-40 items-center justify-center rounded-lg border p-8 text-center">
                <div className="space-y-2">
                  <p className="text-muted-foreground">未找到符合条件的项目</p>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSearchQuery("")
                      setStatusFilter("all")
                    }}
                  >
                    重置筛选条件
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
