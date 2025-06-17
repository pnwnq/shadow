import Link from "next/link"
import { CreditCard, Download, Plus, Search, Filter, ArrowUpRight, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FinancePage() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">财务管理</h1>
          <p className="text-muted-foreground">管理报销申请、采购申请和预算</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            导出报表
          </Button>
          <Button size="sm" asChild>
            <Link href="/finance/reimbursements/create">
              <Plus className="mr-2 h-4 w-4" />
              新建报销
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月支出</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥12,450</div>
            <p className="text-xs text-muted-foreground">较上月 +15%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待审批金额</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥3,280</div>
            <p className="text-xs text-muted-foreground">5个待审批申请</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">预算使用率</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
              <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">剩余预算</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥6,750</div>
            <p className="text-xs text-muted-foreground">本月预算 ¥20,000</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reimbursements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reimbursements">报销申请</TabsTrigger>
          <TabsTrigger value="purchases">采购申请</TabsTrigger>
          <TabsTrigger value="budget">预算管理</TabsTrigger>
        </TabsList>

        <TabsContent value="reimbursements" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索报销申请..." className="pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                筛选
              </Button>
            </div>
            <Button asChild>
              <Link href="/finance/reimbursements/create">
                <Plus className="mr-2 h-4 w-4" />
                新建报销
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>报销申请列表</CardTitle>
              <CardDescription>管理所有报销申请及其状态</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-8 p-3 text-sm font-medium bg-muted/50">
                  <div className="col-span-2">申请标题</div>
                  <div>申请人</div>
                  <div>金额</div>
                  <div>关联项目</div>
                  <div>关联竞赛</div>
                  <div>状态</div>
                  <div>操作</div>
                </div>
                <Separator />
                <div className="grid grid-cols-8 p-3 text-sm items-center">
                  <div className="col-span-2 font-medium">电子元件采购</div>
                  <div>李明</div>
                  <div>¥1,280</div>
                  <div>机器视觉识别</div>
                  <div>电子设计竞赛</div>
                  <div>
                    <Badge variant="outline">待审批</Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-8 p-3 text-sm items-center">
                  <div className="col-span-2 font-medium">竞赛材料费</div>
                  <div>王华</div>
                  <div>¥850</div>
                  <div>智能家居系统</div>
                  <div>互联网+大赛</div>
                  <div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      已批准
                    </Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-8 p-3 text-sm items-center">
                  <div className="col-span-2 font-medium">项目耗材</div>
                  <div>张伟</div>
                  <div>¥420</div>
                  <div>无人机控制系统</div>
                  <div>-</div>
                  <div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                      已报销
                    </Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-8 p-3 text-sm items-center">
                  <div className="col-span-2 font-medium">差旅费</div>
                  <div>刘芳</div>
                  <div>¥1,560</div>
                  <div>-</div>
                  <div>挑战杯科技竞赛</div>
                  <div>
                    <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                      已拒绝
                    </Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-8 p-3 text-sm items-center">
                  <div className="col-span-2 font-medium">设备维修费</div>
                  <div>赵明</div>
                  <div>¥350</div>
                  <div>智能家居系统</div>
                  <div>-</div>
                  <div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                      已报销
                    </Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-6">
              <div className="text-sm text-muted-foreground">显示 1-5 条，共 12 条</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  上一页
                </Button>
                <Button variant="outline" size="sm">
                  下一页
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="purchases" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索采购申请..." className="pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                筛选
              </Button>
            </div>
            <Button asChild>
              <Link href="/finance/purchases/create">
                <Plus className="mr-2 h-4 w-4" />
                新建采购
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>采购申请列表</CardTitle>
              <CardDescription>管理所有采购申请及其状态</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-8 p-3 text-sm font-medium bg-muted/50">
                  <div className="col-span-2">申请标题</div>
                  <div>申请人</div>
                  <div>预估金额</div>
                  <div>关联项目</div>
                  <div>关联竞赛</div>
                  <div>状态</div>
                  <div>操作</div>
                </div>
                <Separator />
                <div className="grid grid-cols-8 p-3 text-sm items-center">
                  <div className="col-span-2 font-medium">传感器采购</div>
                  <div>张伟</div>
                  <div>¥2,500</div>
                  <div>智能家居系统</div>
                  <div>-</div>
                  <div>
                    <Badge variant="outline">待审批</Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-8 p-3 text-sm items-center">
                  <div className="col-span-2 font-medium">开发板批量采购</div>
                  <div>李明</div>
                  <div>¥4,800</div>
                  <div>机器视觉识别</div>
                  <div>电子设计竞赛</div>
                  <div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      已批准
                    </Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-8 p-3 text-sm items-center">
                  <div className="col-span-2 font-medium">电机与驱动器</div>
                  <div>王华</div>
                  <div>¥1,200</div>
                  <div>无人机控制系统</div>
                  <div>-</div>
                  <div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                      已采购
                    </Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      查看
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-6">
              <div className="text-sm text-muted-foreground">显示 1-3 条，共 8 条</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  上一页
                </Button>
                <Button variant="outline" size="sm">
                  下一页
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select defaultValue="current">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择预算周期" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">当前月度 (11月)</SelectItem>
                  <SelectItem value="previous">上个月 (10月)</SelectItem>
                  <SelectItem value="q4">第四季度</SelectItem>
                  <SelectItem value="annual">2023年度</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              导出预算报表
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>预算概览</CardTitle>
              <CardDescription>查看各类别预算使用情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">材料费</p>
                      <div className="text-sm text-muted-foreground">已使用 ¥8,500 / ¥12,000</div>
                    </div>
                    <div className="text-sm font-medium">70.8%</div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "70.8%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">设备费</p>
                      <div className="text-sm text-muted-foreground">已使用 ¥2,800 / ¥5,000</div>
                    </div>
                    <div className="text-sm font-medium">56%</div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "56%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">差旅费</p>
                      <div className="text-sm text-muted-foreground">已使用 ¥1,150 / ¥3,000</div>
                    </div>
                    <div className="text-sm font-medium">38.3%</div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "38.3%" }}></div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">总预算</p>
                      <div className="text-sm text-muted-foreground">已使用 ¥12,450 / ¥20,000</div>
                    </div>
                    <div className="text-sm font-medium">62.3%</div>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "62.3%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>项目预算分配</CardTitle>
                <CardDescription>各项目预算使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">智能家居系统</p>
                      <div className="text-sm font-medium">¥5,200 / ¥8,000</div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">机器视觉识别</p>
                      <div className="text-sm font-medium">¥4,100 / ¥6,000</div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "68.3%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">无人机控制系统</p>
                      <div className="text-sm font-medium">¥3,150 / ¥6,000</div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "52.5%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>竞赛预算分配</CardTitle>
                <CardDescription>各竞赛预算使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">全国大学生电子设计竞赛</p>
                      <div className="text-sm font-medium">¥6,800 / ¥10,000</div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">互联网+创新创业大赛</p>
                      <div className="text-sm font-medium">¥3,200 / ¥5,000</div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "64%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">挑战杯科技竞赛</p>
                      <div className="text-sm font-medium">¥2,450 / ¥5,000</div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "49%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
