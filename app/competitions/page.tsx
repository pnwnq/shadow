"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronDown, ExternalLink, Filter, Globe, Plus, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// 模拟竞赛数据
const competitions = [
  {
    id: "1",
    title: "2024年全国大学生智能车竞赛",
    description:
      "全国大学生智能车竞赛是教育部高等教育司发起的大学生科技竞赛，旨在激发学生对工程实践的兴趣，培养学生的创新能力、协作精神和解决复杂工程问题的综合能力。",
    status: "进行中",
    level: "国家级",
    organizer: "教育部高等教育司",
    website: "https://www.smartcar.org.cn",
    startDate: "2024-03-01",
    registrationDeadline: "2024-04-15",
    competitionDate: "2024-07-15",
    endDate: "2024-07-30",
    location: "上海交通大学",
    progress: 45,
    members: 8,
    projects: 2,
  },
  {
    id: "2",
    title: "2024年全国大学生电子设计竞赛",
    description:
      "全国大学生电子设计竞赛是教育部高等教育司和工业和信息化部联合举办的全国性大学生学科竞赛，旨在推动高等学校电子信息类专业教学改革，提高学生的创新能力和工程实践能力。",
    status: "报名中",
    level: "省级",
    organizer: "教育部高等教育司、工业和信息化部",
    website: "https://www.nuedc.com.cn",
    startDate: "2024-06-01",
    registrationDeadline: "2024-05-15",
    competitionDate: "2024-08-01",
    endDate: "2024-08-15",
    location: "待定",
    progress: 20,
    members: 5,
    projects: 1,
  },
  {
    id: "3",
    title: "RoboMaster 2024机甲大师赛",
    description:
      "RoboMaster是由大疆创新发起的国际机器人竞赛，旨在为全球科技爱好者提供一个激烈角逐的舞台，培养工程师的实战能力和团队协作精神。",
    status: "筹备中",
    level: "国际级",
    organizer: "大疆创新科技有限公司",
    website: "https://www.robomaster.com",
    startDate: "2024-05-01",
    registrationDeadline: "2024-06-15",
    competitionDate: "2024-08-10",
    endDate: "2024-08-20",
    location: "深圳",
    progress: 10,
    members: 12,
    projects: 3,
  },
  {
    id: "4",
    title: "中国机器人大赛暨RoboCup公开赛",
    description:
      "中国机器人大赛暨RoboCup公开赛是中国自动化学会主办的全国性机器人赛事，包括机器人足球、机器人服务、机器人救援等多个项目。",
    status: "已结束",
    level: "国家级",
    organizer: "中国自动化学会",
    website: "http://www.robotchina.org",
    startDate: "2023-10-01",
    registrationDeadline: "2023-11-15",
    competitionDate: "2023-12-10",
    endDate: "2023-12-15",
    location: "北京",
    progress: 100,
    members: 10,
    projects: 2,
  },
]

// 官方竞赛网站信息
const officialWebsites = [
  {
    id: "1",
    name: "全国大学生智能车竞赛",
    url: "https://www.smartcar.org.cn",
    description: "全国大学生智能车竞赛官方网站，提供竞赛规则、通知公告、历届赛事信息等。",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "全国大学生电子设计竞赛",
    url: "https://www.nuedc.com.cn",
    description: "全国大学生电子设计竞赛官方网站，包含竞赛通知、赛题发布、获奖名单等信息。",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "RoboMaster机甲大师赛",
    url: "https://www.robomaster.com",
    description: "RoboMaster官方网站，提供赛事规则、报名信息、技术资料和直播回放等内容。",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "中国机器人大赛",
    url: "http://www.robotchina.org",
    description: "中国机器人大赛官方网站，包含各项赛事规则、报名通道、历届回顾等信息。",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "中国工程机器人大赛",
    url: "http://www.cers-competition.org",
    description: "中国工程机器人大赛官方网站，提供竞赛规则、技术资料和报名信息等。",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export default function CompetitionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  // 过滤竞赛
  const filteredCompetitions = competitions.filter((competition) => {
    const matchesSearch = competition.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || competition.status === statusFilter
    const matchesLevel = levelFilter === "all" || competition.level === levelFilter
    return matchesSearch && matchesStatus && matchesLevel
  })

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">竞赛管理</h1>
          <p className="text-muted-foreground">管理和参与机器人相关竞赛</p>
        </div>
        <Button asChild>
          <Link href="/competitions/new">
            <Plus className="mr-2 h-4 w-4" />
            创建竞赛
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="competitions" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="competitions">竞赛列表</TabsTrigger>
          <TabsTrigger value="websites">官方网站</TabsTrigger>
        </TabsList>

        <TabsContent value="competitions" className="mt-6 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索竞赛..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("报名中")}>报名中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("筹备中")}>筹备中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("已结束")}>已结束</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  级别
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLevelFilter("all")}>全部</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLevelFilter("国际级")}>国际级</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLevelFilter("国家级")}>国家级</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLevelFilter("省级")}>省级</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLevelFilter("校级")}>校级</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompetitions.length > 0 ? (
              filteredCompetitions.map((competition) => (
                <Card key={competition.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          competition.status === "进行中"
                            ? "default"
                            : competition.status === "报名中"
                              ? "secondary"
                              : competition.status === "筹备中"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {competition.status}
                      </Badge>
                      <Badge variant="outline">{competition.level}</Badge>
                    </div>
                    <CardTitle className="mt-2 text-xl">{competition.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{competition.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {competition.startDate} 至 {competition.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>参与成员: {competition.members}人</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={competition.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          官方网站
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">进度</span>
                          <span>{competition.progress}%</span>
                        </div>
                        <Progress value={competition.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full" asChild>
                      <Link href={`/competitions/${competition.id}`}>查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex h-40 items-center justify-center rounded-lg border p-8 text-center">
                <div className="space-y-2">
                  <p className="text-muted-foreground">未找到符合条件的竞赛</p>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSearchQuery("")
                      setStatusFilter("all")
                      setLevelFilter("all")
                    }}
                  >
                    重置筛选条件
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="websites" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {officialWebsites.map((website) => (
              <Card key={website.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <img src={website.logo || "/placeholder.svg"} alt={website.name} className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg">{website.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <CardDescription className="line-clamp-3">{website.description}</CardDescription>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      访问官方网站
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
