"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Lock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟保存
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "个人资料已更新",
        description: "您的个人资料已成功更新",
      })
    }, 1000)
  }

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟保存
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "密码已更新",
        description: "您的密码已成功更新",
      })
    }, 1000)
  }

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟保存
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "通知设置已更新",
        description: "您的通知设置已成功更新",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">设置</h1>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-muted/50 p-0.5 rounded-lg">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <User className="h-4 w-4" />
            个人资料
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex items-center gap-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Lock className="h-4 w-4" />
            密码安全
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Bell className="h-4 w-4" />
            通知设置
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card className="border shadow-sm">
            <form onSubmit={handleSaveProfile}>
              <CardHeader className="pb-4">
                <CardTitle>个人资料</CardTitle>
                <CardDescription>更新您的个人信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" defaultValue="张三" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" type="email" defaultValue="zhangsan@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">电话</Label>
                    <Input id="phone" defaultValue="138****1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">专业</Label>
                    <Input id="major" defaultValue="电子工程" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wechat">微信</Label>
                    <Input id="wechat" defaultValue="zhangsan_wx" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qq">QQ</Label>
                    <Input id="qq" defaultValue="123456789" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea
                    id="bio"
                    defaultValue="电子工程专业学生，对单片机和嵌入式系统开发有浓厚兴趣。擅长Arduino和PCB设计，曾参与多个智能硬件项目的开发。希望在实验室中不断学习和成长，与志同道合的伙伴一起探索电子世界的奥秘。"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "保存中..." : "保存更改"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="password" className="mt-6 space-y-6">
          <Card className="border shadow-sm">
            <form onSubmit={handleSavePassword}>
              <CardHeader className="pb-4">
                <CardTitle>密码安全</CardTitle>
                <CardDescription>更新您的密码</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">当前密码</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">新密码</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">确认新密码</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "更新中..." : "更新密码"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="border shadow-sm">
            <form onSubmit={handleSaveNotifications}>
              <CardHeader className="pb-4">
                <CardTitle>通知设置</CardTitle>
                <CardDescription>管理您的通知偏好</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label>系统通知</Label>
                      <p className="text-sm text-muted-foreground">接收系统更新和维护通知</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label>物品借用提醒</Label>
                      <p className="text-sm text-muted-foreground">接收物品借用到期提醒</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label>项目更新</Label>
                      <p className="text-sm text-muted-foreground">接收项目进度和任务分配通知</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label>社区互动</Label>
                      <p className="text-sm text-muted-foreground">接收评论、点赞和好友请求通知</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-0.5">
                      <Label>邮件通知</Label>
                      <p className="text-sm text-muted-foreground">同时通过邮件接收重要通知</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "保存中..." : "保存设置"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
