"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  Calendar,
  Download,
  FileText,
  MessageSquare,
  Star,
  Trophy,
  Users,
  CheckCircle2,
  ArrowLeft,
  Plus,
  ExternalLink,
  Receipt,
  Package,
  ChevronDown,
  Filter,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 临时模拟函数，实际应用中应从 auth-utils 导入
const getCurrentUserRole = () => {
  return "member" // 可以是 "admin", "finance_admin", "member" 等
}

// 模拟项目数据
const projectsData = {
  "1": {
    id: "1",
    title: "智能家居系统",
    description:
      "基于Arduino和ESP8266的智能家居控制系统，实现灯光、温度、湿度等环境参数的监控和控制。该项目旨在为实验室成员提供物联网开发实践的机会，同时打造一个可用于日常生活的智能家居解决方案。",
    status: "进行中",
    leader: {
      id: "zhangsan",
      name: "张三",
      avatar: "/abstract-zs.png",
      role: "项目负责人",
    },
    members: [
      { id: "lisi", name: "李四", avatar: "/abstract-geometric-ls.png", role: "开发工程师" },
      { id: "wangwu", name: "王五", avatar: "/double-w-abstract.png", role: "硬件工程师" },
      { id: "zhaoliu", name: "赵六", avatar: "/abstract-geometric-zl.png", role: "测试工程师" },
    ],
    tasks: [
      { id: "task1", title: "需求分析", completed: true, assignee: "张三" },
      { id: "task2", title: "系统设计", completed: true, assignee: "张三" },
      { id: "task3", title: "硬件开发", completed: false, assignee: "王五" },
      { id: "task4", title: "软件开发", completed: false, assignee: "李四" },
      { id: "task5", title: "集成测试", completed: false, assignee: "赵六" },
      { id: "task6", title: "用户测试", completed: false, assignee: "赵六" },
      { id: "task7", title: "文档编写", completed: false, assignee: "张三" },
    ],
    documents: [
      { id: "doc1", title: "项目计划书.pdf", type: "pdf", size: "2.3 MB", date: "2024-03-15" },
      { id: "doc2", title: "系统设计文档.docx", type: "docx", size: "1.5 MB", date: "2024-03-30" },
      { id: "doc3", title: "硬件原理图.dwg", type: "dwg", size: "4.2 MB", date: "2024-04-05" },
    ],
    discussions: [
      {
        id: "disc1",
        author: "张三",
        avatar: "/abstract-zs.png",
        date: "2024-04-01",
        content: "我们需要讨论一下温度传感器的选型问题，DHT11的精度可能不够，考虑使用DHT22。",
        replies: [
          {
            id: "reply1",
            author: "李四",
            avatar: "/abstract-geometric-ls.png",
            date: "2024-04-01 14:30",
            content: "我同意，DHT22的精度更高，价格也可以接受.",
          },
          {
            id: "reply2",
            author: "王五",
            avatar: "/double-w-abstract.png",
            date: "2024-04-01 15:45",
            content: "我已经做了一些测试，DHT22在我们的使用场景下表现更好.",
          },
          {
            id: "reply3",
            author: "赵六",
            avatar: "/abstract-geometric-zl.png",
            date: "2024-04-01 16:20",
            content: "我可以负责更新原理图和PCB设计.",
          },
        ],
      },
      {
        id: "disc2",
        author: "李四",
        avatar: "/abstract-geometric-ls.png",
        date: "2024-04-03",
        content: "APP界面设计已经完成，请大家查看并提出修改意见。",
        replies: [
          {
            id: "reply4",
            author: "张三",
            avatar: "/abstract-zs.png",
            date: "2024-04-03 10:15",
            content: "界面看起来不错，但我建议在首页添加实时数据展示.",
          },
          {
            id: "reply5",
            author: "王五",
            avatar: "/double-w-abstract.png",
            date: "2024-04-03 11:30",
            content: "同意张三的建议，用户需要直观地看到传感器数据.",
          },
        ],
      },
    ],
    relatedCompetitions: [
      { id: "1", title: "2024年全国大学生智能车竞赛", level: "国家级", status: "进行中" },
      { id: "2", title: "2024年全国大学生电子设计竞赛", level: "省级", status: "报名中" },
    ],
    items: [
      { id: "item1", name: "Arduino Uno R3", category: "控制器", quantity: 5, status: "已入库" },
      { id: "item2", name: "DHT22温湿度传感器", category: "传感器", quantity: 10, status: "已入库" },
      { id: "item3", name: "ESP8266 WiFi模块", category: "通信模块", quantity: 8, status: "已入库" },
      { id: "item4", name: "继电器模块", category: "执行器", quantity: 6, status: "已入库" },
    ],
    inventory: [
      {
        id: "1",
        name: "Arduino Mega 2560",
        status: "借出",
        borrower: "lisi",
        borrowDate: "2024-03-10",
        returnDate: "2024-05-10",
        category: "开发板",
      },
      {
        id: "2",
        name: "电机驱动模块",
        status: "借出",
        borrower: "wangwu",
        borrowDate: "2024-03-15",
        returnDate: "2024-05-15",
        category: "电子模块",
      },
      {
        id: "3",
        name: "摄像头模块",
        status: "借出",
        borrower: "zhangsan",
        borrowDate: "2024-03-20",
        returnDate: "2024-05-20",
        category: "传感器",
      },
      {
        id: "4",
        name: "超声波传感器",
        status: "借出",
        borrower: "lisi",
        borrowDate: "2024-04-05",
        returnDate: "2024-06-05",
        category: "传感器",
      },
      {
        id: "5",
        name: "树莓派4B",
        status: "借出",
        borrower: "zhaoliu",
        borrowDate: "2024-04-10",
        returnDate: "2024-06-10",
        category: "开发板",
      },
    ],
    expenses: [
      {
        id: "exp1",
        title: "Arduino开发板采购",
        amount: 350,
        status: "已报销",
        submitter: "王五",
        date: "2024-03-20",
        items: ["Arduino Uno R3 x5"],
      },
      {
        id: "exp2",
        title: "传感器模块采购",
        amount: 420,
        status: "审核中",
        submitter: "李四",
        date: "2024-04-05",
        items: ["DHT22温湿度传感器 x10", "ESP8266 WiFi模块 x8"],
      },
      {
        id: "exp3",
        title: "执行器模块采购",
        amount: 180,
        status: "待提交",
        submitter: "王五",
        date: "2024-04-10",
        items: ["继电器模块 x6"],
      },
    ],
    awards: [{ id: "award1", title: "校级创新项目一等奖", date: "2023-12", issuer: "XX大学" }],
  },
  // 其他项目数据保持不变...
  "2": {
    id: "2",
    title: "环境监测站",
    description: "使用多种传感器采集环境数据，并通过无线网络传输到云端进行分析和可视化。",
    status: "进行中",
    leader: {
      id: "lisi",
      name: "李四",
      avatar: "/abstract-geometric-ls.png",
      role: "项目负责人",
    },
    members: [{ id: "wangwu", name: "王五", avatar: "/double-w-abstract.png", role: "硬件工程师" }],
    tasks: [
      { id: "task1", title: "需求分析", completed: true, assignee: "李四" },
      { id: "task2", title: "系统设计", completed: true, assignee: "李四" },
      { id: "task3", title: "硬件开发", completed: false, assignee: "王五" },
      { id: "task4", title: "软件开发", completed: false, assignee: "李四" },
      { id: "task5", title: "测试部署", completed: false, assignee: "王五" },
    ],
    documents: [
      { id: "doc1", title: "项目计划书.pdf", type: "pdf", size: "1.8 MB", date: "2024-04-01" },
      { id: "doc2", title: "系统设计文档.docx", type: "docx", size: "1.2 MB", date: "2024-04-20" },
    ],
    discussions: [
      {
        id: "disc1",
        author: "李四",
        avatar: "/abstract-geometric-ls.png",
        date: "2024-04-25",
        content: "我们需要确定使用哪种无线通信方式，是WiFi还是LoRa？",
        replies: 1,
      },
    ],
    relatedCompetitions: [{ id: "2", title: "2024年全国大学生电子设计竞赛", level: "省级", status: "报名中" }],
    items: [
      { id: "item1", name: "气压传感器", category: "传感器", quantity: 3, status: "已入库" },
      { id: "item2", name: "温湿度传感器", category: "传感器", quantity: 3, status: "已入库" },
      { id: "item3", name: "ESP32开发板", category: "控制器", quantity: 2, status: "已入库" },
    ],
    inventory: [
      {
        id: "1",
        name: "气压传感器",
        status: "借出",
        borrower: "lisi",
        borrowDate: "2024-04-01",
        returnDate: "2024-06-01",
        category: "传感器",
      },
      {
        id: "2",
        name: "ESP32开发板",
        status: "借出",
        borrower: "wangwu",
        borrowDate: "2024-04-05",
        returnDate: "2024-06-05",
        category: "开发板",
      },
    ],
    expenses: [
      {
        id: "exp1",
        title: "传感器采购",
        amount: 280,
        status: "已报销",
        submitter: "李四",
        date: "2024-04-10",
        items: ["气压传感器 x3", "温湿度传感器 x3"],
      },
      {
        id: "exp2",
        title: "开发板采购",
        amount: 160,
        status: "审核中",
        submitter: "王五",
        date: "2024-04-15",
        items: ["ESP32开发板 x2"],
      },
    ],
    awards: [],
  },
  "3": {
    id: "3",
    title: "四足机器人",
    description: "开发一款四足机器人，实现复杂地形的自主行走和障碍物避障功能。",
    status: "规划中",
    leader: {
      id: "wangwu",
      name: "王五",
      avatar: "/double-w-abstract.png",
      role: "项目负责人",
    },
    members: [
      { id: "zhangsan", name: "张三", avatar: "/abstract-zs.png", role: "算法工程师" },
      { id: "lisi", name: "李四", avatar: "/abstract-geometric-ls.png", role: "软件工程师" },
      { id: "zhaoliu", name: "赵六", avatar: "/abstract-geometric-zl.png", role: "机械工程师" },
    ],
    tasks: [
      { id: "task1", title: "需求分析", completed: true, assignee: "王五" },
      { id: "task2", title: "机械设计", completed: false, assignee: "赵六" },
      { id: "task3", title: "电路设计", completed: false, assignee: "王五" },
      { id: "task4", title: "算法开发", completed: false, assignee: "张三" },
      { id: "task5", title: "软件开发", completed: false, assignee: "李四" },
      { id: "task6", title: "集成测试", completed: false, assignee: "王五" },
    ],
    documents: [{ id: "doc1", title: "项目计划书.pdf", type: "pdf", size: "2.5 MB", date: "2024-05-01" }],
    discussions: [],
    relatedCompetitions: [{ id: "1", title: "2024年全国大学生智能车竞赛", level: "国家级", status: "进行中" }],
    items: [],
    inventory: [],
    expenses: [],
    awards: [],
  },
  "4": {
    id: "4",
    title: "视觉SLAM导航系统",
    description: "基于视觉SLAM技术的室内导航系统，可用于机器人自主定位和路径规划。",
    status: "已完成",
    leader: {
      id: "zhangsan",
      name: "张三",
      avatar: "/abstract-zs.png",
      role: "项目负责人",
    },
    members: [
      { id: "lisi", name: "李四", avatar: "/abstract-geometric-ls.png", role: "软件工程师" },
      { id: "wangwu", name: "王五", avatar: "/double-w-abstract.png", role: "算法工程师" },
    ],
    tasks: [
      { id: "task1", title: "需求分析", completed: true, assignee: "张三" },
      { id: "task2", title: "算法研究", completed: true, assignee: "王五" },
      { id: "task3", title: "系统设计", completed: true, assignee: "张三" },
      { id: "task4", title: "软件开发", completed: true, assignee: "李四" },
      { id: "task5", title: "系统测试", completed: true, assignee: "王五" },
      { id: "task6", title: "文档编写", completed: true, assignee: "张三" },
    ],
    documents: [
      { id: "doc1", title: "项目计划书.pdf", type: "pdf", size: "2.1 MB", date: "2023-10-01" },
      { id: "doc2", title: "系统设计文档.docx", type: "docx", size: "1.8 MB", date: "2023-11-30" },
      { id: "doc3", title: "算法说明.pdf", type: "pdf", size: "3.5 MB", date: "2023-11-15" },
      { id: "doc4", title: "用户手册.pdf", type: "pdf", size: "1.2 MB", date: "2024-02-28" },
      { id: "doc5", title: "测试报告.docx", type: "docx", size: "2.3 MB", date: "2024-02-15" },
    ],
    discussions: [
      {
        id: "disc1",
        author: "张三",
        avatar: "/abstract-zs.png",
        date: "2023-12-10",
        content: "我们需要讨论一下如何优化特征点提取算法，当前的性能不太理想。",
        replies: 5,
      },
      {
        id: "disc2",
        author: "王五",
        avatar: "/double-w-abstract.png",
        date: "2024-01-05",
        content: "关于回环检测的问题，我有一些新的想法，可以显著提高准确率。",
        replies: 3,
      },
      {
        id: "disc3",
        author: "李四",
        avatar: "/abstract-geometric-ls.png",
        date: "2024-01-20",
        content: "UI界面已经完成，请大家测试一下使用体验。",
        replies: 2,
      },
    ],
    relatedCompetitions: [
      { id: "1", title: "2024年全国大学生智能车竞赛", level: "国家级", status: "进行中" },
      { id: "2", title: "2024年全国大学生电子设计竞赛", level: "省级", status: "报名中" },
    ],
    items: [
      { id: "item1", name: "Intel RealSense相机", category: "传感器", quantity: 2, status: "已入库" },
      { id: "item2", name: "Jetson Nano开发板", category: "计算平台", quantity: 2, status: "已入库" },
      { id: "item3", name: "移动底盘", category: "机械部件", quantity: 1, status: "已入库" },
    ],
    inventory: [
      {
        id: "1",
        name: "Intel RealSense相机",
        status: "已归还",
        borrower: "zhangsan",
        borrowDate: "2023-10-15",
        returnDate: "2024-02-15",
        category: "传感器",
      },
      {
        id: "2",
        name: "Jetson Nano开发板",
        status: "已归还",
        borrower: "lisi",
        borrowDate: "2023-10-20",
        returnDate: "2024-02-20",
        category: "开发板",
      },
      {
        id: "3",
        name: "移动底盘",
        status: "已归还",
        borrower: "wangwu",
        borrowDate: "2023-11-05",
        returnDate: "2024-02-05",
        category: "机械部件",
      },
    ],
    expenses: [
      {
        id: "exp1",
        title: "相机设备采购",
        amount: 1200,
        status: "已报销",
        submitter: "张三",
        date: "2023-10-15",
        items: ["Intel RealSense相机 x2"],
      },
      {
        id: "exp2",
        title: "计算平台采购",
        amount: 1600,
        status: "已报销",
        submitter: "李四",
        date: "2023-10-20",
        items: ["Jetson Nano开发板 x2"],
      },
      {
        id: "exp3",
        title: "移动底盘采购",
        amount: 800,
        status: "已报销",
        submitter: "王五",
        date: "2023-11-05",
        items: ["移动底盘 x1"],
      },
    ],
    awards: [
      { id: "award1", title: "省级科技创新二等奖", date: "2024-03", issuer: "XX省科技厅" },
      { id: "award2", title: "校级优秀项目", date: "2024-01", issuer: "XX大学" },
    ],
  },
}

// 物品分类列表
const itemCategories = ["全部", "开发板", "传感器", "电子模块", "机械部件", "工具", "其他"]

export default function ProjectPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [newTask, setNewTask] = useState("")
  const [newTaskAssignee, setNewTaskAssignee] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [newDiscussion, setNewDiscussion] = useState("")
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [expandedDiscussions, setExpandedDiscussions] = useState<string[]>([])
  const [replyContents, setReplyContents] = useState<{ [key: string]: string }>({})
  const [showAwards, setShowAwards] = useState(false)
  const discussionRef = useRef<HTMLDivElement>(null)

  // 物品管理相关状态
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false)
  const [borrowItemDialogOpen, setBorrowItemDialogOpen] = useState(false)
  const [returnItemDialogOpen, setReturnItemDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [borrowDuration, setBorrowDuration] = useState("30")

  // 获取当前用户角色
  const userRole = getCurrentUserRole()
  // 根据用户角色确定物品链接
  const inventoryLink = userRole === "admin" || userRole === "finance_admin" ? "/inventory" : "/inventory/member"

  // 获取项目数据
  const project = projectsData[id as string]

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] p-6">
        <h1 className="text-2xl font-bold mb-4">项目不存在</h1>
        <p className="text-muted-foreground mb-6">无法找到ID为 {id} 的项目</p>
        <Button asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回项目列表
          </Link>
        </Button>
      </div>
    )
  }

  // 计算任务完成情况
  const completedTasks = project.tasks.filter((task) => task.completed).length
  const totalTasks = project.tasks.length
  const taskCompletionRate = Math.round((completedTasks / totalTasks) * 100) || 0

  // 处理添加任务
  const handleAddTask = () => {
    if (newTask.trim() && newTaskAssignee.trim()) {
      toast({
        title: "添加成功",
        description: `任务"${newTask}"已添加`,
      })
      setNewTask("")
      setNewTaskAssignee("")
      setNewTaskDescription("")
      setIsAddTaskOpen(false)
    } else {
      toast({
        title: "添加失败",
        description: "任务名称和负责人不能为空",
        variant: "destructive",
      })
    }
  }

  // 处理添加讨论
  const handleAddDiscussion = () => {
    if (newDiscussion.trim()) {
      toast({
        title: "发布成功",
        description: "您的讨论已发布",
      })
      setNewDiscussion("")
    } else {
      toast({
        title: "发布失败",
        description: "讨论内容不能为空",
        variant: "destructive",
      })
    }
  }

  // 处理任务状态变更
  const handleTaskStatusChange = (taskId: string, completed: boolean) => {
    toast({
      title: completed ? "任务已完成" : "任务已重置",
      description: `任务状态已更新`,
    })
  }

  // 添加处理讨论展开/折叠的函数
  const toggleDiscussionReplies = (discussionId: string) => {
    setExpandedDiscussions((prev) =>
      prev.includes(discussionId) ? prev.filter((id) => id !== discussionId) : [...prev, discussionId],
    )
  }

  // 添加处理回复内容变更的函数
  const handleReplyContentChange = (discussionId: string, content: string) => {
    setReplyContents((prev) => ({
      ...prev,
      [discussionId]: content,
    }))
  }

  // 添加提交回复的函数
  const submitReply = (discussionId: string) => {
    const content = replyContents[discussionId]
    if (!content?.trim()) {
      toast({
        title: "回复失败",
        description: "回复内容不能为空",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "回复成功",
      description: "您的回复已发布",
    })

    // 清空回复框
    setReplyContents((prev) => ({
      ...prev,
      [discussionId]: "",
    }))
  }

  // 添加滚动到讨论区的函数
  const scrollToDiscussion = () => {
    discussionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // 物品管理相关函数
  const filteredInventory = project.inventory.filter((item) => {
    // 搜索条件
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())

    // 分类筛选
    const matchesCategory = selectedCategory === "全部" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 打开借用物品对话框
  const openBorrowItemDialog = () => {
    setBorrowItemDialogOpen(true)
  }

  // 处理借用物品
  const handleBorrowItem = () => {
    toast({
      title: "借用申请已提交",
      description: "您的物品借用申请已提交，等待管理员审批",
    })
    setBorrowItemDialogOpen(false)
  }

  // 打开归还物品对话框
  const openReturnItemDialog = (item: any) => {
    setSelectedItem(item)
    setReturnItemDialogOpen(true)
  }

  // 处理归还物品
  const handleReturnItem = () => {
    toast({
      title: "归还申请已提交",
      description: "您的物品归还申请已提交，等待管理员确认",
    })
    setReturnItemDialogOpen(false)
  }

  // 清除筛选条件
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("全部")
  }

  return (
    <div className="space-y-6 p-6 md:p-8">

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="hover:bg-muted">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  project.status === "进行中"
                    ? "default"
                    : project.status === "规划中"
                      ? "secondary"
                      : project.status === "已完成"
                        ? "outline"
                        : "default"
                }
                className="px-2.5 py-0.5 text-sm"
              >
                {project.status}
              </Badge>
              <span className="text-sm text-muted-foreground">负责人: {project.leader.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/projects/${id}/documents/upload`}>
                <FileText className="mr-2 h-4 w-4" />
                上传文件
              </Link>
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              添加任务
            </Button>
          </div>
        </div>
      </div>

      {/* 项目讨论区 - 放在顶部显眼位置 */}
      <Card className="border border-primary/30 shadow-sm bg-card/50" ref={discussionRef}>
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            项目讨论
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-6">
          <div className="space-y-6">
            <div className="space-y-4">
              {project.discussions.length > 0 ? (
                project.discussions.map((discussion) => (
                  <div key={discussion.id} className="p-4 border rounded-lg bg-background shadow-sm">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                        <AvatarFallback>{discussion.author.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{discussion.author}</p>
                          <span className="text-sm text-muted-foreground">{discussion.date}</span>
                        </div>
                        <p className="mt-2">{discussion.content}</p>
                        <div className="flex items-center gap-4 mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1"
                            onClick={() => toggleDiscussionReplies(discussion.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            {expandedDiscussions.includes(discussion.id)
                              ? "收起回复"
                              : `查看回复 (${Array.isArray(discussion.replies) ? discussion.replies.length : discussion.replies})`}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Star className="h-4 w-4" />
                            收藏
                          </Button>
                        </div>
                        {expandedDiscussions.includes(discussion.id) && (
                          <div className="mt-4 ml-10 space-y-4 border-l-2 border-muted pl-4 py-2">
                            {Array.isArray(discussion.replies) &&
                              discussion.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="p-3 border rounded-md bg-muted/20 hover:bg-muted/30 transition-colors"
                                >
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
                                      <AvatarFallback>{reply.author.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <p className="font-medium">{reply.author}</p>
                                        <span className="text-xs text-muted-foreground">{reply.date}</span>
                                      </div>
                                      <p className="mt-1 text-sm">{reply.content}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}

                            <div className="flex gap-3 mt-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>您</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <Textarea
                                  placeholder="添加回复..."
                                  className="min-h-[80px]"
                                  value={replyContents[discussion.id] || ""}
                                  onChange={(e) => handleReplyContentChange(discussion.id, e.target.value)}
                                />
                                <Button size="sm" onClick={() => submitReply(discussion.id)}>
                                  发布回复
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">暂无讨论，开始一个新话题吧</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">发表讨论</h3>
              <Textarea
                placeholder="在这里输入您的讨论内容..."
                className="min-h-[100px]"
                value={newDiscussion}
                onChange={(e) => setNewDiscussion(e.target.value)}
              />
              <Button onClick={handleAddDiscussion}>发布讨论</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="tasks">任务清单</TabsTrigger>
          <TabsTrigger value="documents">文件</TabsTrigger>
          <TabsTrigger value="inventory">物品管理</TabsTrigger>
          <TabsTrigger value="expenses">报账</TabsTrigger>
          <TabsTrigger value="more">更多</TabsTrigger>
        </TabsList>

        {/* 概览标签页 */}
        <TabsContent value="overview" className="space-y-6 pt-2">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">项目阶段</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {project.status === "规划中" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">规划阶段</div>
                    <Badge variant="secondary" className="w-fit px-3 py-1 text-sm">
                      初始阶段
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">项目正处于规划和准备阶段</p>
                  </div>
                )}
                {project.status === "进行中" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">执行阶段</div>
                    <Badge variant="default" className="w-fit px-3 py-1 text-sm">
                      进行中
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">项目正在积极开发和实施中</p>
                  </div>
                )}
                {project.status === "已完成" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">完成阶段</div>
                    <Badge variant="outline" className="w-fit px-3 py-1 text-sm">
                      已完成
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">项目已成功完成所有任务</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">任务完成</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completedTasks}/{totalTasks}
                </div>
                <Progress value={taskCompletionRate} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">已完成 {taskCompletionRate}% 的任务</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">团队成员</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{project.members.length + 1}</div>
                <div className="flex -space-x-2 mt-2">
                  <Avatar className="border-2 border-background">
                    <AvatarImage src={project.leader.avatar || "/placeholder.svg"} alt={project.leader.name} />
                    <AvatarFallback>{project.leader.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {project.members.slice(0, 3).map((member) => (
                    <Avatar key={member.id} className="border-2 border-background">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {project.members.length > 3 && (
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>+{project.members.length - 3}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{project.leader.name} 及其团队</p>
              </CardContent>
            </Card>
          </div>

          {project.awards && project.awards.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>项目奖项</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowAwards(!showAwards)}>
                  {showAwards ? "收起" : "展开"}
                </Button>
              </CardHeader>
              {showAwards && (
                <CardContent>
                  <div className="space-y-4">
                    {project.awards.map((award) => (
                      <div key={award.id} className="flex items-start gap-3 p-3 border rounded-md">
                        <Trophy className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-medium">{award.title}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {award.date} · {award.issuer}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${id}/awards/add`}>
                          <Plus className="mr-2 h-4 w-4" />
                          添加奖项
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>项目描述</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>关联竞赛</CardTitle>
              </CardHeader>
              <CardContent>
                {project.relatedCompetitions.length > 0 ? (
                  <div className="space-y-3">
                    {project.relatedCompetitions.map((competition) => (
                      <div key={competition.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex flex-col">
                          <div className="font-medium">{competition.title}</div>
                          <div className="text-sm text-muted-foreground">级别: {competition.level}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{competition.status}</Badge>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/competitions/${competition.id}`}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">暂无关联竞赛</p>
                    <Button className="mt-4" size="sm" onClick={() => router.push("/competitions")}>
                      关联竞赛
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 任务清单标签页 */}
        <TabsContent value="tasks" className="space-y-6 pt-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>任务清单</CardTitle>
              <Button size="sm" onClick={() => setIsAddTaskOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                添加任务
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={(checked) => handleTaskStatusChange(task.id, checked === true)}
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground">负责人: {task.assignee}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 添加任务对话框 */}
          <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>添加新任务</DialogTitle>
                <DialogDescription>为项目添加新的任务项目</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="task-name">任务名称</Label>
                  <Input
                    id="task-name"
                    placeholder="输入任务名称"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="task-assignee">负责人</Label>
                  <Input
                    id="task-assignee"
                    placeholder="输入负责人姓名"
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="task-description">任务描述</Label>
                  <Textarea
                    id="task-description"
                    placeholder="输入任务详细描述（可选）"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleAddTask}>添加</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* 文件标签页 */}
        <TabsContent value="documents" className="space-y-6 pt-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>项目文件</CardTitle>
              <Button size="sm" asChild>
                <Link href={`/projects/${id}/documents/upload`}>
                  <Plus className="mr-2 h-4 w-4" />
                  上传文件
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>上传于 {doc.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      下载
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 物品管理标签页 */}
        <TabsContent value="inventory" className="space-y-6 pt-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>项目物品管理</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link href={inventoryLink}>
                    <Plus className="mr-2 h-4 w-4" />
                    借用物品
                  </Link>
                </Button>
                <Button size="sm" variant="outline" onClick={openBorrowItemDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  登记物品
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 搜索和筛选 */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索物品名称或分类..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* 筛选器按钮 */}
                  <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" className="relative" aria-label="筛选物品">
                        <Filter className="h-4 w-4" />
                        {selectedCategory !== "全部" && (
                          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                            1
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-0" align="end">
                      <div className="border-b p-3 flex items-center justify-between">
                        <h4 className="font-medium">筛选物品</h4>
                        {selectedCategory !== "全部" && (
                          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={clearFilters}>
                            清除筛选
                          </Button>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">物品分类</h5>
                          <div className="space-y-1">
                            {itemCategories.map((category) => (
                              <div
                                key={category}
                                className={`px-2 py-1 rounded-md cursor-pointer hover:bg-muted ${selectedCategory === category ? "bg-muted" : ""
                                  }`}
                                onClick={() => setSelectedCategory(category)}
                              >
                                {category}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 物品列表 */}
                {filteredInventory.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                      <div className="col-span-4">物品名称</div>
                      <div className="col-span-2">分类</div>
                      <div className="col-span-2">状态</div>
                      <div className="col-span-2">借用人</div>
                      <div className="col-span-2">操作</div>
                    </div>
                    {filteredInventory.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/50">
                        <div className="col-span-4 flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="col-span-2 text-muted-foreground">{item.category}</div>
                        <div className="col-span-2">
                          <Badge
                            variant={
                              item.status === "借出" ? "default" : item.status === "已归还" ? "outline" : "secondary"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-muted-foreground">
                          {project.members.find((m) => m.id === item.borrower)?.name ||
                            (item.borrower === project.leader.id ? project.leader.name : "未知")}
                        </div>
                        <div className="col-span-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                操作
                                <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/inventory/${item.id}`}>查看详情</Link>
                              </DropdownMenuItem>
                              {item.status === "借出" && (
                                <DropdownMenuItem onClick={() => openReturnItemDialog(item)}>归还物品</DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">移除记录</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center border rounded-md">
                    <Package className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">暂无物品记录</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchQuery || selectedCategory !== "全部"
                        ? "没有找到符合条件的物品，请尝试其他搜索条件"
                        : "您可以通过借用物品按钮借用实验室物品"}
                    </p>
                    {(searchQuery || selectedCategory !== "全部") && (
                      <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                        清除筛选条件
                      </Button>
                    )}
                    {!searchQuery && selectedCategory === "全部" && (
                      <Button className="mt-4" size="sm" asChild>
                        <Link href={inventoryLink}>借用物品</Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 借用物品对话框 */}
          <Dialog open={borrowItemDialogOpen} onOpenChange={setBorrowItemDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>登记物品</DialogTitle>
                <DialogDescription>为项目登记已借用的物品</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">物品名称</Label>
                  <Input id="item-name" placeholder="输入物品名称" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-category">物品分类</Label>
                  <Select>
                    <SelectTrigger id="item-category">
                      <SelectValue placeholder="选择物品分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemCategories
                        .filter((c) => c !== "全部")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-borrower">借用人</Label>
                  <Select>
                    <SelectTrigger id="item-borrower">
                      <SelectValue placeholder="选择借用人" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={project.leader.id}>{project.leader.name}</SelectItem>
                      {project.members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="borrow-duration">借用时长（天）</Label>
                  <Select value={borrowDuration} onValueChange={setBorrowDuration}>
                    <SelectTrigger id="borrow-duration">
                      <SelectValue placeholder="选择借用时长" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7天</SelectItem>
                      <SelectItem value="15">15天</SelectItem>
                      <SelectItem value="30">30天</SelectItem>
                      <SelectItem value="60">60天</SelectItem>
                      <SelectItem value="90">90天</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="borrow-date">借用日期</Label>
                  <Input id="borrow-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-notes">备注</Label>
                  <Textarea id="item-notes" placeholder="输入备注信息（可选）" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setBorrowItemDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleBorrowItem}>提交</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 归还物品对话框 */}
          <Dialog open={returnItemDialogOpen} onOpenChange={setReturnItemDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>归还物品</DialogTitle>
                <DialogDescription>归还项目借用的物品</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/30">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedItem?.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>分类: {selectedItem?.category}</span>
                      <span>•</span>
                      <span>
                        借用人:{" "}
                        {project.members.find((m) => m.id === selectedItem?.borrower)?.name ||
                          (selectedItem?.borrower === project.leader.id ? project.leader.name : "未知")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="return-date">归还日期</Label>
                  <Input id="return-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="return-condition">物品状态</Label>
                  <Select defaultValue="good">
                    <SelectTrigger id="return-condition">
                      <SelectValue placeholder="选择物品状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">完好</SelectItem>
                      <SelectItem value="minor">轻微损坏</SelectItem>
                      <SelectItem value="major">严重损坏</SelectItem>
                      <SelectItem value="lost">丢失</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="return-notes">备注</Label>
                  <Textarea id="return-notes" placeholder="输入备注信息（可选）" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setReturnItemDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleReturnItem}>提交归还</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* 报账标签页 */}
        <TabsContent value="expenses" className="space-y-6 pt-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>报账记录</CardTitle>
              <Button size="sm" asChild>
                <Link href={`/projects/${id}/expenses/create`}>
                  <Plus className="mr-2 h-4 w-4" />
                  申请报账
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {project.expenses && project.expenses.length > 0 ? (
                <div className="space-y-4">
                  {project.expenses.map((expense) => (
                    <div key={expense.id} className="border rounded-md overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-muted/20">
                        <div>
                          <h3 className="font-medium">{expense.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            申请人: {expense.submitter} · 申请日期: {expense.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-medium">¥{expense.amount.toFixed(2)}</p>
                          <Badge
                            variant={
                              expense.status === "已报销"
                                ? "outline"
                                : expense.status === "审核中"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {expense.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 border-t">
                        <h4 className="text-sm font-medium mb-2">报销物品</h4>
                        <ul className="space-y-1">
                          {expense.items.map((item, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-end p-3 border-t bg-muted/10">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/projects/${id}/expenses/${expense.id}`}>查看详情</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Receipt className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">暂无报账记录</h3>
                  <p className="text-sm text-muted-foreground mt-1">点击"申请报账"按钮创建报账申请</p>
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    申请报账
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 更多标签页 - 包含低频使用的功能 */}
        <TabsContent value="more" className="space-y-6 pt-2">
          <Tabs defaultValue="team" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="team">团队</TabsTrigger>
              <TabsTrigger value="items">物品</TabsTrigger>
              <TabsTrigger value="awards">奖项</TabsTrigger>
            </TabsList>

            {/* 团队子标签页 */}
            <TabsContent value="team" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>团队成员</CardTitle>
                  <Button size="sm" asChild>
                    <Link href={`/projects/${id}/team/invite`}>
                      <Plus className="mr-2 h-4 w-4" />
                      邀请成员
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 border rounded-md bg-muted/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={project.leader.avatar || "/placeholder.svg"} alt={project.leader.name} />
                        <AvatarFallback>{project.leader.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{project.leader.name}</p>
                          <Badge variant="outline" className="ml-2">
                            项目负责人
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{project.leader.role}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "消息已发送",
                            description: `已向${project.leader.name}发送消息请求`,
                          })
                        }}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        联系
                      </Button>
                    </div>

                    {project.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-4 p-3 border rounded-md">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "消息已发送",
                              description: `已向${member.name}发送消息请求`,
                            })
                          }}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          联系
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 物品子标签页 */}
            <TabsContent value="items" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>项目物品</CardTitle>
                  <Button size="sm" asChild>
                    <Link href={`/projects/${id}/items/register`}>
                      <Plus className="mr-2 h-4 w-4" />
                      登记物品
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {project.items && project.items.length > 0 ? (
                    <div className="border rounded-md overflow-hidden">
                      <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                        <div className="col-span-5">名称</div>
                        <div className="col-span-3">类别</div>
                        <div className="col-span-2">数量</div>
                        <div className="col-span-2">状态</div>
                      </div>
                      {project.items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 p-3 text-sm border-t">
                          <div className="col-span-5">{item.name}</div>
                          <div className="col-span-3">{item.category}</div>
                          <div className="col-span-2">{item.quantity}</div>
                          <div className="col-span-2">
                            <Badge variant="outline">{item.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">暂无物品</h3>
                      <p className="text-sm text-muted-foreground mt-1">点击"登记物品"按钮添加项目物品</p>
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        登记物品
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 奖项子标签页 */}
            <TabsContent value="awards" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>项目奖项</CardTitle>
                  <Button size="sm" onClick={() => router.push(`/projects/${id}/awards/add`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    添加奖项
                  </Button>
                </CardHeader>
                <CardContent>
                  {project.awards && project.awards.length > 0 ? (
                    <div className="space-y-4">
                      {project.awards.map((award) => (
                        <div key={award.id} className="flex items-start gap-3 p-3 border rounded-md">
                          <Trophy className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div className="space-y-1">
                            <p className="font-medium">{award.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              {award.date} · {award.issuer}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">暂无奖项</h3>
                      <p className="text-sm text-muted-foreground mt-1">点击"添加奖项"按钮记录项目获得的奖项</p>
                      <Button className="mt-4" onClick={() => router.push(`/projects/${id}/awards/add`)}>
                        <Plus className="mr-2 h-4 w-4" />
                        添加奖项
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
