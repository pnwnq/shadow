"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Check,
  FileText,
  FolderKanban,
  MessageSquare,
  Package,
  Users,
  Bell,
  Plus,
  Filter,
  Search,
  AlertTriangle,
  BellRing,
  Info,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// 模拟数据
const notifications = [
  {
    id: "0",
    type: "project_invite",
    read: false,
    title: "项目邀请",
    description: '张三邀请您加入"智能家居系统"项目',
    time: "5分钟前",
    user: {
      id: "zhangsan",
      name: "张三",
      avatar: "ZS",
    },
    projectId: "1",
    projectName: "智能家居系统",
    actions: ["accept", "reject"],
  },
  {
    id: "1",
    type: "friend",
    read: false,
    title: "好友请求",
    description: "李四向您发送了好友请求",
    time: "10分钟前",
    user: {
      id: "lisi",
      name: "李四",
      avatar: "LS",
    },
    actions: ["accept", "reject"],
  },
  {
    id: "2",
    type: "comment",
    read: false,
    title: "评论通知",
    description: "王五评论了您的博客《Arduino入门实践》",
    time: "30分钟前",
    user: {
      id: "wangwu",
      name: "王五",
      avatar: "WW",
    },
    link: "/community/posts/1",
  },
  {
    id: "3",
    type: "borrow",
    read: true,
    title: "物品借用提醒",
    description: "您借用的Arduino Uno将在3天后到期",
    time: "2小时前",
    link: "/inventory",
  },
  {
    id: "4",
    type: "project",
    read: true,
    title: "项目更新",
    description: "智能家居系统项目有新的任务分配",
    time: "昨天",
    link: "/projects",
  },
  {
    id: "5",
    type: "document",
    read: true,
    title: "文档更新",
    description: "单片机入门指南文档已更新到新版本",
    time: "2天前",
    link: "/documents",
  },
]

// 模拟系统通知数据
const systemNotifications = [
  {
    id: "sys1",
    type: "announcement",
    priority: "high",
    title: "实验室设备更新通知",
    description: "实验室将于下周一(5月20日)进行设备更新，当天实验室将暂停开放。请各位成员提前安排好实验计划。",
    time: "2024-05-13 09:30",
    sender: {
      id: "admin",
      name: "系统管理员",
      avatar: "AD",
    },
    read: false,
  },
  {
    id: "sys2",
    type: "event",
    priority: "normal",
    title: "机器人技术讲座",
    description: "本周五(5月17日)下午2点，将在A3-201举办机器人视觉识别技术讲座，欢迎各位成员参加。",
    time: "2024-05-12 14:15",
    sender: {
      id: "zhangsan",
      name: "张三",
      avatar: "ZS",
    },
    read: true,
  },
  {
    id: "sys3",
    type: "info",
    priority: "normal",
    title: "新版系统功能介绍",
    description: "实验室管理系统已更新至v2.5版本，新增了证书管理、竞赛指引等功能，欢迎体验并提供反馈。",
    time: "2024-05-10 10:00",
    sender: {
      id: "admin",
      name: "系统管理员",
      avatar: "AD",
    },
    read: true,
  },
  {
    id: "sys4",
    type: "alert",
    priority: "high",
    title: "安全用电提醒",
    description: "近期天气炎热，用电负荷增大，请各位成员注意用电安全，离开实验室时务必关闭所有电源。",
    time: "2024-05-08 16:30",
    sender: {
      id: "admin",
      name: "系统管理员",
      avatar: "AD",
    },
    read: false,
  },
]

export default function NotificationsPage() {
  const { toast } = useToast()
  const [userNotifications, setUserNotifications] = useState(notifications)
  const [systemAnnouncments, setSystemAnnouncements] = useState(systemNotifications)
  const [searchQuery, setSearchQuery] = useState("")

  const markAsRead = (id: string) => {
    setUserNotifications(
      userNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markSystemAsRead = (id: string) => {
    setSystemAnnouncements(
      systemAnnouncments.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  // 修改handleAction函数，添加导航逻辑
  const handleAction = (id: string, action: string) => {
    const notification = userNotifications.find((n) => n.id === id)

    if (notification?.type === "project_invite") {
      if (action === "accept") {
        // 使用window.location直接导航到处理页面
        window.location.href = `/projects/join?projectId=${notification.projectId}&action=accept`
        return // 提前返回，避免执行后续代码
      } else if (action === "reject") {
        window.location.href = `/projects/join?projectId=${notification.projectId}&action=reject`
        return // 提前返回，避免执行后续代码
      }
    } else {
      if (action === "accept") {
        toast({
          title: "好友请求已接受",
          description: "您已成功添加好友",
        })
      } else if (action === "reject") {
        toast({
          title: "好友请求已拒绝",
          description: "您已拒绝好友请求",
        })
      }
    }

    // 移除通知
    setUserNotifications(userNotifications.filter((notification) => notification.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "friend":
        return <Users className="h-5 w-5 text-blue-500" />
      case "comment":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "borrow":
        return <Package className="h-5 w-5 text-yellow-500" />
      case "project":
        return <FolderKanban className="h-5 w-5 text-purple-500" />
      case "document":
        return <FileText className="h-5 w-5 text-red-500" />
      case "announcement":
        return <Bell className="h-5 w-5 text-blue-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "event":
        return <BellRing className="h-5 w-5 text-green-500" />
      case "info":
        return <Info className="h-5 w-5 text-purple-500" />
      case "project_invite":
        return <FolderKanban className="h-5 w-5 text-blue-500" />
      default:
        return <MessageSquare className="h-5 w-5" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">紧急</Badge>
      case "normal":
        return <Badge variant="secondary">普通</Badge>
      case "low":
        return <Badge variant="outline">一般</Badge>
      default:
        return null
    }
  }

  const unreadCount = userNotifications.filter((notification) => !notification.read).length
  const unreadSystemCount = systemAnnouncments.filter((notification) => !notification.read).length

  const filteredUserNotifications = userNotifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredSystemNotifications = systemAnnouncments.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">通知中心</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            全部标为已读
          </Button>
          <Button size="sm" asChild>
            <Link href="/notifications/create">
              <Plus className="mr-1 h-4 w-4" />
              发布通知
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索通知..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              筛选
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>全部通知</DropdownMenuItem>
            <DropdownMenuItem>未读通知</DropdownMenuItem>
            <DropdownMenuItem>系统公告</DropdownMenuItem>
            <DropdownMenuItem>个人通知</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="system" className="w-full">
        <TabsList>
          <TabsTrigger value="system">
            系统公告{" "}
            {unreadSystemCount > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                {unreadSystemCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="personal">
            个人通知{" "}
            {unreadCount > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="unread">未读</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>系统公告</CardTitle>
              <CardDescription>实验室重要通知和公告</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredSystemNotifications.length > 0 ? (
                filteredSystemNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                    onClick={() => markSystemAsRead(notification.id)}
                  >
                    <div className="rounded-full bg-primary/10 p-2">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{notification.title}</p>
                          {getPriorityBadge(notification.priority)}
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      {notification.sender && (
                        <div className="flex items-center gap-2 pt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{notification.sender.avatar}</AvatarFallback>
                          </Avatar>
                          <Link
                            href={`/community/members/${notification.sender.id}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {notification.sender.name}
                          </Link>
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                        {!notification.read && (
                          <Button size="sm">
                            <Check className="mr-1 h-4 w-4" />
                            标为已读
                          </Button>
                        )}
                        {!notification.read && <span className="ml-auto flex h-2 w-2 rounded-full bg-primary"></span>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border p-8 text-center">
                  <p className="text-muted-foreground">暂无系统公告</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>个人通知</CardTitle>
              <CardDescription>您的个人通知列表</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredUserNotifications.length > 0 ? (
                filteredUserNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="rounded-full bg-primary/10 p-2">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      {notification.user && (
                        <div className="flex items-center gap-2 pt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{notification.user.avatar}</AvatarFallback>
                          </Avatar>
                          <Link
                            href={`/community/members/${notification.user.id}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {notification.user.name}
                          </Link>
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-2">
                        {notification.link && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={notification.link}>查看详情</Link>
                          </Button>
                        )}
                        {notification.actions?.includes("accept") && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAction(notification.id, "accept")
                            }}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            接受
                          </Button>
                        )}
                        {notification.actions?.includes("reject") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAction(notification.id, "reject")
                            }}
                          >
                            拒绝
                          </Button>
                        )}
                        {!notification.read && <span className="ml-auto flex h-2 w-2 rounded-full bg-primary"></span>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border p-8 text-center">
                  <p className="text-muted-foreground">暂无个人通知</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>所有通知</CardTitle>
              <CardDescription>您的所有通知列表</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[...filteredSystemNotifications, ...filteredUserNotifications].length > 0 ? (
                [...filteredSystemNotifications, ...filteredUserNotifications]
                  .sort((a, b) => {
                    // 简单的时间排序，实际应用中应该使用日期库
                    return new Date(b.time).getTime() - new Date(a.time).getTime()
                  })
                  .map((notification) => {
                    const isSystem = "priority" in notification
                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 rounded-lg border p-4 ${
                          !notification.read ? "bg-muted/50" : ""
                        }`}
                        onClick={() => {
                          if (isSystem) {
                            markSystemAsRead(notification.id)
                          } else {
                            markAsRead(notification.id)
                          }
                        }}
                      >
                        <div className="rounded-full bg-primary/10 p-2">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{notification.title}</p>
                              {isSystem && getPriorityBadge((notification as any).priority)}
                            </div>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          {(notification.user || (notification as any).sender) && (
                            <div className="flex items-center gap-2 pt-1">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>
                                  {notification.user ? notification.user.avatar : (notification as any).sender.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <Link
                                href={`/community/members/${
                                  notification.user ? notification.user.id : (notification as any).sender.id
                                }`}
                                className="text-sm font-medium hover:underline"
                              >
                                {notification.user ? notification.user.name : (notification as any).sender.name}
                              </Link>
                            </div>
                          )}
                          <div className="flex items-center gap-2 pt-2">
                            <Button variant="outline" size="sm">
                              查看详情
                            </Button>
                            {!notification.read && (
                              <Button size="sm">
                                <Check className="mr-1 h-4 w-4" />
                                标为已读
                              </Button>
                            )}
                            {!notification.read && (
                              <span className="ml-auto flex h-2 w-2 rounded-full bg-primary"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border p-8 text-center">
                  <p className="text-muted-foreground">暂无通知</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>未读通知</CardTitle>
              <CardDescription>您的未读通知列表</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ...filteredSystemNotifications.filter((n) => !n.read),
                ...filteredUserNotifications.filter((n) => !n.read),
              ].length > 0 ? (
                [
                  ...filteredSystemNotifications.filter((n) => !n.read),
                  ...filteredUserNotifications.filter((n) => !n.read),
                ]
                  .sort((a, b) => {
                    // 简单的时间排序，实际应用中应该使用日期库
                    return new Date(b.time).getTime() - new Date(a.time).getTime()
                  })
                  .map((notification) => {
                    const isSystem = "priority" in notification
                    return (
                      <div
                        key={notification.id}
                        className="flex items-start gap-4 rounded-lg border bg-muted/50 p-4"
                        onClick={() => {
                          if (isSystem) {
                            markSystemAsRead(notification.id)
                          } else {
                            markAsRead(notification.id)
                          }
                        }}
                      >
                        <div className="rounded-full bg-primary/10 p-2">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{notification.title}</p>
                              {isSystem && getPriorityBadge((notification as any).priority)}
                            </div>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          {(notification.user || (notification as any).sender) && (
                            <div className="flex items-center gap-2 pt-1">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>
                                  {notification.user ? notification.user.avatar : (notification as any).sender.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <Link
                                href={`/community/members/${
                                  notification.user ? notification.user.id : (notification as any).sender.id
                                }`}
                                className="text-sm font-medium hover:underline"
                              >
                                {notification.user ? notification.user.name : (notification as any).sender.name}
                              </Link>
                            </div>
                          )}
                          <div className="flex items-center gap-2 pt-2">
                            <Button variant="outline" size="sm">
                              查看详情
                            </Button>
                            <Button size="sm">
                              <Check className="mr-1 h-4 w-4" />
                              标为已读
                            </Button>
                            <span className="ml-auto flex h-2 w-2 rounded-full bg-primary"></span>
                          </div>
                        </div>
                      </div>
                    )
                  })
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border p-8 text-center">
                  <p className="text-muted-foreground">暂无未读通知</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
