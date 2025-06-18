"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Plus, X, Upload, FileText, DollarSign } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useToast } from "@/components/ui/use-toast"

export default function CreateProjectPage() {
  const [selectedTab, setSelectedTab] = useState("basic")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const [attachments, setAttachments] = useState([
    { id: 1, name: "项目计划书.pdf", size: "3.2 MB", type: "application/pdf" },
    { id: 2, name: "技术方案.docx", size: "1.8 MB", type: "application/docx" },
  ])

  const router = useRouter()
  const { toast } = useToast()

  // 模拟用户数据
  const users = [
    { id: 1, name: "张三", avatar: "/placeholder.svg?height=40&width=40", role: "算法工程师" },
    { id: 2, name: "李四", avatar: "/placeholder.svg?height=40&width=40", role: "机械工程师" },
    { id: 3, name: "王五", avatar: "/placeholder.svg?height=40&width=40", role: "电子工程师" },
    { id: 4, name: "赵六", avatar: "/placeholder.svg?height=40&width=40", role: "软件工程师" },
    { id: 5, name: "钱七", avatar: "/placeholder.svg?height=40&width=40", role: "项目经理" },
  ]

  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")

  const handleMemberToggle = (userId: number) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId))
    } else {
      setSelectedMembers([...selectedMembers, userId])
    }
  }

  const handleRemoveAttachment = (id: number) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  const handleSubmit = () => {
    // 模拟发送邀请给选中的成员
    if (selectedMembers.length > 0) {
      toast({
        title: "项目创建成功",
        description: `已向${selectedMembers.length}名成员发送邀请`,
      })
    } else {
      toast({
        title: "项目创建成功",
        description: "您已成功创建了新项目",
      })
    }
    router.push("/projects")
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
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
            <BreadcrumbLink href="/projects/create">创建项目</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">创建项目</h1>
        <p className="text-muted-foreground mt-2">创建一个新的研究项目，设置基本信息、团队成员和时间规划</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="team">团队成员</TabsTrigger>
          <TabsTrigger value="schedule">时间规划</TabsTrigger>
          <TabsTrigger value="resources">资源管理</TabsTrigger>
          <TabsTrigger value="attachments">附件资料</TabsTrigger>
        </TabsList>

        {/* 基本信息 */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>项目基本信息</CardTitle>
              <CardDescription>填写项目的基本信息，包括名称、类型和描述等</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">项目名称</Label>
                <Input id="name" placeholder="输入项目名称" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">项目类型</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="选择项目类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">基础研究</SelectItem>
                      <SelectItem value="application">应用研究</SelectItem>
                      <SelectItem value="development">技术开发</SelectItem>
                      <SelectItem value="product">产品开发</SelectItem>
                      <SelectItem value="service">服务项目</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">优先级</Label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">高</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="low">低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">项目描述</Label>
                <Textarea id="description" placeholder="描述项目的目标、内容和意义等" className="min-h-[120px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objectives">项目目标</Label>
                <Textarea id="objectives" placeholder="列出项目的具体目标和预期成果" className="min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="background">项目背景</Label>
                <Textarea id="background" placeholder="描述项目的研究背景和相关工作" className="min-h-[80px]" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/projects">取消</Link>
              </Button>
              <Button onClick={() => setSelectedTab("team")}>下一步</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 团队成员 */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>团队成员</CardTitle>
              <CardDescription>选择参与项目的团队成员和负责人</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>项目负责人</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择项目负责人" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>团队成员</Label>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> 邀请新成员
                  </Button>
                </div>
                <div className="rounded-md border">
                  <ScrollArea className="h-[300px]">
                    <div className="p-4 space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center space-x-4">
                          <Checkbox
                            id={`user-${user.id}`}
                            checked={selectedMembers.includes(user.id)}
                            onCheckedChange={() => handleMemberToggle(user.id)}
                          />
                          <label
                            htmlFor={`user-${user.id}`}
                            className="flex flex-1 items-center space-x-3 cursor-pointer"
                          >
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium leading-none">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.role}</p>
                            </div>
                          </label>
                          <Select>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="选择角色" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">普通成员</SelectItem>
                              <SelectItem value="developer">开发者</SelectItem>
                              <SelectItem value="designer">设计师</SelectItem>
                              <SelectItem value="tester">测试员</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>已选择 {selectedMembers.length} 名成员</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-auto p-1 px-2">
                      从团队导入
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto p-1 px-2">
                      通过邮箱邀请
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>团队分工</Label>
                <Textarea placeholder="描述团队成员的分工和职责" className="min-h-[100px]" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab("basic")}>
                上一步
              </Button>
              <Button onClick={() => setSelectedTab("schedule")}>下一步</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 时间规划 */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>时间规划</CardTitle>
              <CardDescription>设置项目的时间线和里程碑</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>项目开始日期</Label>
                  <div className="flex items-center gap-2">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>项目结束日期</Label>
                  <div className="flex items-center gap-2">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>项目里程碑</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs">日期</Label>
                      <div className="flex items-center mt-1">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          选择日期
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">里程碑描述</Label>
                      <Input className="mt-1" placeholder="例如：完成系统设计" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          选择日期
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Input placeholder="例如：完成原型开发" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          选择日期
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Input placeholder="例如：完成测试验证" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> 添加里程碑
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>阶段划分</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <Label className="text-xs">阶段名称</Label>
                      <Input className="mt-1" placeholder="例如：需求分析" />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-xs">开始日期</Label>
                      <div className="flex items-center mt-1">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          选择日期
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Label className="text-xs">结束日期</Label>
                      <div className="flex items-center mt-1">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          选择日期
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Label className="text-xs">负责人</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="选择" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id.toString()}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> 添加阶段
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab("team")}>
                上一步
              </Button>
              <Button onClick={() => setSelectedTab("resources")}>下一步</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 资源管理 */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>资源管理</CardTitle>
              <CardDescription>设置项目的预算和资源需求</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>项目预算</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">总预算（元）</Label>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input placeholder="输入总预算金额" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">预算来源</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择预算来源" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab">实验室经费</SelectItem>
                        <SelectItem value="school">学校项目经费</SelectItem>
                        <SelectItem value="government">政府资助</SelectItem>
                        <SelectItem value="enterprise">企业合作</SelectItem>
                        <SelectItem value="other">其他来源</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>预算分配</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs">类别</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="选择类别" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equipment">设备采购</SelectItem>
                          <SelectItem value="materials">材料费</SelectItem>
                          <SelectItem value="travel">差旅费</SelectItem>
                          <SelectItem value="labor">人工费</SelectItem>
                          <SelectItem value="service">服务费</SelectItem>
                          <SelectItem value="other">其他费用</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">金额（元）</Label>
                      <Input className="mt-1" placeholder="输入金额" />
                    </div>
                    <div>
                      <Label className="text-xs">说明</Label>
                      <Input className="mt-1" placeholder="简要说明" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择类别" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equipment">设备采购</SelectItem>
                          <SelectItem value="materials">材料费</SelectItem>
                          <SelectItem value="travel">差旅费</SelectItem>
                          <SelectItem value="labor">人工费</SelectItem>
                          <SelectItem value="service">服务费</SelectItem>
                          <SelectItem value="other">其他费用</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Input placeholder="输入金额" />
                    </div>
                    <div>
                      <Input placeholder="简要说明" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> 添加预算项
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>设备需求</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs">设备名称</Label>
                      <Input className="mt-1" placeholder="输入设备名称" />
                    </div>
                    <div>
                      <Label className="text-xs">数量</Label>
                      <Input className="mt-1" type="number" placeholder="输入数量" />
                    </div>
                    <div>
                      <Label className="text-xs">用途</Label>
                      <Input className="mt-1" placeholder="简要说明用途" />
                    </div>
                    <div>
                      <Label className="text-xs">状态</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="选择状态" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">已有可用</SelectItem>
                          <SelectItem value="need_purchase">需要采购</SelectItem>
                          <SelectItem value="need_borrow">需要借用</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> 添加设备需求
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab("schedule")}>
                上一步
              </Button>
              <Button onClick={() => setSelectedTab("attachments")}>下一步</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 附件资料 */}
        <TabsContent value="attachments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>附件资料</CardTitle>
              <CardDescription>上传项目相关的文档和资料</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <Label>已上传附件</Label>
                {attachments.length > 0 ? (
                  <div className="space-y-2">
                    {attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{attachment.name}</p>
                            <p className="text-xs text-muted-foreground">{attachment.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveAttachment(attachment.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-md text-muted-foreground">暂无附件</div>
                )}

                <div className="mt-2">
                  <Button variant="outline" className="gap-2 w-full">
                    <Upload className="h-4 w-4" /> 上传附件
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="notes">备注说明</Label>
                <Textarea id="notes" placeholder="添加关于项目的其他说明或备注" className="min-h-[100px]" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab("resources")}>
                上一步
              </Button>
              <Button onClick={handleSubmit}>创建项目</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">保存草稿</Button>
        <Button onClick={handleSubmit}>创建项目</Button>
      </div>
    </div>
  )
}
