"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, FileText, FolderKanban, MessageSquare, Package, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// 模拟数据
const notifications = [
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

export default function NotificationsPage() {
  const { toast } = useToast()
  const [userNotifications, setUserNotifications] = useState(notifications)

  const markAsRead = (id: string) => {
    setUserNotifications(
      userNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const handleAction = (id: string, action: string) => {
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

    // 移除通知
    setUserNotifications(userNotifications.filter((notification) => notification.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "friend":
        return <Users className="size-5 text-blue-500" />
      case "comment":
        return <MessageSquare className="size-5 text-green-500" />
      case "borrow":
        return <Package className="size-5 text-yellow-500" />
      case "project":
        return <FolderKanban className="size-5 text-purple-500" />
      case "document":
        return <FileText className="size-5 text-red-500" />
      default:
        return <MessageSquare className="size-5" />
    }
  }

  const unreadCount = userNotifications.filter((notification) => !notification.read).length

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">通知中心</h1>
        <Button variant="outline" size="sm">
          全部标为已读
        </Button>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="unread">
            未读{" "}
            <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
              {unreadCount}
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>所有通知</CardTitle>
              <CardDescription>您的所有通知列表</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userNotifications.length > 0 ? (
                userNotifications.map((notification) => (
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
                          <Avatar className="size-6">
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
                            <Check className="mr-1 size-4" />
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
                        {!notification.read && <span className="ml-auto flex size-2 rounded-full bg-primary"></span>}
                      </div>
                    </div>
                  </div>
                ))
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
              {userNotifications.filter((n) => !n.read).length > 0 ? (
                userNotifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 rounded-lg border bg-muted/50 p-4"
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
                            <Avatar className="size-6">
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
                              <Check className="mr-1 size-4" />
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
                          <span className="ml-auto flex size-2 rounded-full bg-primary"></span>
                        </div>
                      </div>
                    </div>
                  ))
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
