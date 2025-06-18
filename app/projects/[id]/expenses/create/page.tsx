"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Upload, FileText, RefreshCw, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ExpenseCreatePage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [items, setItems] = useState([{ id: 1, name: "", quantity: 1, price: 0 }])

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: "", quantity: 1, price: 0 }])
  }

  const handleRemoveItem = (itemId: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== itemId))
    } else {
      toast({
        title: "无法删除",
        description: "至少需要保留一项物品",
        variant: "destructive",
      })
    }
  }

  const handleItemChange = (itemId: number, field: string, value: string | number) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }

  const handleSubmit = () => {
    // 验证表单
    if (!title || !amount || !description) {
      toast({
        title: "表单不完整",
        description: "请填写报销标题、金额和说明",
        variant: "destructive",
      })
      return
    }

    const isItemsValid = items.every((item) => item.name && item.quantity > 0 && item.price > 0)
    if (!isItemsValid) {
      toast({
        title: "明细不完整",
        description: "请填写所有物品的名称、数量和单价",
        variant: "destructive",
      })
      return
    }

    // 提交表单
    toast({
      title: "提交成功",
      description: "报账申请已提交，等待审核",
    })

    // 跳转回项目详情页
    router.push(`/projects/${id}?tab=expenses`)
  }

  return (
    <div className="container py-6 space-y-6">
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
            <BreadcrumbLink href={`/projects/${id}`}>项目详情</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects/${id}/expenses/create`}>申请报账</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/projects/${id}?tab=expenses`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">创建报账申请</h1>
        </div>
        <Button onClick={handleSubmit}>提交申请</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>上传发票/收据</CardTitle>
            <CardDescription>上传发票照片或订单截图，系统将自动识别商品信息和金额</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-center">
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
              <div className="border rounded-md p-3 flex items-start gap-3">
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
              <div className="border rounded-md p-4 space-y-3">
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
                    <div className="grid grid-cols-6 text-xs text-muted-foreground">
                      <div className="col-span-3">商品名称</div>
                      <div>数量</div>
                      <div>单价</div>
                      <div>金额</div>
                    </div>
                    <div className="grid grid-cols-6 text-sm">
                      <div className="col-span-3">Arduino Uno R3 开发板</div>
                      <div>2</div>
                      <div>100</div>
                      <div>200</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>报账信息</CardTitle>
            <CardDescription>填写报账申请的详细信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="title">报销标题</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="amount">报销金额</Label>
              <Input id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">报销说明</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={handleAddItem}>
              <Plus className="mr-2 h-4 w-4" />
              添加物品
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <Input
                value={item.name}
                onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                placeholder="物品名称"
              />
            </div>
            <div className="w-16">
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(item.id, "quantity", Number.parseInt(e.target.value))}
                placeholder="数量"
              />
            </div>
            <div className="w-16">
              <Input
                type="number"
                value={item.price}
                onChange={(e) => handleItemChange(item.id, "price", Number.parseInt(e.target.value))}
                placeholder="单价"
              />
            </div>
            <div className="w-16">
              <p>{item.quantity * item.price}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">删除</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">总金额</h2>
          <p className="text-lg font-semibold">{calculateTotal()}</p>
        </div>
        <Button onClick={handleSubmit}>提交申请</Button>
      </div>
    </div>
  )
}
