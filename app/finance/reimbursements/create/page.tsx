"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, FileText, Check, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function ReimbursementCreatePage() {
  const [title, setTitle] = useState("电子元件采购")
  const [amount, setAmount] = useState("234.00")
  const [description, setDescription] = useState(
    "用于机器视觉识别项目的电子元件采购，包括Arduino开发板、传感器和测距模块等，用于项目原型开发。",
  )

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="hover:bg-muted">
            <Link href="/finance">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">创建报销申请</h1>
        </div>
        <Button size="lg" className="gap-2">
          <Check className="h-4 w-4" />
          提交申请
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle>上传发票/收据</CardTitle>
            <CardDescription>上传发票照片或订单截图，系统将自动识别商品信息和金额</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 text-center hover:bg-muted/50 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">点击上传或拖放文件</p>
                <p className="text-sm text-muted-foreground">支持 JPG, PNG, PDF 格式</p>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                选择文件
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">已上传文件</h3>
                <Button variant="ghost" size="sm" className="h-7 gap-1">
                  <RefreshCw className="h-3.5 w-3.5" />
                  重新识别
                </Button>
              </div>
              <div className="border rounded-md p-3 flex items-start gap-3 bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="rounded-md bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">电子元件采购发票.jpg</p>
                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-700">
                      已识别
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">1.2 MB · 上传于 2分钟前</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">识别结果</h3>
              <div className="border rounded-md p-4 space-y-4 bg-card shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">商家信息</p>
                    <p className="text-xs text-muted-foreground">电子科技有限公司</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">订单号</p>
                    <p className="text-xs text-muted-foreground">E20231128001</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">商品明细</p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-6 text-xs font-medium text-muted-foreground bg-muted/30 p-2 rounded-md">
                      <div className="col-span-3">商品名称</div>
                      <div>数量</div>
                      <div>单价</div>
                      <div>金额</div>
                    </div>
                    <div className="grid grid-cols-6 text-sm p-2 hover:bg-muted/20 rounded-md transition-colors">
                      <div className="col-span-3">Arduino Uno R3 开发板</div>
                      <div>2</div>
                      <div>¥75.00</div>
                      <div>¥150.00</div>
                    </div>
                    <div className="grid grid-cols-6 text-sm p-2 hover:bg-muted/20 rounded-md transition-colors">
                      <div className="col-span-3">DHT11 温湿度传感器</div>
                      <div>5</div>
                      <div>¥12.00</div>
                      <div>¥60.00</div>
                    </div>
                    <div className="grid grid-cols-6 text-sm p-2 hover:bg-muted/20 rounded-md transition-colors">
                      <div className="col-span-3">HC-SR04 超声波测距模块</div>
                      <div>3</div>
                      <div>¥8.00</div>
                      <div>¥24.00</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">总金额</p>
                  <p className="text-lg font-bold">¥234.00</p>
                </div>

                <Button className="w-full gap-2">
                  <Check className="h-4 w-4" />
                  应用识别结果
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle>报销信息</CardTitle>
            <CardDescription>填写报销申请的基本信息和明细</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">报销标题</Label>
              <Input
                id="title"
                placeholder="例如：项目材料采购"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">报销金额 (¥)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">报销类别</Label>
              <Select defaultValue="materials">
                <SelectTrigger id="category">
                  <SelectValue placeholder="选择报销类别" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="materials">材料费</SelectItem>
                  <SelectItem value="travel">差旅费</SelectItem>
                  <SelectItem value="service">服务费</SelectItem>
                  <SelectItem value="equipment">设备费</SelectItem>
                  <SelectItem value="other">其他费用</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">关联项目</Label>
              <Select defaultValue="project2">
                <SelectTrigger id="project">
                  <SelectValue placeholder="选择关联项目" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project1">智能家居系统</SelectItem>
                  <SelectItem value="project2">机器视觉识别</SelectItem>
                  <SelectItem value="project3">无人机控制系统</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="competition">关联竞赛</Label>
              <Select defaultValue="competition1">
                <SelectTrigger id="competition">
                  <SelectValue placeholder="选择关联竞赛" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="competition1">全国大学生电子设计竞赛</SelectItem>
                  <SelectItem value="competition2">互联网+创新创业大赛</SelectItem>
                  <SelectItem value="competition3">挑战杯科技竞赛</SelectItem>
                  <SelectItem value="none">不关联竞赛</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">报销说明</Label>
              <Textarea
                id="description"
                placeholder="请简要说明报销用途和原因"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <Tabs defaultValue="items" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-0.5 rounded-lg">
                <TabsTrigger
                  value="items"
                  className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  报销明细
                </TabsTrigger>
                <TabsTrigger
                  value="attachments"
                  className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  附件
                </TabsTrigger>
              </TabsList>
              <TabsContent value="items" className="space-y-4 pt-4">
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="grid grid-cols-8 p-3 text-sm font-medium bg-muted/70">
                    <div className="col-span-4">商品名称</div>
                    <div>数量</div>
                    <div>单价</div>
                    <div>金额</div>
                    <div></div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-8 p-3 text-sm items-center hover:bg-muted/20 transition-colors">
                    <div className="col-span-4">Arduino Uno R3 开发板</div>
                    <div>2</div>
                    <div>¥75.00</div>
                    <div>¥150.00</div>
                    <Button variant="ghost" size="sm" className="h-7">
                      <span className="sr-only">删除</span>×
                    </Button>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-8 p-3 text-sm items-center hover:bg-muted/20 transition-colors">
                    <div className="col-span-4">DHT11 温湿度传感器</div>
                    <div>5</div>
                    <div>¥12.00</div>
                    <div>¥60.00</div>
                    <Button variant="ghost" size="sm" className="h-7">
                      <span className="sr-only">删除</span>×
                    </Button>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-8 p-3 text-sm items-center hover:bg-muted/20 transition-colors">
                    <div className="col-span-4">HC-SR04 超声波测距模块</div>
                    <div>3</div>
                    <div>¥8.00</div>
                    <div>¥24.00</div>
                    <Button variant="ghost" size="sm" className="h-7">
                      <span className="sr-only">删除</span>×
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  添加明细项
                </Button>
              </TabsContent>
              <TabsContent value="attachments" className="space-y-4 pt-4">
                <div className="border rounded-md p-3 flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">电子元件采购发票.jpg</p>
                      <Button variant="ghost" size="sm" className="h-7">
                        <span className="sr-only">删除</span>×
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">1.2 MB · 上传于 2分钟前</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  添加附件
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full">提交报销申请</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
