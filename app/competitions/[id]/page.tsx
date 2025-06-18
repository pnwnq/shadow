"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  Clock,
  CreditCard,
  FileText,
  Filter,
  FolderKanban,
  Globe,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { SiteHeader } from "@/components/site-header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// 导入getCurrentUserRole
import { getCurrentUserRole } from "@/lib/auth-utils"

// 模拟竞赛数据
const competitions = [
  {
    id: "1",
    title: "2024年全国大学生智能车竞赛",
    description:
      "全国大学生智能车竞赛是教育部高等教育司发起的大学生科技竞赛，旨在激发学生对工程实践的兴趣，培养学生的创新能力、协作精神和解决复杂工程问题的综合能力。",
    status: "进行中",
    level: "国家级",
    organizer: "教育部高等教育司",
    website: "https://www.smartcar.org.cn",
    startDate: "2024-03-01",
    registrationDeadline: "2024-04-15",
    competitionDate: "2024-07-15",
    endDate: "2024-07-30",
    location: "上海交通大学",
    leader: {
      id: "zhangsan",
      name: "张三",
      avatar: "ZS",
    },
    members: [
      {
        id: "zhangsan",
        name: "张三",
        avatar: "ZS",
        role: "队长",
      },
      {
        id: "lisi",
        name: "李四",
        avatar: "LS",
        role: "硬件开发",
      },
      {
        id: "wangwu",
        name: "王五",
        avatar: "WW",
        role: "软件开发",
      },
    ],
    projects: [
      {
        id: "1",
        title: "智能车控制系统",
        progress: 65,
        deadline: "2024-06-30",
      },
      {
        id: "2",
        title: "智能车机械结构",
        progress: 80,
        deadline: "2024-06-15",
      },
    ],
    documents: [
      {
        id: "1",
        title: "2024年智能车竞赛规则.pdf",
        type: "PDF",
        uploadDate: "2024-03-05",
        uploader: "zhangsan",
      },
      {
        id: "2",
        title: "智能车设计方案.docx",
        type: "Word",
        uploadDate: "2024-03-20",
        uploader: "lisi",
      },
      {
        id: "3",
        title: "电机驱动电路设计.pdf",
        type: "PDF",
        uploadDate: "2024-04-10",
        uploader: "wangwu",
      },
    ],
    finances: [
      {
        id: "1",
        type: "采购",
        title: "购买电机和驱动模块",
        amount: 1299.0,
        status: "已完成",
        date: "2024-03-15",
      },
      {
        id: "2",
        type: "报账",
        title: "智能车材料费",
        amount: 2450.5,
        status: "已审批",
        date: "2024-04-10",
      },
      {
        id: "3",
        type: "采购",
        title: "购买传感器",
        amount: 899.0,
        status: "待审批",
        date: "2024-04-20",
      },
    ],
    tasks: [
      {
        id: "1",
        title: "电机驱动电路设计",
        description: "设计并测试智能车的电机驱动电路",
        deadline: "2024-05-15",
        priority: "高",
        status: "进行中",
        assignee: "lisi",
      },
      {
        id: "2",
        title: "路径规划算法开发",
        description: "开发智能车的路径规划算法",
        deadline: "2024-05-30",
        priority: "中",
        status: "未开始",
        assignee: "wangwu",
      },
      {
        id: "3",
        title: "机械结构组装",
        description: "组装智能车的机械结构",
        deadline: "2024-06-10",
        priority: "高",
        status: "未开始",
        assignee: null,
      },
      {
        id: "4",
        title: "传感器数据采集",
        description: "采集并处理智能车的传感器数据",
        deadline: "2024-06-20",
        priority: "中",
        status: "未开始",
        assignee: null,
      },
    ],
  },
  {
    id: "2",
    title: "2024年全国大学生电子设计竞赛",
    description:
      "全国大学生电子设计竞赛是教育部高等教育司和工业和信息化部联合举办的全国性大学生学科竞赛，旨在推动高等学校电子信息类专业教学改革，提高学生的创新能力和工程实践能力。",
    status: "报名中",
    level: "省级",
    organizer: "教育部高等教育司、工业和信息化部",
    website: "https://www.nuedc.com.cn",
    startDate: "2024-06-01",
    registrationDeadline: "2024-05-15",
    competitionDate: "2024-08-01",
    endDate: "2024-08-15",
    location: "待定",
    leader: {
      id: "lisi",
      name: "李四",
      avatar: "LS",
    },
    members: [
      {
        id: "lisi",
        name: "李四",
        avatar: "LS",
        role: "队长",
      },
      {
        id: "zhaoliu",
        name: "赵六",
        avatar: "ZL",
        role: "队员",
      },
    ],
    projects: [],
    documents: [
      {
        id: "4",
        title: "2024年电子设计竞赛通知.pdf",
        type: "PDF",
        uploadDate: "2024-04-01",
        uploader: "lisi",
      },
    ],
    finances: [],
    tasks: [],
  },
]

// 模拟实验室成员数据
const labMembers = [
  {
    id: "zhangsan",
    name: "张三",
    avatar: "ZS",
    department: "电子工程系",
    year: "大三",
    skills: ["嵌入式开发", "PCB设计"],
  },
  {
    id: "lisi",
    name: "李四",
    avatar: "LS",
    department: "自动化系",
    year: "大四",
    skills: ["机械设计", "3D建模"],
  },
  {
    id: "wangwu",
    name: "王五",
    avatar: "WW",
    department: "计算机系",
    year: "大三",
    skills: ["软件开发", "算法"],
  },
  {
    id: "zhaoliu",
    name: "赵六",
    avatar: "ZL",
    department: "电子工程系",
    year: "大二",
    skills: ["电路设计", "单片机"],
  },
  {
    id: "sunqi",
    name: "孙七",
    avatar: "SQ",
    department: "计算机系",
    year: "大三",
    skills: ["人工智能", "图像处理"],
  },
  {
    id: "zhouba",
    name: "周八",
    avatar: "ZB",
    department: "自动化系",
    year: "大四",
    skills: ["控制理论", "机器人"],
  },
  {
    id: "wujiu",
    name: "吴九",
    avatar: "WJ",
    department: "电子工程系",
    year: "大二",
    skills: ["传感器", "信号处理"],
  },
  {
    id: "zhengshi",
    name: "郑十",
    avatar: "ZS",
    department: "计算机系",
    year: "大三",
    skills: ["Web开发", "数据库"],
  },
]

// 提取所有可用的技能和年级
const allSkills = Array.from(new Set(labMembers.flatMap((member) => member.skills))).sort()
const allYears = Array.from(new Set(labMembers.map((member) => member.year))).sort()

// 角色列表
const memberRoles = ["队长", "硬件开发", "软件开发", "机械设计", "算法开发", "文档管理", "队员"]

// 任务优先级
const taskPriorities = ["低", "中", "高", "紧急"]

export default function CompetitionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  // 全局编辑模式状态
  const [isEditMode, setIsEditMode] = useState(false)

  // 编辑内容临时存储
  const [editedCompetition, setEditedCompetition] = useState<any>(null)

  // 添加成员对话框状态
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  // 筛选状态
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false)

  // 成员管理对话框状态
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false)
  const [assignTaskDialogOpen, setAssignTaskDialogOpen] = useState(false)
  const [removeMemberDialogOpen, setRemoveMemberDialogOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<any>(null)
  const [newRole, setNewRole] = useState("")

  // 任务分配状态
  const [selectedTask, setSelectedTask] = useState("")
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "中",
  })

  // 获取当前用户角色
  const userRole = getCurrentUserRole()

  const competitionId = params.id as string
  const competition = competitions.find((c) => c.id === competitionId)

  // 过滤已经是竞赛成员的人
  const availableMembers = labMembers.filter((member) => !competition?.members.some((m) => m.id === member.id))

  // 获取未分配的任务
  const unassignedTasks = competition?.tasks.filter((task) => !task.assignee) || []

  // 根据搜索查询和筛选条件过滤成员
  const filteredMembers = availableMembers.filter((member) => {
    // 搜索条件
    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())

    // 技能筛选
    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((skill) => member.skills.includes(skill))

    // 年级筛选
    const matchesYears = selectedYears.length === 0 || selectedYears.includes(member.year)

    return matchesSearch && matchesSkills && matchesYears
  })

  // 计算筛选器状态
  const isFiltering = selectedSkills.length > 0 || selectedYears.length > 0
  const activeFilterCount = selectedSkills.length + selectedYears.length

  const handleAddMember = () => {
    setAddMemberDialogOpen(true)
    setSearchQuery("")
    setSelectedRole("")
    setSelectedMembers([])
    setSelectedSkills([])
    setSelectedYears([])
  }

  const handleCreateProject = () => {
    router.push("/projects/create?competition=" + competitionId)
  }

  // 启用编辑模式
  const enableEditMode = () => {
    if (competition) {
      setEditedCompetition({
        title: competition.title,
        description: competition.description,
        status: competition.status,
        level: competition.level,
        organizer: competition.organizer,
        website: competition.website,
        startDate: competition.startDate,
        registrationDeadline: competition.registrationDeadline,
        competitionDate: competition.competitionDate,
        endDate: competition.endDate,
        location: competition.location,
      })
      setIsEditMode(true)
    }
  }

  // 取消编辑
  const cancelEditMode = () => {
    setIsEditMode(false)
    setEditedCompetition(null)
  }

  // 保存所有更改
  const saveAllChanges = () => {
    // 在实际应用中，这里会调用API保存更改
    // 这里我们只是模拟保存成功
    setIsEditMode(false)
    toast({
      title: "保存成功",
      description: "竞赛信息已更新",
    })
  }

  // 处理输入变化
  const handleInputChange = (field: string, value: string) => {
    setEditedCompetition((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 处理成员选择
  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers((prev) => {
      if (prev.includes(memberId)) {
        return prev.filter((id) => id !== memberId)
      } else {
        return [...prev, memberId]
      }
    })
  }

  // 处理技能筛选
  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill)
      } else {
        return [...prev, skill]
      }
    })
  }

  // 处理年级筛选
  const toggleYearFilter = (year: string) => {
    setSelectedYears((prev) => {
      if (prev.includes(year)) {
        return prev.filter((y) => y !== year)
      } else {
        return [...prev, year]
      }
    })
  }

  // 清除所有筛选
  const clearAllFilters = () => {
    setSelectedSkills([])
    setSelectedYears([])
    setFilterPopoverOpen(false)
  }

  // 添加选中的成员
  const addSelectedMembers = () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "请选择成员",
        description: "请至少选择一名成员添加到竞赛",
        variant: "destructive",
      })
      return
    }

    if (!selectedRole) {
      toast({
        title: "请选择角色",
        description: "请为选中的成员指定角色",
        variant: "destructive",
      })
      return
    }

    // 在实际应用中，这里会调用API添加成员
    // 这里我们只是模拟添加成功
    toast({
      title: "添加成功",
      description: `已成功添加 ${selectedMembers.length} 名成员到竞赛`,
    })
    setAddMemberDialogOpen(false)
  }

  // 打开修改角色对话框
  const openEditRoleDialog = (member: any) => {
    setCurrentMember(member)
    setNewRole(member.role)
    setEditRoleDialogOpen(true)
  }

  // 保存角色修改
  const saveRoleChange = () => {
    if (!newRole) {
      toast({
        title: "请选择角色",
        description: "请为成员指定新的角色",
        variant: "destructive",
      })
      return
    }

    // 在实际应用中，这里会调用API更新成员角色
    // 这里我们只是模拟更新成功
    toast({
      title: "角色已更新",
      description: `${currentMember.name} 的角色已更新为 ${newRole}`,
    })
    setEditRoleDialogOpen(false)
  }

  // 打开分配任务对话框
  const openAssignTaskDialog = (member: any) => {
    setCurrentMember(member)
    setSelectedTask("")
    setAssignTaskDialogOpen(true)
  }

  // 保存任务分配
  const saveTaskAssignment = () => {
    if (!selectedTask) {
      toast({
        title: "请选择任务",
        description: "请为成员选择要分配的任务",
        variant: "destructive",
      })
      return
    }

    // 在实际应用中，这里会调用API分配任务
    // 这里我们只是模拟分配成功
    toast({
      title: "任务已分配",
      description: `任务已成功分配给 ${currentMember.name}`,
    })
    setAssignTaskDialogOpen(false)
  }

  // 打开创建新任务对话框
  const openNewTaskDialog = () => {
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "中",
    })
    setNewTaskDialogOpen(true)
  }

  // 保存新任务
  const saveNewTask = () => {
    if (!newTask.title) {
      toast({
        title: "请输入任务标题",
        description: "任务标题不能为空",
        variant: "destructive",
      })
      return
    }

    if (!newTask.deadline) {
      toast({
        title: "请选择截止日期",
        description: "请为任务设置截止日期",
        variant: "destructive",
      })
      return
    }

    // 在实际应用中，这里会调用API创建任务
    // 这里我们只是模拟创建成功
    toast({
      title: "任务已创建",
      description: `新任务 "${newTask.title}" 已创建并分配给 ${currentMember.name}`,
    })
    setNewTaskDialogOpen(false)
  }

  // 打开移除成员对话框
  const openRemoveMemberDialog = (member: any) => {
    setCurrentMember(member)
    setRemoveMemberDialogOpen(true)
  }

  // 确认移除成员
  const confirmRemoveMember = () => {
    // 在实际应用中，这里会调用API移除成员
    // 这里我们只是模拟移除成功
    toast({
      title: "成员已移除",
      description: `${currentMember.name} 已从竞赛中移除`,
    })
    setRemoveMemberDialogOpen(false)
  }

  // 处理新任务输入变化
  const handleNewTaskChange = (field: string, value: string) => {
    setNewTask((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (!competition) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">竞赛不存在</h2>
            <p className="mt-2 text-muted-foreground">找不到请求的竞赛</p>
            <Button className="mt-4" asChild>
              <Link href="/competitions">返回竞赛列表</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // 计算剩余天数
  const calculateRemainingDays = (targetDate: string) => {
    const target = new Date(targetDate)
    const today = new Date()
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const registrationDaysLeft = calculateRemainingDays(competition.registrationDeadline)
  const competitionDaysLeft = calculateRemainingDays(competition.competitionDate)
  const endDaysLeft = calculateRemainingDays(competition.endDate)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">首页</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/competitions">竞赛管理</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/competitions/${competition.id}`}>{competition.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/competitions" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              返回竞赛列表
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-3">
              {isEditMode ? (
                <Input
                  value={editedCompetition?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-2xl font-bold h-auto py-1"
                  autoFocus
                />
              ) : (
                <h1 className="text-2xl font-bold tracking-tight">{competition.title}</h1>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="px-2.5 py-0.5">{competition.status}</Badge>
                <Badge variant="outline" className="px-2.5 py-0.5">
                  {competition.level}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {competition.startDate} 至 {competition.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>负责人: {competition.leader.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              {isEditMode ? (
                <>
                  <Button variant="outline" size="sm" onClick={cancelEditMode}>
                    取消
                  </Button>
                  <Button size="sm" onClick={saveAllChanges}>
                    保存更改
                  </Button>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      操作
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={enableEditMode}>编辑竞赛信息</DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleAddMember}>添加成员</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCreateProject}>创建关联项目</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/finance/purchases/create?competition=${competition.id}`}>创建采购申请</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/finance/reimbursements/create?competition=${competition.id}`}>创建报账申请</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">删除竞赛</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-muted/50 p-0.5 rounded-lg">
            <TabsTrigger
              value="overview"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              概览
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              关联项目
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              参与成员
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              相关文件
            </TabsTrigger>
            <TabsTrigger
              value="finances"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              财务记录
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>竞赛描述</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditMode ? (
                  <Textarea
                    value={editedCompetition?.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={5}
                    className="w-full mb-4"
                  />
                ) : (
                  <p>{competition.description}</p>
                )}
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">主办方</p>
                    {isEditMode ? (
                      <Input
                        value={editedCompetition?.organizer || ""}
                        onChange={(e) => handleInputChange("organizer", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <p>{competition.organizer}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">竞赛地点</p>
                    {isEditMode ? (
                      <Input
                        value={editedCompetition?.location || ""}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <p>{competition.location}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">官方网站</p>
                    {isEditMode ? (
                      <Input
                        value={editedCompetition?.website || ""}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={competition.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {competition.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">报名截止</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-1">
                    {isEditMode ? (
                      <Input
                        type="date"
                        value={editedCompetition?.registrationDeadline || ""}
                        onChange={(e) => handleInputChange("registrationDeadline", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <div className="text-2xl font-bold">{competition.registrationDeadline}</div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {registrationDaysLeft > 0 ? `还剩 ${registrationDaysLeft} 天` : "已截止"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">比赛日期</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-1">
                    {isEditMode ? (
                      <Input
                        type="date"
                        value={editedCompetition?.competitionDate || ""}
                        onChange={(e) => handleInputChange("competitionDate", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <div className="text-2xl font-bold">{competition.competitionDate}</div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {competitionDaysLeft > 0 ? `还剩 ${competitionDaysLeft} 天` : "已开始"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">竞赛结束</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-1">
                    {isEditMode ? (
                      <Input
                        type="date"
                        value={editedCompetition?.endDate || ""}
                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <div className="text-2xl font-bold">{competition.endDate}</div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {endDaysLeft > 0 ? `还剩 ${endDaysLeft} 天` : "已结束"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>参与成员</CardTitle>
                  <CardDescription>竞赛团队成员</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {competition.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Link href={`/community/members/${member.id}`} className="font-medium hover:underline">
                              {member.name}
                            </Link>
                            <Badge variant="outline">{member.role}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full gap-1" onClick={handleAddMember}>
                      <Plus className="h-4 w-4" />
                      添加成员
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>关联项目</CardTitle>
                  <CardDescription>与竞赛相关的项目</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {competition.projects.length > 0 ? (
                      competition.projects.map((project) => (
                        <div key={project.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Link href={`/projects/${project.id}`} className="font-medium hover:underline">
                              {project.title}
                            </Link>
                            <span className="text-sm text-muted-foreground">截止: {project.deadline}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">进度</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <p className="text-muted-foreground mb-4">暂无关联项目</p>
                        <Button size="sm" onClick={handleCreateProject}>
                          创建项目
                        </Button>
                      </div>
                    )}
                    {competition.projects.length > 0 && (
                      <Button variant="outline" size="sm" className="w-full gap-1" onClick={handleCreateProject}>
                        <Plus className="h-4 w-4" />
                        创建项目
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6 space-y-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">关联项目列表</h2>
              <Button size="sm" onClick={handleCreateProject}>
                <Plus className="mr-2 h-4 w-4" />
                创建项目
              </Button>
            </div>
            {competition.projects.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {competition.projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">进度</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>截止日期: {project.deadline}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-2">
                      <Button variant="outline" size="sm" className="gap-1" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <FolderKanban className="h-4 w-4" />
                          详情
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="flex h-40 items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <p className="text-muted-foreground">暂无关联项目</p>
                  <Button size="sm" onClick={handleCreateProject}>
                    创建第一个项目
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="members" className="mt-6 space-y-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">参与成员列表</h2>
              <Button size="sm" onClick={handleAddMember}>
                <Plus className="mr-2 h-4 w-4" />
                添加成员
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {competition.members.map((member) => (
                <Card key={member.id} className="border shadow-sm hover:shadow transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Link href={`/community/members/${member.id}`} className="font-medium hover:underline">
                            {member.name}
                          </Link>
                          <Badge variant="outline">{member.role}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full">
                            管理
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => openEditRoleDialog(member)}>修改角色</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => openAssignTaskDialog(member)}>分配任务</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onSelect={() => openRemoveMemberDialog(member)}
                          >
                            移除成员
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6 space-y-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">相关文件列表</h2>
              <Button size="sm" asChild>
                <Link href="/documents/upload">
                  <Plus className="mr-2 h-4 w-4" />
                  上传文件
                </Link>
              </Button>
            </div>
            {competition.documents.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                  <div className="col-span-5">文件名</div>
                  <div className="col-span-2">类型</div>
                  <div className="col-span-2">上传者</div>
                  <div className="col-span-2">上传日期</div>
                  <div className="col-span-1">操作</div>
                </div>
                {competition.documents.map((doc) => (
                  <div key={doc.id} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/50">
                    <div className="col-span-5 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <Link href={`/documents/${doc.id}`} className="hover:text-primary">
                        {doc.title}
                      </Link>
                    </div>
                    <div className="col-span-2 text-muted-foreground">{doc.type}</div>
                    <div className="col-span-2 text-muted-foreground">
                      {competition.members.find((m) => m.id === doc.uploader)?.name || "未知"}
                    </div>
                    <div className="col-span-2 text-muted-foreground">{doc.uploadDate}</div>
                    <div className="col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">操作</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/documents/${doc.id}`}>查看</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>下载</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="flex h-40 items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <p className="text-muted-foreground">暂无相关文件</p>
                  <Button size="sm" asChild>
                    <Link href="/documents/upload">上传第一个文件</Link>
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="finances" className="mt-6 space-y-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">财务记录</h2>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link href={`/finance/purchases/create?competition=${competition.id}`}>
                    <Plus className="mr-2 h-4 w-4" />
                    创建采购申请
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/finance/reimbursements/create?competition=${competition.id}`}>
                    <Plus className="mr-2 h-4 w-4" />
                    创建报账申请
                  </Link>
                </Button>
              </div>
            </div>
            {competition.finances.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                  <div className="col-span-5">申请标题</div>
                  <div className="col-span-2">类型</div>
                  <div className="col-span-2">金额</div>
                  <div className="col-span-2">状态</div>
                  <div className="col-span-1">操作</div>
                </div>
                {competition.finances.map((finance) => (
                  <div key={finance.id} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/50">
                    <div className="col-span-5 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href={`/finance/${finance.type === "采购" ? "purchases" : "reimbursements"}/${finance.id}`}
                        className="hover:text-primary"
                      >
                        {finance.title}
                      </Link>
                    </div>
                    <div className="col-span-2 text-muted-foreground">{finance.type}</div>
                    <div className="col-span-2 text-muted-foreground">¥{finance.amount.toFixed(2)}</div>
                    <div className="col-span-2">
                      <Badge
                        variant={
                          finance.status === "已完成"
                            ? "secondary"
                            : finance.status === "已审批"
                              ? "default"
                              : "outline"
                        }
                      >
                        {finance.status}
                      </Badge>
                    </div>
                    <div className="col-span-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href={`/finance/${finance.type === "采购" ? "purchases" : "reimbursements"}/${finance.id}`}
                        >
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">查看详情</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="flex h-40 items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <p className="text-muted-foreground">暂无财务记录</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" asChild>
                      <Link href={`/finance/purchases/create?competition=${competition.id}`}>创建采购申请</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/finance/reimbursements/create?competition=${competition.id}`}>创建报账申请</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* 添加成员对话框 */}
      <Dialog open={addMemberDialogOpen} onOpenChange={setAddMemberDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>添加竞赛成员</DialogTitle>
            <DialogDescription>从实验室成员中选择添加到竞赛团队</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索成员姓名或部门..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* 筛选器按钮 */}
              <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={isFiltering ? "relative bg-muted" : "relative"}
                    aria-label="筛选成员"
                  >
                    <Filter className="h-4 w-4" />
                    {activeFilterCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="border-b p-3 flex items-center justify-between">
                    <h4 className="font-medium">筛选成员</h4>
                    {isFiltering && (
                      <Button variant="ghost" size="sm" className="h-8 px-2" onClick={clearAllFilters}>
                        清除全部
                      </Button>
                    )}
                  </div>
                  <div className="p-3 space-y-4">
                    <div>
                      <h5 className="mb-2 text-sm font-medium">技能</h5>
                      <div className="flex flex-wrap gap-2">
                        {allSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant={selectedSkills.includes(skill) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleSkillFilter(skill)}
                          >
                            {skill}
                            {selectedSkills.includes(skill) && <X className="ml-1 h-3 w-3" />}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-2 text-sm font-medium">年级</h5>
                      <div className="flex flex-wrap gap-2">
                        {allYears.map((year) => (
                          <Badge
                            key={year}
                            variant={selectedYears.includes(year) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleYearFilter(year)}
                          >
                            {year}
                            {selectedYears.includes(year) && <X className="ml-1 h-3 w-3" />}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  {memberRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 显示活跃的筛选条件 */}
            {isFiltering && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">筛选条件:</span>
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button onClick={() => toggleSkillFilter(skill)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedYears.map((year) => (
                  <Badge key={year} variant="secondary" className="gap-1">
                    {year}
                    <button onClick={() => toggleYearFilter(year)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {isFiltering && (
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={clearAllFilters}>
                    清除全部
                  </Button>
                )}
              </div>
            )}

            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-2 p-3 font-medium border-b">
                <div className="col-span-1"></div>
                <div className="col-span-3">姓名</div>
                <div className="col-span-3">部门</div>
                <div className="col-span-2">年级</div>
                <div className="col-span-3">技能</div>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="grid grid-cols-12 gap-2 p-3 border-b hover:bg-muted/50 items-center"
                    >
                      <div className="col-span-1 flex justify-center">
                        <Checkbox
                          id={`member-${member.id}`}
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={() => toggleMemberSelection(member.id)}
                        />
                      </div>
                      <div className="col-span-3 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <label htmlFor={`member-${member.id}`} className="font-medium cursor-pointer hover:underline">
                          {member.name}
                        </label>
                      </div>
                      <div className="col-span-3 text-sm text-muted-foreground">{member.department}</div>
                      <div className="col-span-2 text-sm text-muted-foreground">{member.year}</div>
                      <div className="col-span-3 flex flex-wrap gap-1">
                        {member.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">未找到匹配的成员</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                已选择 {selectedMembers.length} 名成员
                {selectedMembers.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0 text-sm"
                    onClick={() => setSelectedMembers([])}
                  >
                    清除
                  </Button>
                )}
              </p>
              {selectedMembers.length > 0 && !selectedRole && <p className="text-sm text-destructive">请选择角色</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMemberDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={addSelectedMembers} disabled={selectedMembers.length === 0 || !selectedRole}>
              添加成员
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 修改角色对话框 */}
      <Dialog open={editRoleDialogOpen} onOpenChange={setEditRoleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>修改成员角色</DialogTitle>
            <DialogDescription>为 {currentMember?.name} 分配新的角色</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{currentMember?.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentMember?.name}</p>
                  <p className="text-sm text-muted-foreground">当前角色: {currentMember?.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">选择新角色</Label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    {memberRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditRoleDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={saveRoleChange} disabled={!newRole}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 分配任务对话框 */}
      <Dialog open={assignTaskDialogOpen} onOpenChange={setAssignTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>分配任务</DialogTitle>
            <DialogDescription>为 {currentMember?.name} 分配任务</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{currentMember?.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentMember?.name}</p>
                  <p className="text-sm text-muted-foreground">角色: {currentMember?.role}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="task">选择任务</Label>
                  <Button variant="ghost" size="sm" onClick={openNewTaskDialog}>
                    <Plus className="mr-1 h-3 w-3" />
                    创建新任务
                  </Button>
                </div>

                {unassignedTasks.length > 0 ? (
                  <RadioGroup value={selectedTask} onValueChange={setSelectedTask}>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                      {unassignedTasks.map((task) => (
                        <div key={task.id} className="flex items-start space-x-2 p-2 hover:bg-muted/50 rounded-md">
                          <RadioGroupItem value={task.id} id={`task-${task.id}`} className="mt-1" />
                          <div className="grid gap-1 w-full">
                            <Label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer">
                              {task.title}
                            </Label>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                              <span>截止日期: {task.deadline}</span>
                              <Badge
                                variant={
                                  task.priority === "高" || task.priority === "紧急"
                                    ? "destructive"
                                    : task.priority === "中"
                                      ? "default"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                    <p className="text-muted-foreground mb-2">暂无未分配的任务</p>
                    <Button size="sm" onClick={openNewTaskDialog}>
                      创建新任务
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignTaskDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={saveTaskAssignment} disabled={!selectedTask && unassignedTasks.length > 0}>
              分配任务
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 创建新任务对话框 */}
      <Dialog open={newTaskDialogOpen} onOpenChange={setNewTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>创建新任务</DialogTitle>
            <DialogDescription>创建新任务并分配给 {currentMember?.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">任务标题</Label>
              <Input
                id="task-title"
                value={newTask.title}
                onChange={(e) => handleNewTaskChange("title", e.target.value)}
                placeholder="输入任务标题"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description">任务描述</Label>
              <Textarea
                id="task-description"
                value={newTask.description}
                onChange={(e) => handleNewTaskChange("description", e.target.value)}
                placeholder="输入任务描述"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-deadline">截止日期</Label>
                <Input
                  id="task-deadline"
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => handleNewTaskChange("deadline", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-priority">优先级</Label>
                <Select value={newTask.priority} onValueChange={(value) => handleNewTaskChange("priority", value)}>
                  <SelectTrigger id="task-priority">
                    <SelectValue placeholder="选择优先级" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskPriorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTaskDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={saveNewTask} disabled={!newTask.title || !newTask.deadline}>
              创建并分配
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 移除成员确认对话框 */}
      <AlertDialog open={removeMemberDialogOpen} onOpenChange={setRemoveMemberDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认移除成员</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要将 <span className="font-medium">{currentMember?.name}</span>{" "}
              从竞赛中移除吗？此操作无法撤销，该成员的所有任务将变为未分配状态。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveMember}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              确认移除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
