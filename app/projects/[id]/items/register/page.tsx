"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Package, Plus, Trash2, Scan, Smartphone, Tag, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function RegisterItemPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [items, setItems] = useState([{ id: 1, name: "", category: "", quantity: 1, nfcId: "" }])
  const [activeTab, setActiveTab] = useState("manual")
  const [isScanning, setIsScanning] = useState(false)
  const [scanningItemId, setScanningItemId] = useState<number | null>(null)
  const [nfcScanDialogOpen, setNfcScanDialogOpen] = useState(false)
  const [currentNfcData, setCurrentNfcData] = useState("")

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: "", category: "", quantity: 1, nfcId: "" }])
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

  const handleSubmit = () => {
    // 验证表单
    const isValid = items.every((item) => item.name && item.category && item.quantity > 0)

    if (!isValid) {
      toast({
        title: "表单不完整",
        description: "请填写所有物品的名称、类别和数量",
        variant: "destructive",
      })
      return
    }

    // 提交表单
    toast({
      title: "登记成功",
      description: `已成功登记 ${items.length} 项物品`,
    })

    // 跳转回项目详情页
    router.push(`/projects/${id}?tab=items`)
  }

  const startNfcScan = (itemId: number) => {
    setScanningItemId(itemId)
    setNfcScanDialogOpen(true)
    setIsScanning(true)

    // 模拟NFC扫描过程
    setTimeout(() => {
      const mockNfcId = `NFC-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`
      setCurrentNfcData(mockNfcId)
      setIsScanning(false)
    }, 2000)
  }

  const confirmNfcBinding = () => {
    if (scanningItemId !== null && currentNfcData) {
      handleItemChange(scanningItemId, "nfcId", currentNfcData)
      setNfcScanDialogOpen(false)
      setScanningItemId(null)
      setCurrentNfcData("")

      toast({
        title: "NFC标签绑定成功",
        description: `已成功绑定NFC标签: ${currentNfcData}`,
      })
    }
  }

  const cancelNfcBinding = () => {
    setNfcScanDialogOpen(false)
    setScanningItemId(null)
    setCurrentNfcData("")
  }

  const handleBatchScan = () => {
    toast({
      title: "批量扫描",
      description: "请将物品靠近NFC读取器进行批量扫描",
    })
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
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
            <BreadcrumbLink href={`/projects/${id}/items/register`}>登记物品</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="hover:bg-muted">
            <Link href={`/projects/${id}?tab=items`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">登记项目物品</h1>
        </div>
        <Button size="sm" className="gap-2">
          <Tag className="h-4 w-4" />
          批量导入
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-0.5 rounded-lg">
          <TabsTrigger
            value="manual"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            手动登记
          </TabsTrigger>
          <TabsTrigger
            value="nfc"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            NFC扫描登记
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6 mt-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                物品信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {items.map((item, index) => (
                <div key={item.id} className="space-y-4 p-5 border rounded-lg bg-card/50 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm">
                        {index + 1}
                      </span>
                      物品 #{index + 1}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8" onClick={() => startNfcScan(item.id)}>
                        <Tag className="h-4 w-4 mr-1" />
                        绑定NFC
                      </Button>
                      {items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-destructive hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          删除
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${item.id}`}>物品名称</Label>
                      <Input
                        id={`name-${item.id}`}
                        placeholder="例如：Arduino开发板"
                        value={item.name}
                        onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`category-${item.id}`}>物品类别</Label>
                      <Select
                        value={item.category}
                        onValueChange={(value) => handleItemChange(item.id, "category", value)}
                      >
                        <SelectTrigger id={`category-${item.id}`}>
                          <SelectValue placeholder="选择类别" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="控制器">控制器</SelectItem>
                          <SelectItem value="传感器">传感器</SelectItem>
                          <SelectItem value="执行器">执行器</SelectItem>
                          <SelectItem value="通信模块">通信模块</SelectItem>
                          <SelectItem value="电源模块">电源模块</SelectItem>
                          <SelectItem value="机械部件">机械部件</SelectItem>
                          <SelectItem value="工具">工具</SelectItem>
                          <SelectItem value="其他">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${item.id}`}>数量</Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>

                  {item.nfcId && (
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-md">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">已绑定NFC标签:</span>
                        <Badge variant="outline" className="font-mono">
                          {item.nfcId}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Button variant="outline" className="w-full" onClick={handleAddItem}>
                <Plus className="h-4 w-4 mr-2" />
                添加更多物品
              </Button>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href={`/projects/${id}?tab=items`}>取消</Link>
              </Button>
              <Button onClick={handleSubmit}>提交登记</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="nfc" className="space-y-6 mt-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                NFC扫描登记
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-8 border-2 border-dashed rounded-lg text-center space-y-6 hover:bg-muted/50 hover:border-primary/30 transition-colors">
                <div className="flex justify-center">
                  <Scan className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">使用NFC扫描登记物品</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  将物品靠近NFC读取器，系统将自动识别物品信息并登记到项目中。您也可以为新物品绑定NFC标签。
                </p>
                <div className="flex justify-center gap-4 pt-2">
                  <Button onClick={handleBatchScan}>
                    <Scan className="h-4 w-4 mr-2" />
                    开始扫描
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/inventory/scan-nfc">
                      <Smartphone className="h-4 w-4 mr-2" />
                      使用手机扫描
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">已扫描物品</h3>
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="grid grid-cols-12 bg-muted/70 p-3 text-sm font-medium">
                    <div className="col-span-4">物品名称</div>
                    <div className="col-span-3">NFC标签</div>
                    <div className="col-span-2">类别</div>
                    <div className="col-span-1">数量</div>
                    <div className="col-span-2">操作</div>
                  </div>
                  <div className="p-4 text-center text-muted-foreground">暂无已扫描物品，请开始扫描</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href={`/projects/${id}?tab=items`}>取消</Link>
              </Button>
              <Button onClick={handleSubmit}>提交登记</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* NFC扫描对话框 */}
      <Dialog open={nfcScanDialogOpen} onOpenChange={setNfcScanDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>NFC标签绑定</DialogTitle>
            <DialogDescription>请将NFC标签靠近设备进行扫描</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            {isScanning ? (
              <>
                <div className="relative">
                  <Smartphone className="h-16 w-16 text-primary animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <p className="text-center text-muted-foreground">正在扫描NFC标签...</p>
              </>
            ) : currentNfcData ? (
              <>
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
                  <Tag className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-medium">已检测到NFC标签</p>
                  <p className="font-mono text-sm bg-muted p-2 rounded">{currentNfcData}</p>
                </div>
              </>
            ) : (
              <p className="text-center text-red-500">未检测到NFC标签，请重试</p>
            )}
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={cancelNfcBinding}>
              <X className="h-4 w-4 mr-2" />
              取消
            </Button>
            <Button onClick={confirmNfcBinding} disabled={!currentNfcData}>
              <Check className="h-4 w-4 mr-2" />
              确认绑定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
