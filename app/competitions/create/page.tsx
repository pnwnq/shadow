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
import { CalendarIcon, Plus, X, Upload, FileText, Trophy, Clock, Users, Building, Globe } from "lucide-react"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Progress } from "@/components/ui/progress"

export default function CreateCompetitionPage() {
  const [selectedTab, setSelectedTab] = useState("basic")
  const [formProgress, setFormProgress] = useState(25)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    level: "",
    organizer: "",
    website: "",
    description: "",
    requirements: "",
    awards: "",
    teamLeader: "",
    teamMembers: [] as number[],
    teamDivision: "",
    registrationStartDate: undefined as Date | undefined,
    registrationEndDate: undefined as Date | undefined,
    competitionStartDate: undefined as Date | undefined,
    competitionEndDate: undefined as Date | undefined,
    keyDates: [{ date: undefined as Date | undefined, description: "" }],
    attachments: [
      { id: 1, name: "竞赛规则.pdf", size: "2.4 MB", type: "application/pdf" },
      { id: 2, name: "报名表模板.docx", size: "1.1 MB", type: "application/docx" },
    ],
    notes: "",
  })

  const router = useRouter()
  const { toast } = useToast()

  // 模拟用户数据
  const users = [
    { id: 1, name: "张三", avatar: "/abstract-zs.png", role: "算法工程师" },
    { id: 2, name: "李四", avatar: "/abstract-geometric-ls.png", role: "机械工程师" },
    { id: 3, name: "王五", avatar: "/double-w-abstract.png", role: "电子工程师" },
    { id: 4, name: "赵六", avatar: "/abstract-geometric-zl.png", role: "软件工程师" },
    { id: 5, name: "钱七", avatar: "/placeholder.svg?height=40&width=40", role: "项目经理" },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // 更新表单进度
    updateFormProgress()
  }

  const updateFormProgress = () => {
    // 计算基本信息完成度
    const basicFields = ["name", "type", "level", "organizer", "description"]
    const basicFieldsCompleted = basicFields.filter(
      (field) =>
        formData[field as keyof typeof formData] && String(formData[field as keyof typeof formData]).trim() !== "",
    ).length
    const basicProgress = (basicFieldsCompleted / basicFields.length) * 25

    // 计算团队信息完成度
    const teamFields = ["teamLeader", "teamMembers"]
    const teamFieldsCompleted = teamFields.filter((field) => {
      if (field === "teamMembers") {
        return (formData.teamMembers as number[]).length > 0
      }
      return formData[field as keyof typeof formData] && String(formData[field as keyof typeof formData]).trim() !== ""
    }).length
    const teamProgress = (teamFieldsCompleted / teamFields.length) * 25

    // 计算时间安排完成度
    const scheduleFields = [
      "registrationStartDate",
      "registrationEndDate",
      "competitionStartDate",
      "competitionEndDate",
    ]
    const scheduleFieldsCompleted = scheduleFields.filter((field) => formData[field as keyof typeof formData]).length
    const scheduleProgress = (scheduleFieldsCompleted / scheduleFields.length) * 25

    // 附件资料完成度 (如果有附件就算完成)
    const attachmentProgress = formData.attachments.length > 0 ? 25 : 0

    // 总进度
    const totalProgress = Math.min(
      Math.round(basicProgress + teamProgress + scheduleProgress + attachmentProgress),
      100,
    )
    setFormProgress(totalProgress)
  }

  const handleMemberToggle = (userId: number) => {
    let newMembers
    if (formData.teamMembers.includes(userId)) {
      newMembers = formData.teamMembers.filter((id) => id !== userId)
    } else {
      newMembers = [...formData.teamMembers, userId]
    }

    handleInputChange("teamMembers", newMembers)
  }

  const handleAddKeyDate = () => {
    setFormData({
      ...formData,
      keyDates: [...formData.keyDates, { date: undefined, description: "" }],
    })
  }

  const handleKeyDateChange = (index: number, field: "date" | "description", value: any) => {
    const newKeyDates = [...formData.keyDates]
    newKeyDates[index] = {
      ...newKeyDates[index],
      [field]: value,
    }

    handleInputChange("keyDates", newKeyDates)
  }

  const handleRemoveKeyDate = (index: number) => {
    const newKeyDates = [...formData.keyDates]
    newKeyDates.splice(index, 1)
    handleInputChange("keyDates", newKeyDates)
  }

  const handleRemoveAttachment = (id: number) => {
    const newAttachments = formData.attachments.filter((attachment) => attachment.id !== id)
    handleInputChange("attachments", newAttachments)
  }

  const validateForm = () => {
    // 基本验证
    if (!formData.name) {
      toast({
        title: "请填写竞赛名称",
        description: "竞赛名称是必填项",
        variant: "destructive",
      })
      setSelectedTab("basic")
      return false
    }

    if (!formData.type) {
      toast({
        title: "请选择竞赛类型",
        description: "竞赛类型是必填项",
        variant: "destructive",
      })
      setSelectedTab("basic")
      return false
    }

    // 团队验证
    if (!formData.teamLeader) {
      toast({
        title: "请选择团队负责人",
        description: "团队负责人是必填项",
        variant: "destructive",
      })
      setSelectedTab("team")
      return false
    }

    // 时间验证
    if (!formData.registrationStartDate || !formData.registrationEndDate) {
      toast({
        title: "请设置报名时间",
        description: "报名开始和截止日期是必填项",
        variant: "destructive",
      })
      setSelectedTab("schedule")
      return false
    }

    if (!formData.competitionStartDate || !formData.competitionEndDate) {
      toast({
        title: "请设置竞赛时间",
        description: "竞赛开始和结束日期是必填项",
        variant: "destructive",
      })
      setSelectedTab("schedule")
      return false
    }

    return true
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    // 模拟提交
    toast({
      title: "竞赛创建成功",
      description: "您已成功创建了新竞赛",
    })

    // 跳转到竞赛列表
    router.push("/competitions")
  }

  const handleSaveDraft = () => {
    toast({
      title: "草稿已保存",
      description: "竞赛信息已保存为草稿",
    })
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">创建竞赛</h1>
          <p className="text-muted-foreground mt-2">创建一个新的竞赛项目，设置基本信息、团队成员和时间安排</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">完成度: {formProgress}%</span>
            <Progress value={formProgress} className="w-32 h-2" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              保存草稿
            </Button>
            <Button onClick={handleSubmit}>创建竞赛</Button>
          </div>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">基本信息</span>
            <span className="sm:hidden">基本</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">团队成员</span>
            <span className="sm:hidden">团队</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">时间安排</span>
            <span className="sm:hidden">时间</span>
          </TabsTrigger>
          <TabsTrigger value="attachments" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">附件资料</span>
            <span className="sm:hidden">附件</span>
          </TabsTrigger>
        </TabsList>

        {/* 基本信息 */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>竞赛基本信息</CardTitle>
              <CardDescription>填写竞赛的基本信息，包括名称、类型和描述等</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  竞赛名称 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="输入竞赛名称"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">
                    竞赛类型 <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="选择竞赛类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="robotics">机器人竞赛</SelectItem>
                      <SelectItem value="ai">人工智能竞赛</SelectItem>
                      <SelectItem value="software">软件开发竞赛</SelectItem>
                      <SelectItem value="hardware">硬件设计竞赛</SelectItem>
                      <SelectItem value="innovation">创新创业竞赛</SelectItem>
                      <SelectItem value="academic">学术竞赛</SelectItem>
                      <SelectItem value="other">其他类型</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">
                    竞赛级别 <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="选择竞赛级别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="international">国际级</SelectItem>
                      <SelectItem value="national">国家级</SelectItem>
                      <SelectItem value="provincial">省级</SelectItem>
                      <SelectItem value="municipal">市级</SelectItem>
                      <SelectItem value="school">校级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organizer" className="flex items-center gap-1">
                    主办单位 <span className="text-destructive">*</span>
                    <span className="sr-only">主办单位信息</span>
                  </Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        id="organizer"
                        placeholder="输入主办单位名称"
                        value={formData.organizer}
                        onChange={(e) => handleInputChange("organizer", e.target.value)}
                      />
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Building className="h-4 w-4" />
                          <span className="sr-only">主办单位信息</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-medium">常见主办单位</h4>
                          <div className="text-sm">
                            <ul className="list-disc pl-4 space-y-1">
                              <li>教育部高等教育司</li>
                              <li>中国科学技术协会</li>
                              <li>工业和信息化部</li>
                              <li>中国工程院</li>
                              <li>各省教育厅</li>
                            </ul>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-1">
                    竞赛官网
                    <span className="sr-only">竞赛官网</span>
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  竞赛描述 <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="描述竞赛的目标、内容和要求等"
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">参赛要求</Label>
                <Textarea
                  id="requirements"
                  placeholder="描述参赛团队的要求、人数限制等"
                  className="min-h-[80px]"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="awards">奖项设置</Label>
                <Textarea
                  id="awards"
                  placeholder="描述竞赛的奖项设置、奖金等"
                  className="min-h-[80px]"
                  value={formData.awards}
                  onChange={(e) => handleInputChange("awards", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/competitions">取消</Link>
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
              <CardDescription>选择参与竞赛的团队成员和负责人</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>
                  团队负责人 <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.teamLeader} onValueChange={(value) => handleInputChange("teamLeader", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择团队负责人" />
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
                <Label>团队成员</Label>
                <div className="rounded-md border">
                  <ScrollArea className="h-[300px]">
                    <div className="p-4 space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center space-x-4">
                          <Checkbox
                            id={`user-${user.id}`}
                            checked={formData.teamMembers.includes(user.id)}
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
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>已选择 {formData.teamMembers.length} 名成员</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0">
                    邀请新成员
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>团队分工</Label>
                <Textarea
                  placeholder="描述团队成员的分工和职责"
                  className="min-h-[100px]"
                  value={formData.teamDivision}
                  onChange={(e) => handleInputChange("teamDivision", e.target.value)}
                />
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

        {/* 时间安排 */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>时间安排</CardTitle>
              <CardDescription>设置竞赛的关键时间节点</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>
                    报名开始日期 <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.registrationStartDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.registrationStartDate ? (
                          format(formData.registrationStartDate, "PPP", { locale: zhCN })
                        ) : (
                          <span>选择日期</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.registrationStartDate}
                        onSelect={(date) => handleInputChange("registrationStartDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>
                    报名截止日期 <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.registrationEndDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.registrationEndDate ? (
                          format(formData.registrationEndDate, "PPP", { locale: zhCN })
                        ) : (
                          <span>选择日期</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.registrationEndDate}
                        onSelect={(date) => handleInputChange("registrationEndDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>
                    竞赛开始日期 <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.competitionStartDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.competitionStartDate ? (
                          format(formData.competitionStartDate, "PPP", { locale: zhCN })
                        ) : (
                          <span>选择日期</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.competitionStartDate}
                        onSelect={(date) => handleInputChange("competitionStartDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>
                    竞赛结束日期 <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.competitionEndDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.competitionEndDate ? (
                          format(formData.competitionEndDate, "PPP", { locale: zhCN })
                        ) : (
                          <span>选择日期</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.competitionEndDate}
                        onSelect={(date) => handleInputChange("competitionEndDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>关键时间节点</Label>
                <div className="space-y-4">
                  {formData.keyDates.map((keyDate, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-5 sm:col-span-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !keyDate.date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {keyDate.date ? format(keyDate.date, "PPP", { locale: zhCN }) : <span>选择日期</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={keyDate.date}
                              onSelect={(date) => handleKeyDateChange(index, "date", date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="col-span-6 sm:col-span-7">
                        <Input
                          placeholder="事件描述，例如：提交初赛作品"
                          value={keyDate.description}
                          onChange={(e) => handleKeyDateChange(index, "description", e.target.value)}
                        />
                      </div>
                      <div className="col-span-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveKeyDate(index)}
                          disabled={formData.keyDates.length <= 1}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">删除时间节点</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="gap-1" onClick={handleAddKeyDate}>
                    <Plus className="h-4 w-4" /> 添加时间节点
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab("team")}>
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
              <CardDescription>上传竞赛相关的文档和资料</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <Label>已上传附件</Label>
                {formData.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {formData.attachments.map((attachment) => (
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
                          <span className="sr-only">删除附件</span>
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
                <Textarea
                  id="notes"
                  placeholder="添加关于竞赛的其他说明或备注"
                  className="min-h-[100px]"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab("schedule")}>
                上一步
              </Button>
              <Button onClick={handleSubmit}>创建竞赛</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleSaveDraft}>
          保存草稿
        </Button>
        <Button onClick={handleSubmit}>创建竞赛</Button>
      </div>
    </div>
  )
}
