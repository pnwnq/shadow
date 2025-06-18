import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trophy, Calendar, Users, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/welcome">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">成果展示</h1>
      </div>

      <Tabs defaultValue="competitions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="competitions">竞赛成果</TabsTrigger>
          <TabsTrigger value="projects">创新项目</TabsTrigger>
        </TabsList>

        <TabsContent value="competitions" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {competitions.map((competition, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <Image
                    src={competition.image || "/placeholder.svg"}
                    alt={competition.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-normal">
                      {competition.year}
                    </Badge>
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  </div>
                  <CardTitle className="text-lg">{competition.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <CardDescription>{competition.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-3 w-3" />
                  <span>{competition.team}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-normal">
                      {project.status}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{project.period}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{project.description}</CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-3 w-3" />
                    <span>{project.team}</span>
                  </div>
                  {project.link && (
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" asChild>
                      <Link href={project.link}>
                        <span>项目详情</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// 示例数据
const competitions = [
  {
    title: "RoboMaster 2023 全国大学生机器人大赛",
    description: "获得区域赛一等奖，全国赛二等奖，技术挑战赛特等奖",
    year: "2023",
    team: "Shadow战队",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "中国机器人大赛暨RoboCup公开赛",
    description: "获得仿真组冠军，实物组亚军",
    year: "2022",
    team: "Shadow机器人团队",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "全国大学生智能车竞赛",
    description: "获得全国一等奖，最佳创新奖",
    year: "2023",
    team: "Shadow智能车队",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "国际水下机器人大赛",
    description: "获得亚太区域赛冠军，国际赛三等奖",
    year: "2022",
    team: "Shadow水下机器人团队",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "全国大学生机械创新设计大赛",
    description: "获得全国特等奖，最佳设计奖",
    year: "2023",
    team: "Shadow创新设计团队",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "中国研究生机器人创新设计大赛",
    description: "获得全国一等奖，最佳技术创新奖",
    year: "2022",
    team: "Shadow研究生团队",
    image: "/placeholder.svg?height=225&width=400",
  },
]

const projects = [
  {
    title: "四足机器人自主导航与环境感知系统",
    description: "开发基于视觉-惯性融合的四足机器人自主导航系统，实现复杂环境下的稳定行走和障碍物避障",
    status: "已完成",
    period: "2022-2023",
    team: "感知与控制组",
    tags: ["四足机器人", "SLAM", "视觉感知", "路径规划"],
    link: "/projects/1",
  },
  {
    title: "机器人协同作业系统",
    description: "研发多机器人协同作业系统，实现多台机器人在仓储物流场景中的任务分配与协同工作",
    status: "进行中",
    period: "2023-2024",
    team: "系统集成组",
    tags: ["多机器人协同", "任务规划", "分布式控制", "仓储物流"],
    link: "/projects/2",
  },
  {
    title: "基于深度学习的机器人抓取系统",
    description: "开发基于深度学习的视觉感知系统，实现对未知物体的识别与精准抓取",
    status: "已完成",
    period: "2021-2022",
    team: "机器视觉组",
    tags: ["深度学习", "机器视觉", "机械臂控制", "抓取规划"],
    link: "/projects/3",
  },
  {
    title: "水下机器人自主探测系统",
    description: "开发水下机器人自主探测系统，实现水下环境的三维重建与目标识别",
    status: "进行中",
    period: "2023-2024",
    team: "水下机器人组",
    tags: ["水下机器人", "声呐感知", "水下定位", "环境重建"],
    link: "/projects/4",
  },
]
