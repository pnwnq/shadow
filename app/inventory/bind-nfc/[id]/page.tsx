"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, Loader2, Smartphone, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BindNFCPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [nfcId, setNfcId] = useState("")
  const [manualEntry, setManualEntry] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 模拟物品数据
  const [item] = useState({
    id: id as string,
    name: "STM32开发板",
    category: "控制器",
    image: "/stm32_microcontroller.png",
  })

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

        // 生成随机NFC ID
        const randomNfcId = `NFC-${Math.floor(Math.random() * 90000) + 10000}`
        setNfcId(randomNfcId)

        // 显示成功消息
        toast({
          title: "NFC扫描成功",
          description: `已识别NFC标签：${randomNfcId}`,
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

  // 处理绑定NFC标签
  const handleBindNFC = () => {
    if (!nfcId) {
      toast({
        title: "无法绑定",
        description: "请先扫描NFC标签或手动输入NFC ID",
        variant: "destructive",
      })
      return
    }

    setScanning(true)

    // 模拟绑定延迟
    setTimeout(() => {
      setScanning(false)

      toast({
        title: "绑定成功",
        description: `已成功将NFC标签 ${nfcId} 绑定到 ${item.name}`,
      })

      // 绑定完成后返回物品详情
      setTimeout(() => {
        router.push(`/inventory/items/${id}`)
      }, 1500)
    }, 1500)
  }

  // 切换到手动输入模式
  const toggleManualEntry = () => {
    setManualEntry(!manualEntry)
    setError(null)
  }

  // 自动开始扫描
  useEffect(() => {
    if (!manualEntry) {
      const timer = setTimeout(() => {
        startScan()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [manualEntry])

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/inventory/items/${id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">返回</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">绑定NFC标签</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {manualEntry ? "手动输入NFC ID" : scanning ? "正在扫描..." : scanned ? "扫描成功" : "请扫描NFC标签"}
          </CardTitle>
          <CardDescription>
            {manualEntry
              ? "请输入NFC标签的ID"
              : scanning
                ? "请将手机靠近NFC标签"
                : scanned
                  ? `已识别NFC标签：${nfcId}`
                  : "将手机靠近NFC标签以识别"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
          <div className="flex items-center gap-4 w-full">
            <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-14 w-14 object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
          </div>

          {manualEntry ? (
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nfc-id">NFC标签ID</Label>
                <Input
                  id="nfc-id"
                  placeholder="例如：NFC-12345"
                  value={nfcId}
                  onChange={(e) => setNfcId(e.target.value)}
                />
              </div>
            </div>
          ) : scanning ? (
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
          ) : scanned ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <p className="font-medium">扫描成功</p>
              <p className="text-sm text-muted-foreground mt-2">已识别NFC标签：{nfcId}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <Smartphone className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">请将手机靠近NFC标签</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {manualEntry ? (
            <>
              <Button className="w-full" onClick={handleBindNFC} disabled={!nfcId.trim()}>
                绑定NFC标签
              </Button>
              <Button variant="outline" className="w-full" onClick={toggleManualEntry}>
                使用扫描模式
              </Button>
            </>
          ) : error ? (
            <>
              <Button className="w-full" onClick={startScan}>
                重新扫描
              </Button>
              <Button variant="outline" className="w-full" onClick={toggleManualEntry}>
                手动输入NFC ID
              </Button>
            </>
          ) : scanned ? (
            <>
              <Button className="w-full" onClick={handleBindNFC} disabled={scanning}>
                {scanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    绑定中...
                  </>
                ) : (
                  "绑定NFC标签"
                )}
              </Button>
              <Button variant="outline" className="w-full" onClick={startScan} disabled={scanning}>
                重新扫描
              </Button>
            </>
          ) : (
            <>
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
              <Button variant="outline" className="w-full" onClick={toggleManualEntry}>
                手动输入NFC ID
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-sm font-medium mb-2">绑定说明</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• 每个物品只能绑定一个NFC标签</li>
          <li>• 绑定后，可以通过扫描NFC标签快速借用或归还物品</li>
          <li>• 如需更换NFC标签，请先解绑当前标签</li>
          <li>• 绑定完成后，建议在物品上贴上对应的NFC标签</li>
        </ul>
      </div>
    </div>
  )
}
