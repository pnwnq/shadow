'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  FileText,
  BarChart,
  Bell,
  Calendar,
  Users,
  Bot,
  Rocket,
  Beaker,
  MessageSquare,
  UserPlus,
  PlusCircle,
} from 'lucide-react';

interface HomeClientProps {
  user: any;
}

// New component to safely render remaining days on the client
const RemainingDays = ({ deadline }: { deadline: string }) => {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const calculatedDays = Math.ceil(
      (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    setDays(calculatedDays);
  }, [deadline]);

  if (days === null) {
    return <span>计算中...</span>;
  }

  return <span>{days} 天</span>;
};

export function HomeClient({ user }: HomeClientProps) {
  // 模拟数据，因为这些模块还没开发
  const mockProjects = [
    { name: "智能机器人研究", deadline: "2024-12-15", progress: 65 },
    { name: "数据分析竞赛", deadline: "2024-11-30", progress: 40 },
  ]
  const mockNotifications = [
    { title: "项目截止日期提醒", time: "1小时前", icon: <Calendar className="h-4 w-4" /> },
    { title: "新文档已分享给您", time: "3小时前", icon: <FileText className="h-4 w-4" /> },
    { title: "实验室会议安排", time: "昨天", icon: <Users className="h-4 w-4" /> },
  ]
  const mockCourses = [
    { name: "人工智能基础", progress: 75, icon: <Bot className="h-4 w-4" /> },
    { name: "机器学习算法", progress: 45, icon: <Rocket className="h-4 w-4" /> },
    { name: "深度学习应用", progress: 20, icon: <Beaker className="h-4 w-4" /> },
  ]


  return (
    <div className="container mx-auto py-6 px-6">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            欢迎回来, {user.name || '用户'}
          </h1>
          <p className="text-muted-foreground">
            查看您的学习进度、项目状态和最新通知
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>用户概览</CardTitle>
                <CardDescription>您的账户状态和活动摘要</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={user.image || '/abstract-geometric-shapes.png'}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-lg">
                      {user.name || '用户名'}
                    </h3>
                    <Badge>{user.role || '无角色'}</Badge>
                  </div>
                  <div className="space-y-4 md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">文档</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">24</p>
                        <p className="text-xs text-muted-foreground">
                          上周新增 3 份
                        </p>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <BarChart className="h-5 w-5 text-primary" />
                          <span className="font-medium">项目</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">5</p>
                        <p className="text-xs text-muted-foreground">
                          2 个进行中
                        </p>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="font-medium">协作</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">12</p>
                        <p className="text-xs text-muted-foreground">
                          3 个活跃团队
                        </p>
                      </div>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">最近活动</span>
                        <span className="text-xs text-muted-foreground">
                          过去 7 天
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {[40, 25, 35, 45, 60, 75, 50].map((value, i) => (
                          <div key={i} className="flex-1">
                            <div
                              className="bg-primary rounded-full w-full"
                              style={{ height: `${value}px` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>周一</span>
                        <span>周二</span>
                        <span>周三</span>
                        <span>周四</span>
                        <span>周五</span>
                        <span>周六</span>
                        <span>周日</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>项目概览</CardTitle>
                    <CardDescription>
                      您参与的研究项目和竞赛
                    </CardDescription>
                  </div>
                  <Link href="/projects">
                    <Button variant="outline" size="sm">
                      查看全部
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="active">进行中</TabsTrigger>
                    <TabsTrigger value="upcoming">即将开始</TabsTrigger>
                    <TabsTrigger value="completed">已完成</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active" className="space-y-4">
                    {mockProjects.map((project, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{project.name}</h3>
                          <Badge variant="outline">
                            截止日期: {project.deadline}
                          </Badge>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>进度: {project.progress}%</span>
                          <span>
                            剩余时间: <RemainingDays deadline={project.deadline} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Rocket className="mr-2 h-4 w-4" />
                  创建新项目
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>通知</CardTitle>
                    <CardDescription>您有 {mockNotifications.length} 条未读通知</CardDescription>
                  </div>
                  <Link href="/notifications">
                    <Button variant="outline" size="sm">
                      查看全部
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.map((notification, i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="bg-primary/10 p-2 rounded-full">{notification.icon}</div>
                      <div className="space-y-1">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  标记全部为已读
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>学习路径</CardTitle>
                    <CardDescription>
                      您的个性化学习计划和进度
                    </CardDescription>
                  </div>
                  <Link href="/learning">
                    <Button variant="outline" size="sm">
                      查看全部
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourses.map((course, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {course.icon}
                          <span className="font-medium">{course.name}</span>
                        </div>
                        <Badge variant="outline">{course.progress}%</Badge>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          已完成 {Math.round((course.progress / 100) * 5)} / 5
                          单元
                        </span>
                        <span>
                          预计完成时间:{' '}
                          {new Date(
                            Date.now() +
                            (100 - course.progress) * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  继续学习
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 