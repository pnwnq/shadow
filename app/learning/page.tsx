import type { Metadata } from "next"
import { BookOpen, ChevronDown, ChevronRight, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "学习路径 | Shadow 实验室管理系统",
  description: "Shadow 实验室管理系统学习路径页面",
}

export default function LearningPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">学习路径</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              推荐学习路径
            </Button>
          </div>
        </div>
        <Tabs defaultValue="paths" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="paths">学习路径</TabsTrigger>
            <TabsTrigger value="resources">学习资源</TabsTrigger>
            <TabsTrigger value="components">元器件指南</TabsTrigger>
            <TabsTrigger value="progress">我的进度</TabsTrigger>
          </TabsList>
          <TabsContent value="paths" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">单片机入门</CardTitle>
                  <CardDescription>适合初学者的单片机学习路径</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">难度</span>
                      <span>初级</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="size-4" />
                      <span>5个模块 · 15个课程</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <span className="text-xs text-muted-foreground">预计学习时间: 4周</span>
                  <Button variant="outline" size="sm" className="gap-1">
                    开始学习
                    <ChevronRight className="size-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">PCB设计基础</CardTitle>
                  <CardDescription>从零开始学习PCB设计</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">难度</span>
                      <span>中级</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="size-4" />
                      <span>4个模块 · 12个课程</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <span className="text-xs text-muted-foreground">预计学习时间: 6周</span>
                  <Button variant="outline" size="sm" className="gap-1">
                    开始学习
                    <ChevronRight className="size-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">传感器应用</CardTitle>
                  <CardDescription>各类传感器的原理与应用</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">难度</span>
                      <span>中级</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="size-4" />
                      <span>6个模块 · 18个课程</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <span className="text-xs text-muted-foreground">预计学习时间: 8周</span>
                  <Button variant="outline" size="sm" className="gap-1">
                    开始学习
                    <ChevronRight className="size-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="resources" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">单片机编程教程</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="size-4" />
                    <span>PDF · 2.4 MB</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <span className="text-xs text-muted-foreground">上传于 2024-03-15</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="size-4" />
                        <span className="sr-only">操作</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>查看</DropdownMenuItem>
                      <DropdownMenuItem>下载</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>添加到收藏</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Arduino视频教程</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="size-4" />
                    <span>视频 · 10集</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <span className="text-xs text-muted-foreground">上传于 2024-02-20</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="size-4" />
                        <span className="sr-only">操作</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>查看</DropdownMenuItem>
                      <DropdownMenuItem>下载</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>添加到收藏</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">PCB设计实战</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="size-4" />
                    <span>PDF · 5.2 MB</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <span className="text-xs text-muted-foreground">上传于 2024-01-10</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="size-4" />
                        <span className="sr-only">操作</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>查看</DropdownMenuItem>
                      <DropdownMenuItem>下载</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>添加到收藏</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="progress" className="mt-4 space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>我的学习进度</CardTitle>
                  <CardDescription>当前学习路径和完成情况</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">单片机入门</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">PCB设计基础</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">传感器应用</span>
                      <span>10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
