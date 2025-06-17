"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Info, Users, Bell, BellRing, AlertTriangle, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateNotificationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notificationType, setNotificationType] = useState("announcement")
  const [priority, setPriority] = useState("normal")
  const [sendToAll, setSendToAll] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "通知发布成功",
        description: "您的通知已成功发布",
      })
      router.push("/notifications")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/notifications" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              返回通知中心
            </Link>
          </Button>
        </div>
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>发布通知</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">通知标题</Label>
                  <Input id="title" placeholder="请输入通知标题" required />
                </div>

                <div className="space-y-2">
                  <Label>通知类型</Label>
                  <RadioGroup
                    defaultValue="announcement"
                    className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4"
                    onValueChange={setNotificationType}
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="announcement" id="announcement" />
                      <Label htmlFor="announcement" className="flex cursor-pointer items-center gap-2">
                        <Bell className="h-4 w-4 text-blue-500" />
                        <span>公告</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="alert" id="alert" />
                      <Label htmlFor="alert" className="flex cursor-pointer items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span>提醒</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="event" id="event" />
                      <Label htmlFor="event" className="flex cursor-pointer items-center gap-2">
                        <BellRing className="h-4 w-4 text-green-500" />
                        <span>活动</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="info" id="info" />
                      <Label htmlFor="info" className="flex cursor-pointer items-center gap-2">
                        <Info className="h-4 w-4 text-purple-500" />
                        <span>信息</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>优先级</Label>
                  <Select defaultValue="normal" onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低 - 一般信息</SelectItem>
                      <SelectItem value="normal">中 - 重要信息</SelectItem>
                      <SelectItem value="high">高 - 紧急信息</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">通知内容</Label>
                  <Textarea id="content" placeholder="请输入通知内容" className="min-h-[150px]" required />
                </div>

                <Tabs defaultValue="target" className="w-full">
                  <TabsList>
                    <TabsTrigger value="target">发送对象</TabsTrigger>
                    <TabsTrigger value="options">高级选项</TabsTrigger>
                  </TabsList>
                  <TabsContent value="target" className="space-y-4 pt-4">
                    <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">发送给所有人</Label>
                        <p className="text-sm text-muted-foreground">通知将发送给系统中的所有用户</p>
                      </div>
                      <Switch checked={sendToAll} onCheckedChange={setSendToAll} />
                    </div>

                    {!sendToAll && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>选择用户组</Label>
                          <Select defaultValue="all">
                            <SelectTrigger>
                              <SelectValue placeholder="选择用户组" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">管理员</SelectItem>
                              <SelectItem value="leader">项目负责人</SelectItem>
                              <SelectItem value="member">普通成员</SelectItem>
                              <SelectItem value="custom">自定义组</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>选择特定用户</Label>
                            <Button variant="outline" size="sm" type="button">
                              <Users className="mr-2 h-4 w-4" />
                              选择用户
                            </Button>
                          </div>
                          <div className="rounded-md border p-4">
                            <p className="text-center text-sm text-muted-foreground">未选择任何用户</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="options" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">定时发送</Label>
                          <p className="text-sm text-muted-foreground">设置通知在特定时间发送</p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>

                      <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">需要确认</Label>
                          <p className="text-sm text-muted-foreground">要求用户确认已阅读此通知</p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>

                      <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">发送邮件通知</Label>
                          <p className="text-sm text-muted-foreground">同时通过邮件发送此通知</p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>

                      <div className="space-y-2">
                        <Label>过期时间</Label>
                        <Select defaultValue="never">
                          <SelectTrigger>
                            <SelectValue placeholder="选择过期时间" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1day">1天后</SelectItem>
                            <SelectItem value="1week">1周后</SelectItem>
                            <SelectItem value="1month">1个月后</SelectItem>
                            <SelectItem value="never">永不过期</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      {priority === "high" ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : notificationType === "announcement" ? (
                        <Bell className="h-5 w-5 text-blue-500" />
                      ) : notificationType === "event" ? (
                        <BellRing className="h-5 w-5 text-green-500" />
                      ) : (
                        <Info className="h-5 w-5 text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">通知预览</p>
                      <p className="text-sm text-muted-foreground">
                        这是通知的显示效果预览。根据您选择的类型和优先级，通知将以不同的样式显示。
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <Button variant="outline" size="sm" type="button">
                          查看详情
                        </Button>
                        <Button size="sm" type="button">
                          <CheckCircle2 className="mr-1 h-4 w-4" />
                          确认
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/notifications")}>
                  取消
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "发布中..." : "发布通知"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
