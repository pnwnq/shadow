"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  BarChart3,
  FileText,
  Lock,
  Settings,
  Shield,
  Users,
  Zap,
  Bell,
  Package,
  CreditCard,
  Trophy,
  BookOpen,
  MessageSquare,
  Home,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { UsersTable } from "./components/users-table"
import LogsTable from "./components/logs-table"
import { SecuritySettings } from "./components/security-settings"
import { GeneralSettings } from "./components/general-settings"

interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  roleDistribution: { role: string; count: number }[];
  systemLoad: number;
  storageUsage: number;
}

const roleDisplayName: { [key: string]: string } = {
  SUPER_ADMIN: "超级管理员",
  ADMIN: "管理员",
  MEMBER: "实验室成员",
  COMPETITION_ACCOUNTANT: "财务管理员",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentRole, setCurrentRole] = useState<string>("lab_member")
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem("currentUserRole")
    if (savedRole) {
      setCurrentRole(savedRole)
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'dashboard' && !dashboardData) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('/api/admin/dashboard');
          if (!response.ok) throw new Error("Failed to fetch dashboard data");
          const data = await response.json();
          setDashboardData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [activeTab, dashboardData]);

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">管理中心</h1>
          <p className="text-muted-foreground">管理系统设置、用户和权限</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/home">
              <Home className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
          {currentRole === "super_admin" && (
            <Button asChild>
              <Link href="/admin/roles">
                <Shield className="mr-2 h-4 w-4" />
                角色管理
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">概览</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">用户</span>
          </TabsTrigger>
          {currentRole === "super_admin" && (
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">权限</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">安全</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">日志</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">设置</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Skeleton className="h-[108px]" />
              <Skeleton className="h-[108px]" />
              <Skeleton className="h-[108px]" />
              <Skeleton className="h-[108px]" />
            </div>
          ) : dashboardData ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总用户数</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">当前系统中的用户总数</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">状态为"活跃"的用户总数</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">系统负载</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.systemLoad}%</div>
                  <p className="text-xs text-muted-foreground">模拟数据 - 实时监控需要额外工具</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">存储使用</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.storageUsage}%</div>
                  <p className="text-xs text-muted-foreground">模拟数据 - 实时监控需要额外工具</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p>无法加载概览数据。</p>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>系统模块状态</CardTitle>
                <CardDescription>各功能模块的使用情况和状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">通知系统</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        正常
                      </Badge>
                    </div>
                    <Progress value={92} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>本月发送: 245条</span>
                      <span>92%送达率</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">物品管理</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        正常
                      </Badge>
                    </div>
                    <Progress value={78} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>物品总数: 156件</span>
                      <span>78%使用率</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">财务系统</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        正常
                      </Badge>
                    </div>
                    <Progress value={65} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>本月交易: 32笔</span>
                      <span>预算使用: 65%</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">竞赛系统</span>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        需要更新
                      </Badge>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>活跃竞赛: 5个</span>
                      <span>参与率: 45%</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">文档系统</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        正常
                      </Badge>
                    </div>
                    <Progress value={82} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>文档总数: 328个</span>
                      <span>存储使用: 82%</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">社区系统</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        正常
                      </Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>本月帖子: 124篇</span>
                      <span>活跃度: 95%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>用户角色分布</CardTitle>
                <CardDescription>系统中各角色用户的数量分布</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ) : dashboardData?.roleDistribution && dashboardData.totalUsers > 0 ? (
                  dashboardData.roleDistribution.map(item => (
                    <div key={item.role} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{roleDisplayName[item.role] || item.role}</span>
                        <span className="font-medium">{item.count}</span>
                      </div>
                      <Progress value={(item.count / dashboardData.totalUsers) * 100} className="h-2" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">暂无角色分布数据</p>
                )}
              </CardContent>
              <CardFooter>
                {currentRole === "super_admin" && (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/roles">
                      <Shield className="mr-2 h-4 w-4" />
                      管理角色和权限
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UsersTable />
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <LogsTable />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>

        {currentRole === "super_admin" && (
          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>权限管理</CardTitle>
                <CardDescription>管理系统角色和权限设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>此模块允许您管理系统中的角色和权限，包括：</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>创建和编辑用户角色</li>
                  <li>为角色分配权限</li>
                  <li>管理用户的角色分配</li>
                  <li>查看权限审计日志</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/admin/roles">进入权限管理</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="settings" className="space-y-4">
          <GeneralSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
