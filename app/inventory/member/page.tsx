"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  ScanLine,
  ArrowDownUp,
  Smartphone,
  RotateCcw,
  Package,
  History,
  Clock,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function InventoryMemberPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("available")

  // 模拟物品数据
  const items = [
    {
      id: "item1",
      name: "STM32开发板",
      category: "开发板",
      status: "available",
      image: "/stm32_microcontroller.png",
      hasNfc: true,
      location: "A区-3柜-2层",
      lastBorrowed: "2023-05-15",
    },
    {
      id: "item2",
      name: "示波器",
      category: "测量设备",
      status: "available",
      image: "/oscilloscope.png",
      hasNfc: true,
      location: "B区-1柜-1层",
      lastBorrowed: "2023-06-20",
    },
    {
      id: "item3",
      name: "Arduino套件",
      category: "开发板",
      status: "borrowed",
      image: "/placeholder-hoo7b.png",
      hasNfc: true,
      borrowedBy: "我",
      borrowDate: "2023-07-01",
      dueDate: "2023-07-15",
      location: "A区-2柜-3层",
    },
    {
      id: "item4",
      name: "万用表",
      category: "测量设备",
      status: "available",
      image: "/placeholder.svg?height=100&width=100&query=multimeter",
      hasNfc: true,
      location: "C区-4柜-2层",
      lastBorrowed: "2023-04-10",
    },
    {
      id: "item5",
      name: "树莓派4B",
      category: "开发板",
      status: "borrowed",
      image: "/placeholder.svg?height=100&width=100&query=raspberry+pi",
      hasNfc: true,
      borrowedBy: "张三",
      borrowDate: "2023-06-25",
      dueDate: "2023-07-10",
      location: "A区-1柜-4层",
    },
    {
      id: "item6",
      name: "焊接工具套装",
      category: "工具",
      status: "pending",
      image: "/placeholder.svg?height=100&width=100&query=soldering+kit",
      hasNfc: false,
      requestDate: "2023-07-02",
      location: "D区-2柜-1层",
    },
  ]

  // 模拟借用历史
  const borrowHistory = [
    {
      id: "history1",
      itemName: "示波器",
      borrowDate: "2023-06-01",
      returnDate: "2023-06-05",
      status: "returned",
    },
    {
      id: "history2",
      itemName: "Arduino套件",
      borrowDate: "2023-07-01",
      dueDate: "2023-07-15",
      status: "active",
    },
    {
      id: "history3",
      itemName: "万用表",
      borrowDate: "2023-05-10",
      returnDate: "2023-05-12",
      status: "returned",
    },
    {
      id: "history4",
      itemName: "焊接工具套装",
      requestDate: "2023-07-02",
      status: "pending",
    },
  ]

  // 过滤物品
  const filteredItems = items.filter((item) => {
    // 搜索过滤
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // 标签页过滤
    if (activeTab === "available" && item.status !== "available") return false
    if (activeTab === "borrowed" && item.status !== "borrowed") return false
    if (activeTab === "pending" && item.status !== "pending") return false

    return true
  })

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">物品借用</h1>
          <p className="text-lg text-muted-foreground">浏览、借用和归还实验室物品</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/inventory/scan-nfc")} className="gap-2 px-6 py-2.5">
            <ScanLine className="h-4 w-4" />
            <span className="hidden sm:inline">NFC扫描</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/inventory/member/history")}
            className="gap-2 px-6 py-2.5"
          >
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">借用历史</span>
          </Button>
        </div>
      </div>

      {/* 快速操作卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-4 space-y-3">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ScanLine className="h-6 w-6 text-primary" />
              </div>
              快速借用
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">使用NFC标签快速借用物品</CardDescription>
          </CardHeader>
          <CardFooter className="pt-0">
            <Button className="w-full py-2.5" onClick={() => router.push("/inventory/scan-nfc?mode=borrow")}>
              开始扫描
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-4 space-y-3">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
              快速归还
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">使用NFC标签快速归还物品</CardDescription>
          </CardHeader>
          <CardFooter className="pt-0">
            <Button className="w-full py-2.5" onClick={() => router.push("/inventory/scan-nfc?mode=return")}>
              开始扫描
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-4 space-y-3">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              我的借用
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">查看当前借用的物品</CardDescription>
          </CardHeader>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full py-2.5" onClick={() => setActiveTab("borrowed")}>
              查看详情
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索物品名称或类别..."
            className="pl-10 py-2.5 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 px-4 py-2.5">
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
              <Button variant="outline" className="gap-2 px-4 py-2.5">
                <ArrowDownUp className="h-4 w-4" />
                排序
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>名称 (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>名称 (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>类别</DropdownMenuItem>
              <DropdownMenuItem>最近借用</DropdownMenuItem>
              <DropdownMenuItem>位置</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 物品列表 */}
      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-muted/50">
          <TabsTrigger value="available" className="text-base font-medium">
            可借用
          </TabsTrigger>
          <TabsTrigger value="borrowed" className="text-base font-medium">
            已借用
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-base font-medium">
            申请中
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">没有可借用的物品</h3>
              <p className="text-base text-muted-foreground max-w-md mx-auto">尝试调整搜索条件或查看其他分类</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-200 border-0 shadow-md group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                    />
                    {item.hasNfc && (
                      <Badge variant="secondary" className="absolute top-3 right-3 gap-1.5 px-2.5 py-1">
                        <Smartphone className="h-3 w-3" />
                        NFC
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="p-5 pb-3 space-y-2">
                    <CardTitle className="text-xl font-semibold leading-tight">{item.name}</CardTitle>
                    <CardDescription className="flex justify-between text-base">
                      <span className="font-medium text-muted-foreground">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.location}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-5 pt-0 flex justify-between gap-3">
                    <Button variant="outline" asChild className="flex-1">
                      <Link href={`/inventory/items/${item.id}`}>查看详情</Link>
                    </Button>
                    <Button onClick={() => router.push(`/inventory/borrow/${item.id}`)} className="flex-1">
                      借用
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="borrowed" className="mt-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">没有已借用的物品</h3>
              <p className="mt-2 text-sm text-muted-foreground">您当前没有借用任何物品</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-yellow-500">已借用</Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription>
                      <div className="flex justify-between">
                        <span>借用日期: {item.borrowDate}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>归还期限: {item.dueDate}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-2 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/inventory/items/${item.id}`}>查看详情</Link>
                    </Button>
                    <Button onClick={() => router.push(`/inventory/scan-nfc?mode=return&itemId=${item.id}`)}>
                      归还
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">没有申请中的物品</h3>
              <p className="mt-2 text-sm text-muted-foreground">您当前没有正在申请的物品</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                    <Badge variant="outline" className="absolute top-2 right-2">
                      申请中
                    </Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription>
                      <div className="flex justify-between">
                        <span>申请日期: {item.requestDate}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>状态: 等待审批</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-2 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/inventory/items/${item.id}`}>查看详情</Link>
                    </Button>
                    <Button variant="secondary" onClick={() => alert("已取消申请")}>
                      取消申请
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* 最近借用历史 */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">最近借用历史</h2>
          <Button variant="ghost" asChild className="text-base">
            <Link href="/inventory/member/history">查看全部</Link>
          </Button>
        </div>

        <ScrollArea className="h-[400px] rounded-lg border bg-card">
          <div className="p-6">
            {borrowHistory.map((history, index) => (
              <div
                key={history.id}
                className={`flex items-center justify-between py-4 ${index !== borrowHistory.length - 1 ? "border-b border-border/50" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48&query=${history.itemName}`} />
                    <AvatarFallback className="text-base font-medium">
                      {history.itemName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-semibold text-base">{history.itemName}</p>
                    <p className="text-sm text-muted-foreground">
                      {history.status === "pending"
                        ? `申请日期: ${history.requestDate}`
                        : `借用日期: ${history.borrowDate}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {history.status === "active" && (
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {history.dueDate}到期
                    </Badge>
                  )}
                  {history.status === "returned" && (
                    <Badge variant="outline" className="gap-1 bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3 w-3" />
                      已归还
                    </Badge>
                  )}
                  {history.status === "pending" && (
                    <Badge variant="outline" className="gap-1">
                      审批中
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
