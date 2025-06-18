"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, Smartphone, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function ScanNFCPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const action = searchParams.get("action") || "check"
  const actionText = action === "borrow" ? "借用" : action === "return" ? "归还" : "查看"

  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [item, setItem] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // 模拟NFC扫描过程
  const startScan = () => {
    setScanning(true)
    setError(null)

    // 模拟扫描延迟
    setTimeout(() => {
      // 模拟成功扫描
      if (Math.random() > 0.2) {
        // 80%成功率
        setScanning(false)
        setScanned(true)

        // 模拟物品数据
        setItem({
          id: "NFC-12345",
          name: "STM32开发板",
          category: "控制器",
          status: action === "return" ? "borrowed" : "available",
          borrowedBy: action === "return" ? "当前用户" : null,
          borrowedAt: action === "return" ? "2023-05-20 14:30" : null,
          location: "A区储物柜",
          image: "/stm32_microcontroller.png",
        })

        // 显示成功消息
        toast({
          title: "NFC扫描成功",
          description: `已识别物品：STM32开发板`,
        })
      } else {
        // 模拟扫描失败
        setScanning(false)
        setError("未能识别NFC标签，请确保手机靠近标签并重试。")

        toast({
          title: "扫描失败",
          description: "未能识别NFC标签",
          variant: "destructive",
        })
      }
    }, 2000)
  }

  // 处理物品操作（借用/归还/查看）
  const handleItemAction = () => {
    if (!item) return

    setScanning(true)

    // 模拟操作延迟
    setTimeout(() => {
      setScanning(false)

      if (action === "borrow") {
        toast({
          title: "借用成功",
          description: `您已成功借用 ${item.name}`,
        })
      } else if (action === "return") {
        toast({
          title: "归还成功",
          description: `您已成功归还 ${item.name}`,
        })
      }

      // 操作完成后返回物品列表
      setTimeout(() => {
        router.push("/inventory")
      }, 1500)
    }, 1500)
  }

  // 自动开始扫描
  useEffect(() => {
    const timer = setTimeout(() => {
      startScan()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/inventory">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">返回</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">NFC{actionText}物品</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {scanning ? "正在扫描..." : scanned ? "扫描成功" : "请扫描NFC标签"}
          </CardTitle>
          <CardDescription>
            {scanning
              ? "请将手机靠近物品上的NFC标签"
              : scanned
                ? `已识别物品：${item?.name}`
                : "将手机靠近物品上的NFC标签以识别物品"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
          {scanning ? (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
              <p className="text-center text-muted-foreground">正在扫描NFC标签...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <XCircle className="h-16 w-16 text-destructive mb-4" />
              <p className="text-destructive font-medium">扫描失败</p>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
            </div>
          ) : scanned && item ? (
            <div className="w-full space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-14 w-14 object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
              </div>

              <div className="space-y-2 border rounded-md p-3 bg-muted/30">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">NFC ID:</span>
                  <span>{item.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">状态:</span>
                  <span>{item.status === "available" ? "在库" : "已借出"}</span>
                </div>
                {item.borrowedBy && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">借用人:</span>
                    <span>{item.borrowedBy}</span>
                  </div>
                )}
                {item.borrowedAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">借用时间:</span>
                    <span>{item.borrowedAt}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">存放位置:</span>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <Smartphone className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">请将手机靠近NFC标签</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {error ? (
            <Button className="w-full" onClick={startScan}>
              重新扫描
            </Button>
          ) : scanned && item ? (
            <div className="w-full space-y-2">
              {action !== "check" && (
                <Button
                  className="w-full"
                  onClick={handleItemAction}
                  disabled={
                    scanning ||
                    (action === "borrow" && item.status !== "available") ||
                    (action === "return" && item.status !== "borrowed")
                  }
                >
                  {scanning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      处理中...
                    </>
                  ) : (
                    <>{action === "borrow" ? "借用物品" : "归还物品"}</>
                  )}
                </Button>
              )}
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/inventory/items/${item.id}`}>查看物品详情</Link>
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={startScan} disabled={scanning}>
              {scanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  扫描中...
                </>
              ) : (
                "开始扫描"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-sm font-medium mb-2">NFC使用说明</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• 确保手机NFC功能已开启</li>
          <li>• 将手机背面靠近物品上的NFC标签</li>
          <li>• 保持手机稳定直到扫描完成</li>
          <li>• 如果扫描失败，请调整手机位置后重试</li>
        </ul>
      </div>
    </div>
  )
}
