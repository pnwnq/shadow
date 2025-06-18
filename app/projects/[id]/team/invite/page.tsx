"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Search, UserPlus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// 模拟用户数据
const users = [
  {
    id: "user1",
    name: "陈一",
    avatar: "/abstract-geometric-shapes.png",
    department: "电子工程系",
    role: "硬件工程师",
    skills: ["PCB设计", "嵌入式系统", "传感器集成"],
  },
  {
    id: "user2",
    name: "林二",
    avatar: "/placeholder.svg?height=40&width=40&query=user2",
    department: "计算机科学系",
    role: "软件工程师",
    skills: ["Python", "机器学习", "Web开发"],
  },
  {
    id: "user3",
    name: "张三",
    avatar: "/abstract-zs.png",
    department: "自动化系",
    role: "项目经理",
    skills: ["项目管理", "系统设计", "需求分析"],
    isTeamMember: true,
  },
  {
    id: "user4",
    name: "李四",
    avatar: "/abstract-geometric-ls.png",
    department: "软件工程系",
    role: "开发工程师",
    skills: ["前端开发", "后端开发", "数据库"],
    isTeamMember: true,
  },
  {
    id: "user5",
    name: "王五",
    avatar: "/double-w-abstract.png",
    department: "电子工程系",
    role: "硬件工程师",
    skills: ["电路设计", "嵌入式系统", "传感器"],
    isTeamMember: true,
  },
  {
    id: "user6",
    name: "赵六",
    avatar: "/abstract-geometric-zl.png",
    department: "自动化系",
    role: "测试工程师",
    skills: ["自动化测试", "质量保证", "性能测试"],
    isTeamMember: true,
  },
  {
    id: "user7",
    name: "孙七",
    avatar: "/placeholder.svg?height=40&width=40&query=user7",
    department: "人工智能系",
    role: "算法工程师",
    skills: ["机器学习", "计算机视觉", "自然语言处理"],
  },
  {
    id: "user8",
    name: "周八",
    avatar: "/placeholder.svg?height=40&width=40&query=user8",
    department: "机械工程系",
    role: "机械工程师",
    skills: ["机械设计", "3D建模", "结构分析"],
  },
]

export default function InviteTeamMembersPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [invitedUsers, setInvitedUsers] = useState<string[]>([])

  // 过滤用户
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      !user.isTeamMember,
  )

  // 处理邀请用户
  const handleInviteUser = (userId: string) => {
    if (invitedUsers.includes(userId)) {
      setInvitedUsers(invitedUsers.filter((id) => id !== userId))
    } else {
      setInvitedUsers([...invitedUsers, userId])
    }
  }

  // 发送邀请
  const sendInvitations = () => {
    if (invitedUsers.length === 0) {
      toast({
        title: "邀请失败",
        description: "请至少选择一名用户进行邀请",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "邀请已发送",
      description: `已向${invitedUsers.length}名用户发送项目邀请`,
    })

    // 模拟延迟后返回项目详情页
    setTimeout(() => {
      router.push(`/projects/${id}?invited=true`)
    }, 1500)
  }

  return (
    <div className="space-y-6 p-6 md:p-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">项目管理</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects/${id}`}>项目详情</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects/${id}/team/invite`}>邀请成员</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/projects/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回项目
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">邀请团队成员</h1>
        <p className="text-muted-foreground">邀请新成员加入您的项目团队</p>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="搜索用户名、部门或技能..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">搜索</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>可邀请的用户</CardTitle>
          <CardDescription>
            已选择 {invitedUsers.length} 名用户
            {invitedUsers.length > 0 && (
              <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setInvitedUsers([])}>
                清除所有
              </Button>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length > 0 ? (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-3 border rounded-md ${
                    invitedUsers.includes(user.id) ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.department} • {user.role}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={invitedUsers.includes(user.id) ? "default" : "outline"}
                    size="sm"
                    className="gap-1"
                    onClick={() => handleInviteUser(user.id)}
                  >
                    {invitedUsers.includes(user.id) ? (
                      <>
                        <Check className="h-4 w-4" />
                        已选择
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        邀请
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">未找到匹配的用户</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery ? "尝试使用不同的搜索关键词" : "所有可邀请的用户已经在团队中"}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button variant="outline" asChild>
            <Link href={`/projects/${id}`}>取消</Link>
          </Button>
          <Button onClick={sendInvitations} disabled={invitedUsers.length === 0}>
            <UserPlus className="mr-2 h-4 w-4" />
            发送邀请 ({invitedUsers.length})
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
