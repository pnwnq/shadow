import type { Metadata } from "next"
import { ChevronDown, Clock, FolderKanban, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "项目管理 | Shadow 实验室管理系统",
  description: "Shadow 实验室管理系统项目管理页面",
}

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">项目管理</h1>
          <div className="flex items-center gap-2">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              创建项目
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">全部项目</TabsTrigger>
            <TabsTrigger value="my">我的项目</TabsTrigger>
            <TabsTrigger value="active">进行中</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className="mb-1">进行中</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">操作</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>编辑项目</DropdownMenuItem>
                        <DropdownMenuItem>添加任务</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">删除项目</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-base">智能家居系统</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">进度</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>截止日期: 2024-06-30</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex -space-x-2">
                    <Avatar className="border-2 border-background h-7 w-7">
                      <AvatarFallback>ZS</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background h-7 w-7">
                      <AvatarFallback>LS</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background h-7 w-7">
                      <AvatarFallback>WW</AvatarFallback>
                    </Avatar>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FolderKanban className="h-4 w-4" />
                    任务
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className="mb-1">进行中</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">操作</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>编辑项目</DropdownMenuItem>
                        <DropdownMenuItem>添加任务</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">删除项目</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-base">环境监测站</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">进度</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>截止日期: 2024-07-15</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex -space-x-2">
                    <Avatar className="border-2 border-background h-7 w-7">
                      <AvatarFallback>ZL</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background h-7 w-7">
                      <AvatarFallback>WL</AvatarFallback>
                    </Avatar>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FolderKanban className="h-4 w-4" />
                    任务
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-1">
                      已完成
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">操作</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>编辑项目</DropdownMenuItem>
                        <DropdownMenuItem>添加任务</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">删除项目</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-base">智能小车</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">进度</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>完成日期: 2024-03-20</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex -space-x-2">
                    <Avatar className="border-2 border-background h-7 w-7">
                      <AvatarFallback>ZS</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background h-7 w-7">
                      <AvatarFallback>LS</AvatarFallback>
                    </Avatar>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FolderKanban className="h-4 w-4" />
                    任务
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
