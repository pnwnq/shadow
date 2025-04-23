import type { Metadata } from "next"
import { ChevronDown, Filter, Package, Plus, SlidersHorizontal } from "lucide-react"

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
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "物品管理 | Shadow 实验室管理系统",
  description: "Shadow 实验室管理系统物品管理页面",
}

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">物品管理</h1>
          <div className="flex items-center gap-2">
            <Button className="gap-1">
              <Plus className="size-4" />
              添加物品
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="space-y-4 md:w-1/4 lg:w-1/5">
            <div className="rounded-lg border p-4">
              <h2 className="mb-2 font-semibold">物品分类</h2>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start font-normal">
                  所有物品
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  开发板
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  传感器
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  电子元件
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  工具
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
          </div>
          <div className="space-y-4 md:w-3/4 lg:w-4/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="size-4" />
                      筛选
                      <ChevronDown className="size-4" />
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <SlidersHorizontal className="size-4" />
                      排序
                      <ChevronDown className="size-4" />
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
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Package className="size-4" />
                  借用物品
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Package className="size-4" />
                  归还物品
                </Button>
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
                      <CardTitle className="text-base">Arduino Uno</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="size-4" />
                        <span>开发板</span>
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
                            <ChevronDown className="size-4" />
                            <span className="sr-only">操作</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>借用</DropdownMenuItem>
                          <DropdownMenuItem>编辑信息</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">树莓派4B</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="size-4" />
                        <span>开发板</span>
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
                            <ChevronDown className="size-4" />
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
                      <CardTitle className="text-base">超声波传感器</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="size-4" />
                        <span>传感器</span>
                        <Separator orientation="vertical" className="h-4" />
                        <Badge variant="outline" className="rounded-sm">
                          在库
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <span className="text-xs text-muted-foreground">库存: 12</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="size-4" />
                            <span className="sr-only">操作</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>借用</DropdownMenuItem>
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
      </main>
    </div>
  )
}
