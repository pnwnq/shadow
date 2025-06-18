import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Users, Award, Rocket, BookOpen, Code, Cpu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/welcome">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">关于我们</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Shadow 机器人实验室简介</h2>
          <p className="mb-4 text-muted-foreground">
            Shadow
            机器人实验室成立于2015年，是一个致力于机器人技术研发与创新的学生科研组织。我们的使命是培养学生的创新能力和工程实践能力，推动机器人技术在各个领域的应用与发展。
          </p>
          <p className="mb-4 text-muted-foreground">
            实验室现有成员50余人，包括本科生、研究生和指导教师。我们拥有完善的硬件设施和软件平台，为成员提供良好的研发环境和技术支持。
          </p>
          <p className="text-muted-foreground">
            我们鼓励跨学科合作，成员来自计算机科学、电子工程、机械工程、自动化等多个专业，共同探索机器人技术的前沿领域。
          </p>
        </div>
        <div className="rounded-lg bg-slate-100 p-6">
          <div className="aspect-video overflow-hidden rounded-lg bg-gray-200">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="实验室照片"
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-2xl font-semibold">我们的优势</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">专业指导</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                拥有多位机器人领域专家教授提供学术指导，确保研究方向的前沿性和科学性。
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">竞赛成果</CardTitle>
              <Award className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                在RoboMaster、RoboCup、中国机器人大赛等国内外重要赛事中屡获佳绩。
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">创新项目</CardTitle>
              <Rocket className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                承担多项国家级、省级创新项目，研发成果已应用于多个实际场景。
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-2xl font-semibold">研究方向</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">机器人感知</CardTitle>
              <BookOpen className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                计算机视觉、激光雷达感知、多传感器融合、环境理解与建模等。
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">智能控制</CardTitle>
              <Code className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                运动规划、轨迹优化、自适应控制、强化学习控制等。
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">机器人系统</CardTitle>
              <Cpu className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                机械设计、电子系统、嵌入式开发、ROS系统开发等。
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-2xl font-semibold">加入我们</h2>
        <div className="rounded-lg bg-slate-50 p-8 text-center">
          <p className="mb-6 text-lg text-muted-foreground">
            我们欢迎对机器人技术充满热情的同学加入Shadow实验室大家庭！
            <br />
            每年9月和3月，我们会举办实验室招新活动，敬请关注。
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">联系我们</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
