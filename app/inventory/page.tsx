import type { Metadata } from "next"
import Link from "next/link"
import {
  ChevronDown,
  Filter,
  Package,
  Plus,
  SlidersHorizontal,
  Smartphone,
  Scan,
  History,
  User,
  Users,
  ScanLine,
  RotateCcw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "物品管理 | Shadow 实验室管理系统",
  description: "Shadow 实验室管理系统物品管理页面",
}

export default function InventoryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">物品管理</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/inventory/scan-nfc">
              <Smartphone className="h-4 w-4 mr-2" />
              NFC扫描
            </Link>
          </Button>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            添加物品
          </Button>
        </div>
      </div>

      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="admin" className="flex-1">
            <Users className="h-4 w-4 mr-2" />
            实验室物品管理
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex-1">
            <User className="h-4 w-4 mr-2" />
            我的物品借用
          </TabsTrigger>
        </TabsList>

        <TabsContent value="admin" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1" asChild>
                    <Link href="/inventory/scan-nfc?action=borrow">
                      <Smartphone className="h-5 w-5 mb-1" />
                      <span>借用物品</span>
                      <span className="text-xs text-muted-foreground">使用NFC</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1" asChild>
                    <Link href="/inventory/scan-nfc?action=return">
                      <Scan className="h-5 w-5 mb-1" />
                      <span>归还物品</span>
                      <span className="text-xs text-muted-foreground">使用NFC</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1" asChild>
                    <Link href="/inventory/scan-nfc?action=check">
                      <Package className="h-5 w-5 mb-1" />
                      <span>查看物品</span>
                      <span className="text-xs text-muted-foreground">使用NFC</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-1" asChild>
                    <Link href="/inventory/history">
                      <History className="h-5 w-5 mb-1" />
                      <span>借用记录</span>
                      <span className="text-xs text-muted-foreground">查看历史</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">物品状态概览</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-2xl font-bold text-green-600">42</span>
                  <span className="text-sm text-muted-foreground">在库物品</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <span className="text-2xl font-bold text-amber-600">15</span>
                  <span className="text-sm text-muted-foreground">借出物品</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-2xl font-bold text-red-600">3</span>
                  <span className="text-sm text-muted-foreground">维修中</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="md:w-1/4 lg:w-1/5 space-y-4">
              <div className="rounded-lg border p-4">
                <h2 className="mb-2 font-semibold">物品分类</h2>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    所有物品
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    机器人套件
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    传感器模块
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    电机驱动
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    控制器
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    其他
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h2 className="mb-2 font-semibold">状态</h2>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    在库
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    借出
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    维修中
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h2 className="mb-2 font-semibold">NFC标签</h2>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    已绑定NFC
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    未绑定NFC
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:w-3/4 lg:w-4/5 space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:w-64">
                  <Input placeholder="搜索物品..." className="pl-8" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Filter className="h-4 w-4" />
                        筛选
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>位置</DropdownMenuLabel>
                      <DropdownMenuItem>A区储物柜</DropdownMenuItem>
                      <DropdownMenuItem>B区储物柜</DropdownMenuItem>
                      <DropdownMenuItem>C区储物柜</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>购入时间</DropdownMenuLabel>
                      <DropdownMenuItem>本月</DropdownMenuItem>
                      <DropdownMenuItem>今年</DropdownMenuItem>
                      <DropdownMenuItem>去年</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>NFC标签</DropdownMenuLabel>
                      <DropdownMenuItem>已绑定NFC</DropdownMenuItem>
                      <DropdownMenuItem>未绑定NFC</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <SlidersHorizontal className="h-4 w-4" />
                        排序
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>名称 (A-Z)</DropdownMenuItem>
                      <DropdownMenuItem>名称 (Z-A)</DropdownMenuItem>
                      <DropdownMenuItem>购入时间 (最新)</DropdownMenuItem>
                      <DropdownMenuItem>购入时间 (最早)</DropdownMenuItem>
                      <DropdownMenuItem>借用次数 (多到少)</DropdownMenuItem>
                      <DropdownMenuItem>借用次数 (少到多)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="instock">在库</TabsTrigger>
                  <TabsTrigger value="borrowed">借出</TabsTrigger>
                  <TabsTrigger value="maintenance">维修中</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center justify-between">
                          <span>STM32开发板</span>
                          <Badge variant="outline" className="bg-blue-50">
                            NFC
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Package className="h-4 w-4" />
                          <span>控制器</span>
                          <Separator orientation="vertical" className="h-4" />
                          <Badge variant="outline" className="rounded-sm">
                            在库
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <span className="text-xs text-muted-foreground">库存: 5</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">操作</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>查看详情</DropdownMenuItem>
                            <DropdownMenuItem>NFC借用</DropdownMenuItem>
                            <DropdownMenuItem>编辑信息</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center justify-between">
                          <span>四足机器人套件</span>
                          <Badge variant="outline" className="bg-blue-50">
                            NFC
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Package className="h-4 w-4" />
                          <span>机器人套件</span>
                          <Separator orientation="vertical" className="h-4" />
                          <Badge variant="secondary" className="rounded-sm">
                            借出
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <span className="text-xs text-muted-foreground">库存: 0/2</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">操作</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>查看详情</DropdownMenuItem>
                            <DropdownMenuItem>查看借用记录</DropdownMenuItem>
                            <DropdownMenuItem>编辑信息</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">激光雷达传感器</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Package className="h-4 w-4" />
                          <span>传感器模块</span>
                          <Separator orientation="vertical" className="h-4" />
                          <Badge variant="outline" className="rounded-sm">
                            在库
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <span className="text-xs text-muted-foreground">库存: 3</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">操作</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>查看详情</DropdownMenuItem>
                            <DropdownMenuItem>借用</DropdownMenuItem>
                            <DropdownMenuItem>绑定NFC标签</DropdownMenuItem>
                            <DropdownMenuItem>编辑信息</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personal" className="space-y-4">
          {/* 这里嵌入成员视图的内容 */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ScanLine className="h-5 w-5 text-primary" />
                  快速借用
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">使用NFC标签快速借用物品</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/inventory/scan-nfc?mode=borrow">开始扫描</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  快速归还
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">使用NFC标签快速归还物品</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/inventory/scan-nfc?mode=return">开始扫描</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  我的借用历史
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">查看您的借用和归还记录</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/inventory/member/history">查看历史</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>我当前借用的物品</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img src="/stm32_microcontroller.png" alt="Arduino套件" className="object-cover w-full h-full" />
                    <Badge className="absolute top-2 right-2 bg-yellow-500">已借用</Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl">Arduino套件</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex justify-between text-sm">
                      <span>借用日期: 2023-07-01</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>归还期限: 2023-07-15</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/inventory/items/item3">查看详情</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/inventory/scan-nfc?mode=return&itemId=item3">归还</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>可借用物品</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img src="/stm32_microcontroller.png" alt="STM32开发板" className="object-cover w-full h-full" />
                    <Badge variant="outline" className="absolute top-2 right-2 gap-1 bg-blue-50">
                      <Smartphone className="h-3 w-3" />
                      NFC
                    </Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl">STM32开发板</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>控制器</span>
                      <span>A区-3柜-2层</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/inventory/items/item1">查看详情</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/inventory/borrow/item1">借用</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img src="/oscilloscope.png" alt="示波器" className="object-cover w-full h-full" />
                    <Badge variant="outline" className="absolute top-2 right-2 gap-1 bg-blue-50">
                      <Smartphone className="h-3 w-3" />
                      NFC
                    </Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl">示波器</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>测量设备</span>
                      <span>B区-1柜-1层</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/inventory/items/item2">查看详情</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/inventory/borrow/item2">借用</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
