"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  History,
  Package,
  QrCode,
  Smartphone,
  Tag,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function ItemDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()

  // 模拟物品数据
  const [item] = useState({
    id: id as string,
    name: "STM32开发板",
    category: "控制器",
    status: "available",
    description: "STM32F103系列开发板，包含USB接口、多个GPIO引脚和各种外设接口。适用于嵌入式系统开发和教学。",
    location: "A区储物柜",
    purchaseDate: "2023-01-15",
    price: "¥199.00",
    manufacturer: "ST Microelectronics",
    model: "STM32F103C8T6",
    serialNumber: "ST2023051001",
    nfcId: "NFC-12345",
    nfcLastScanned: "2023-05-21 09:45",
    image: "/stm32_microcontroller.png",
  })

  // 模拟借用历史
  const [borrowHistory] = useState([
    {
      id: "borrow-1",
      user: "张三",
      borrowedAt: "2023-05-10 14:30",
      returnedAt: "2023-05-15 16:45",
      status: "returned",
      notes: "用于机器人控制系统开发",
    },
    {
      id: "borrow-2",
      user: "李四",
      borrowedAt: "2023-04-20 09:15",
      returnedAt: "2023-04-25 11:30",
      status: "returned",
      notes: "嵌入式系统课程实验",
    },
    {
      id: "borrow-3",
      user: "王五",
      borrowedAt: "2023-03-05 13:20",
      returnedAt: "2023-03-12 10:00",
      status: "returned",
      notes: "智能家居项目开发",
    },
  ])

  // 处理NFC标签绑定
  const handleBindNFC = () => {
    router.push(`/inventory/bind-nfc/${id}`)
  }

  // 处理借用物品
  const handleBorrow = () => {
    router.push(`/inventory/scan-nfc?action=borrow&id=${id}`)
  }

  // 处理打印NFC标签
  const handlePrintNFCTag = () => {
    toast({
      title: "准备打印NFC标签",
      description: "正在准备打印STM32开发板的NFC标签...",
    })

    // 模拟打印延迟
    setTimeout(() => {
      toast({
        title: "打印成功",
        description: "NFC标签已发送到打印队列",
      })
    }, 1500)
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/inventory">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">返回</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">物品详情</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.category}</CardDescription>
              </div>
              <Badge variant={item.status === "available" ? "outline" : "secondary"}>
                {item.status === "available" ? "在库" : "借出"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 rounded-md bg-muted flex items-center justify-center">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-20 w-20 object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">型号:</span>
                  <span>{item.model}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">制造商:</span>
                  <span>{item.manufacturer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">序列号:</span>
                  <span>{item.serialNumber}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">购入日期:</span>
                  <span>{item.purchaseDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">价格:</span>
                  <span>{item.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">存放位置:</span>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Button onClick={handleBorrow}>借用物品</Button>
            <Button variant="outline">编辑信息</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              NFC标签信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md bg-blue-50 flex flex-col items-center justify-center">
              <div className="bg-white p-3 rounded-md shadow-sm mb-2">
                <QrCode className="h-16 w-16 text-primary" />
              </div>
              <p className="text-xs text-center text-muted-foreground">NFC ID: {item.nfcId}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">NFC ID:</span>
                <span className="font-mono">{item.nfcId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">上次扫描:</span>
                <span>{item.nfcLastScanned}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">绑定状态:</span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  已绑定
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button variant="outline" className="w-full" onClick={handleBindNFC}>
              重新绑定NFC
            </Button>
            <Button variant="outline" className="w-full" onClick={handlePrintNFCTag}>
              打印NFC标签
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <History className="h-4 w-4" />
            借用历史
          </CardTitle>
        </CardHeader>
        <CardContent>
          {borrowHistory.length > 0 ? (
            <div className="space-y-4">
              {borrowHistory.map((record) => (
                <div key={record.id} className="border rounded-md p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{record.user}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50">
                      已归还
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">借出:</span>
                      <span>{record.borrowedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">归还:</span>
                      <span>{record.returnedAt}</span>
                    </div>
                  </div>
                  {record.notes && <p className="text-sm text-muted-foreground">备注: {record.notes}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">暂无借用记录</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
