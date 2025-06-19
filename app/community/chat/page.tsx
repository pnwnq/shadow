"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Send,
  Smile,
  Paperclip,
  ImageIcon,
  ChevronDown,
  Search,
  Users,
  Hash,
  Settings,
  PlusCircle,
  MessageSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { hasPermission } from "@/components/auth-guard"
import { type Role } from "@/types"

// 模拟数据 - 频道列表
const channels = [
  { id: "general", name: "通用讨论", unread: 3, description: "实验室通用讨论频道" },
  { id: "projects", name: "项目交流", unread: 0, description: "项目相关讨论" },
  { id: "competitions", name: "竞赛信息", unread: 5, description: "竞赛相关信息和讨论" },
  { id: "resources", name: "资源分享", unread: 0, description: "学习资源和材料分享" },
  { id: "random", name: "随意聊天", unread: 0, description: "休闲话题讨论" },
]

// 模拟数据 - 私聊列表
const directMessages = [
  { id: "zhangsan", name: "张三", status: "online", unread: 2, avatar: "ZS" },
  { id: "lisi", name: "李四", status: "offline", unread: 0, avatar: "LS" },
  { id: "wangwu", name: "王五", status: "away", unread: 0, avatar: "WW" },
  { id: "zhaoliu", name: "赵六", status: "online", unread: 1, avatar: "ZL" },
]

// 模拟数据 - 消息
const initialMessages = {
  general: [
    {
      id: "msg1",
      sender: { id: "zhangsan", name: "张三", avatar: "ZS" },
      content: "大家好，有人知道下周的机器人比赛具体时间安排吗？",
      time: "今天 09:30",
      reactions: [{ emoji: "👍", count: 2 }],
    },
    {
      id: "msg2",
      sender: { id: "lisi", name: "李四", avatar: "LS" },
      content: "下周三上午9点开始，地点在体育馆。我已经把详细安排发到了竞赛频道。",
      time: "今天 09:35",
      reactions: [{ emoji: "🙏", count: 3 }],
    },
    {
      id: "msg3",
      sender: { id: "wangwu", name: "王五", avatar: "WW" },
      content: "我们的项目准备得怎么样了？还有什么需要调试的吗？",
      time: "今天 09:40",
      reactions: [],
    },
    {
      id: "msg4",
      sender: { id: "zhangsan", name: "张三", avatar: "ZS" },
      content: "视觉识别部分还有些问题，今天下午我会在实验室调试，有兴趣的可以一起来。",
      time: "今天 09:42",
      reactions: [{ emoji: "👀", count: 1 }],
    },
    {
      id: "msg5",
      sender: { id: "zhaoliu", name: "赵六", avatar: "ZL" },
      content: "我下午有空，可以一起来调试。顺便我带了新的摄像头模块，可以试试效果。",
      time: "今天 09:45",
      reactions: [{ emoji: "🚀", count: 2 }],
    },
  ],
  competitions: [
    {
      id: "comp1",
      sender: { id: "admin", name: "系统管理员", avatar: "AD" },
      content:
        "【重要通知】2024年全国大学生机器人大赛报名已开始，截止日期为5月30日。请有意参赛的团队尽快组队并联系指导老师。",
      time: "昨天 14:00",
      reactions: [{ emoji: "📢", count: 5 }],
      isPinned: true,
    },
    {
      id: "comp2",
      sender: { id: "zhangsan", name: "张三", avatar: "ZS" },
      content:
        "我已经整理了去年比赛的资料和经验总结，放在了共享文档里，大家可以参考：https://docs.shadowlab.org/competitions/2023-summary",
      time: "昨天 15:30",
      reactions: [{ emoji: "👍", count: 8 }],
    },
    {
      id: "comp3",
      sender: { id: "lisi", name: "李四", avatar: "LS" },
      content: "今年的比赛规则有变化，主要是在自主导航部分增加了障碍识别的难度，我们需要改进算法。",
      time: "昨天 16:15",
      reactions: [],
    },
    {
      id: "comp4",
      sender: { id: "wangwu", name: "王五", avatar: "WW" },
      content: "我找到了一些关于障碍识别的新论文和开源项目，晚些时候分享给大家。",
      time: "昨天 16:30",
      reactions: [{ emoji: "🙏", count: 3 }],
    },
    {
      id: "comp5",
      sender: { id: "admin", name: "系统管理员", avatar: "AD" },
      content: "【提醒】校内选拔赛将在下周一进行，请各参赛队伍做好准备，并于周日前完成设备调试。",
      time: "今天 08:00",
      reactions: [{ emoji: "⏰", count: 4 }],
    },
  ],
  zhangsan: [
    {
      id: "dm1",
      sender: { id: "zhangsan", name: "张三", avatar: "ZS" },
      content: "你好，关于下周的项目演示，你准备得怎么样了？",
      time: "昨天 18:30",
      isOwn: false,
    },
    {
      id: "dm2",
      sender: { id: "current-user", name: "我", avatar: "ME" },
      content: "我正在完成PPT，还有一些技术细节需要确认。你有空讨论一下吗？",
      time: "昨天 18:35",
      isOwn: true,
    },
    {
      id: "dm3",
      sender: { id: "zhangsan", name: "张三", avatar: "ZS" },
      content: "可以，明天下午3点在实验室见面如何？",
      time: "昨天 18:40",
      isOwn: false,
    },
    {
      id: "dm4",
      sender: { id: "current-user", name: "我", avatar: "ME" },
      content: "好的，明天见。我会把问题列一个清单带过去。",
      time: "昨天 18:42",
      isOwn: true,
    },
    {
      id: "dm5",
      sender: { id: "zhangsan", name: "张三", avatar: "ZS" },
      content: "对了，记得带上上次测试的数据，我们需要分析一下结果。",
      time: "今天 08:15",
      isOwn: false,
    },
  ],
}

export default function CommunityChat() {
  const { toast } = useToast()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [activeChannel, setActiveChannel] = useState("general")
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === "loading") return // 等待会话加载

    if (status === "unauthenticated") {
      toast({
        title: "访问受限",
        description: "请登录后访问实时聊天功能。",
        variant: "destructive",
      })
      router.push("/login") // 重定向到登录页面
      return
    }

    const userRole = session?.user?.role as Role
    if (!hasPermission(userRole, "community_chat")) {
      toast({
        title: "权限不足",
        description: "您没有权限访问聊天功能。",
        variant: "destructive",
      })
      router.push("/community")
    }
  }, [status, session, router, toast])

  if (status !== "authenticated" || !session?.user?.role || !hasPermission(session.user.role as Role, "community_chat")) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <p className="text-muted-foreground">正在验证权限...</p>
      </div>
    )
  }

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, activeChannel])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const currentMessages = messages[activeChannel as keyof typeof messages] || []
    const newMsg = {
      id: `new-${Date.now()}`,
      sender: { id: "current-user", name: "我", avatar: "ME" },
      content: newMessage,
      time: "刚刚",
      reactions: [],
      isOwn: true,
    }

    setMessages({
      ...messages,
      [activeChannel]: [...currentMessages, newMsg],
    })
    setNewMessage("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredDirectMessages = directMessages.filter((dm) =>
    dm.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const currentChannelInfo = channels.find((channel) => channel.id === activeChannel) || {
    name: activeChannel.startsWith("user-")
      ? directMessages.find((dm) => dm.id === activeChannel.replace("user-", ""))?.name || "私聊"
      : "未知频道",
    description: "",
  }

  const isDirectMessage = directMessages.some((dm) => `user-${dm.id}` === activeChannel)
  const currentMessages = isDirectMessage
    ? messages[activeChannel.replace("user-", "") as keyof typeof messages] || []
    : messages[activeChannel as keyof typeof messages] || []

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* 侧边栏 */}
      <div className="w-full border-r md:w-64">
        <div className="flex h-14 items-center justify-between border-b px-4">
          <h2 className="font-semibold">社区聊天</h2>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索频道和用户..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="p-2">
            <div className="mb-2 flex items-center justify-between px-2 py-1">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">频道</h3>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>

            {filteredChannels.map((channel) => (
              <Button
                key={channel.id}
                variant={activeChannel === channel.id ? "secondary" : "ghost"}
                className="mb-1 w-full justify-start"
                onClick={() => setActiveChannel(channel.id)}
              >
                <Hash className="mr-2 h-4 w-4" />
                <span className="flex-1 truncate text-left">{channel.name}</span>
                {channel.unread > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {channel.unread}
                  </Badge>
                )}
              </Button>
            ))}

            <div className="mb-2 mt-4 flex items-center justify-between px-2 py-1">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">私信</h3>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>

            {filteredDirectMessages.map((dm) => (
              <Button
                key={dm.id}
                variant={activeChannel === `user-${dm.id}` ? "secondary" : "ghost"}
                className="mb-1 w-full justify-start"
                onClick={() => setActiveChannel(`user-${dm.id}`)}
              >
                <div className="relative mr-2">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">{dm.avatar}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ${getStatusColor(dm.status)}`}
                  ></span>
                </div>
                <span className="flex-1 truncate text-left">{dm.name}</span>
                {dm.unread > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {dm.unread}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-auto border-t p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-medium">当前用户</p>
              <p className="text-xs text-muted-foreground">在线</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>设置状态</DropdownMenuItem>
                <DropdownMenuItem>个人设置</DropdownMenuItem>
                <DropdownMenuItem>退出登录</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex flex-1 flex-col">
        {/* 频道头部 */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center">
            {isDirectMessage ? <MessageSquare className="mr-2 h-5 w-5" /> : <Hash className="mr-2 h-5 w-5" />}
            <h2 className="font-semibold">{currentChannelInfo.name}</h2>
            {currentChannelInfo.description && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <p className="text-sm text-muted-foreground">{currentChannelInfo.description}</p>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Users className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 消息区域 */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {currentMessages.map((message: any) => {
              const isPinned = message.isPinned
              const isOwn = message.isOwn

              return (
                <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                    {!isOwn && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback>{message.sender.avatar}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      {!isOwn && (
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium">{message.sender.name}</span>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                          {isPinned && (
                            <Badge variant="outline" className="text-xs">
                              置顶
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className={`rounded-lg p-3 ${isOwn ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {message.reactions.map((reaction: any, index: number) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1 py-0">
                              <span>{reaction.emoji}</span>
                              <span className="text-xs">{reaction.count}</span>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* 输入区域 */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Input
              placeholder={`发送消息到 ${isDirectMessage ? currentChannelInfo.name : `#${currentChannelInfo.name}`}`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="button" variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button type="submit" size="icon" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
