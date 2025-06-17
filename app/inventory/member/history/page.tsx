"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Search, Filter, Calendar, CheckCircle2, Clock, XCircle, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export default function BorrowHistoryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // 模拟借用历史数据
  const borrowHistory = [
    {
      id: "history1",
      itemId: "item1",
      itemName: "STM32开发板",
      category: "开发板",
      image: "/stm32_microcontroller.png",
      borrowDate: "2023-06-01",
      returnDate: "2023-06-05",
      status: "returned",
      notes: "项目开发使用",
    },
    {
      id: "history2",
      itemId: "item3",
      itemName: "Arduino套件",
      category: "开发板",
      image: "/placeholder.svg?height=100&width=100&query=arduino",
      borrowDate: "2023-07-01",
      dueDate: "2023-07-15",
      status: "active",
      notes: "智能家居项目",
    },
    {
      id: "history3",
      itemId: "item4",
      itemName: "万用表",
      category: "测量设备",
      image: "/placeholder.svg?height=100&width=100&query=multimeter",
      borrowDate: "2023-05-10",
      returnDate: "2023-05-12",
      status: "returned",
      notes: "电路测试",
    },
    {
      id: "history4",
      itemId: "item6",
      itemName: "焊接工具套装",
      category: "工具",
      image: "/placeholder.svg?height=100&width=100&query=soldering+kit",
      requestDate: "2023-07-02",
      status: "pending",
      notes: "PCB焊接",
    },
    {
      id: "history5",
      itemId: "item2",
      itemName: "示波器",
      category: "测量设备",
      image: "/oscilloscope.png",
      borrowDate: "2023-04-15",
      returnDate: "2023-04-20",
      status: "returned",
      notes: "信号分析",
    },
    {
      id: "history6",
      itemId: "item5",
      itemName: "树莓派4B",
      category: "开发板",
      image: "/placeholder.svg?height=100&width=100&query=raspberry+pi",
      borrowDate: "2023-03-10",
      returnDate: "2023-03-25",
      status: "returned",
      notes: "服务器项目",
    },
    {
      id: "history7",
      itemId: "item7",
      itemName: "逻辑分析仪",
      category: "测量设备",
      image: "/placeholder.svg?height=100&width=100&query=logic+analyzer",
      requestDate: "2023-07-03",
      status: "rejected",
      notes: "协议分析",
      rejectReason: "设备已预约",
    },
  ]

  // 过滤历史记录
  const filteredHistory = borrowHistory.filter((history) => {
    // 搜索过滤
    if (
      searchQuery &&
      !history.itemName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !history.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !history.notes.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // 标签页过滤
    if (activeTab === "active" && history.status !== "active") return false
    if (activeTab === "returned" && history.status !== "returned") return false
    if (activeTab === "pending" && history.status !== "pending") return false

    return true
  })

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">借用历史</h1>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索物品名称、类别或备注..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              筛选
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>所有类别</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>开发板</DropdownMenuItem>
            <DropdownMenuItem>测量设备</DropdownMenuItem>
            <DropdownMenuItem>工具</DropdownMenuItem>
            <DropdownMenuItem>电子元件</DropdownMenuItem>
            <DropdownMenuItem>其他</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              时间
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>全部时间</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>本周</DropdownMenuItem>
            <DropdownMenuItem>本月</DropdownMenuItem>
            <DropdownMenuItem>过去3个月</DropdownMenuItem>
            <DropdownMenuItem>过去6个月</DropdownMenuItem>
            <DropdownMenuItem>过去1年</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 历史记录标签页 */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="active">借用中</TabsTrigger>
          <TabsTrigger value="returned">已归还</TabsTrigger>
          <TabsTrigger value="pending">申请中</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">没有找到借用记录</h3>
              <p className="mt-2 text-sm text-muted-foreground">尝试调整搜索条件或查看其他分类</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((history) => (
                <Card key={history.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-[120px] h-[120px] rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={history.image || "/placeholder.svg"}
                          alt={history.itemName}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <h3 className="text-lg font-medium">{history.itemName}</h3>
                          {history.status === "active" && (
                            <Badge className="gap-1 w-fit">
                              <Clock className="h-3 w-3" />
                              借用中
                            </Badge>
                          )}
                          {history.status === "returned" && (
                            <Badge
                              variant="outline"
                              className="gap-1 bg-green-50 text-green-700 border-green-200 w-fit"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              已归还
                            </Badge>
                          )}
                          {history.status === "pending" && (
                            <Badge variant="outline" className="gap-1 w-fit">
                              <Clock className="h-3 w-3" />
                              审批中
                            </Badge>
                          )}
                          {history.status === "rejected" && (
                            <Badge variant="outline" className="gap-1 bg-red-50 text-red-700 border-red-200 w-fit">
                              <XCircle className="h-3 w-3" />
                              已拒绝
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mt-1">类别: {history.category}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mt-3">
                          {history.status === "pending" ? (
                            <p className="text-sm">申请日期: {history.requestDate}</p>
                          ) : (
                            <p className="text-sm">借用日期: {history.borrowDate}</p>
                          )}

                          {history.status === "returned" && <p className="text-sm">归还日期: {history.returnDate}</p>}

                          {history.status === "active" && <p className="text-sm">归还期限: {history.dueDate}</p>}

                          {history.notes && <p className="text-sm md:col-span-2 mt-1">备注: {history.notes}</p>}

                          {history.rejectReason && (
                            <p className="text-sm md:col-span-2 mt-1 text-red-600">拒绝原因: {history.rejectReason}</p>
                          )}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/inventory/items/${history.itemId}`}>查看物品</Link>
                          </Button>

                          {history.status === "active" && (
                            <Button
                              size="sm"
                              onClick={() => router.push(`/inventory/scan-nfc?mode=return&itemId=${history.itemId}`)}
                            >
                              归还物品
                            </Button>
                          )}

                          {history.status === "pending" && (
                            <Button variant="secondary" size="sm" onClick={() => alert("已取消申请")}>
                              取消申请
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
