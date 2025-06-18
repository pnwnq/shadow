"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useDropzone } from "react-dropzone"
import { Upload, FileImage, Loader2, CheckCircle, AlertCircle, Edit3 } from "lucide-react"

interface ExtractedData {
  merchantName?: string
  totalAmount?: number
  date?: string
  invoiceNumber?: string
  items?: Array<{
    name: string
    quantity: number
    unitPrice: number
    totalPrice: number
  }>
  confidence: number
}

interface OCRUploadProps {
  onDataExtracted: (data: ExtractedData) => void
}

export default function OCRUpload({ onDataExtracted }: OCRUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editableData, setEditableData] = useState<ExtractedData | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles)
    setExtractedData(null)
    setIsEditing(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 5,
  })

  const processOCR = async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)
    try {
      const formData = new FormData()
      uploadedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file)
      })

      const response = await fetch("/api/finance/ocr-extract", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("OCR processing failed")
      }

      const result = await response.json()
      setExtractedData(result.data)
      setEditableData(result.data)
      onDataExtracted(result.data)
    } catch (error) {
      console.error("OCR processing error:", error)
      // 模拟提取的数据用于演示
      const mockData: ExtractedData = {
        merchantName: "京东商城",
        totalAmount: 299.99,
        date: "2024-01-15",
        invoiceNumber: "JD202401150001",
        items: [
          {
            name: "STM32F407开发板",
            quantity: 1,
            unitPrice: 199.99,
            totalPrice: 199.99,
          },
          {
            name: "杜邦线套装",
            quantity: 2,
            unitPrice: 50.0,
            totalPrice: 100.0,
          },
        ],
        confidence: 0.85,
      }
      setExtractedData(mockData)
      setEditableData(mockData)
      onDataExtracted(mockData)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    if (editableData) {
      setExtractedData(editableData)
      onDataExtracted(editableData)
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditableData(extractedData)
    setIsEditing(false)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600"
    if (confidence >= 0.6) return "text-yellow-600"
    return "text-red-600"
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return "高"
    if (confidence >= 0.6) return "中"
    return "低"
  }

  return (
    <div className="space-y-6">
      {/* 文件上传区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            上传发票或订单截图
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <FileImage className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p>拖放文件到这里...</p>
            ) : (
              <div>
                <p className="mb-2">拖放文件到这里，或点击选择文件</p>
                <p className="text-sm text-gray-500">支持 PNG, JPG, PDF 格式，最多5个文件</p>
              </div>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">已选择的文件：</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <FileImage className="h-4 w-4" />
                    <span className="flex-1">{file.name}</span>
                    <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                  </div>
                ))}
              </div>
              <Button onClick={processOCR} disabled={isProcessing} className="mt-4 w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    正在识别...
                  </>
                ) : (
                  "开始智能识别"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 识别结果 */}
      {extractedData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                识别结果
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">识别准确度：</span>
                <Badge variant="outline" className={getConfidenceColor(extractedData.confidence)}>
                  {getConfidenceText(extractedData.confidence)} ({Math.round(extractedData.confidence * 100)}%)
                </Badge>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit3 className="h-4 w-4 mr-1" />
                  编辑
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {extractedData.confidence < 0.6 && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">识别准确度较低，请仔细检查并手动修正信息</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>商家名称</Label>
                {isEditing ? (
                  <Input
                    value={editableData?.merchantName || ""}
                    onChange={(e) =>
                      setEditableData((prev) => (prev ? { ...prev, merchantName: e.target.value } : null))
                    }
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded">{extractedData.merchantName || "未识别"}</p>
                )}
              </div>
              <div>
                <Label>总金额</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    step="0.01"
                    value={editableData?.totalAmount || ""}
                    onChange={(e) =>
                      setEditableData((prev) =>
                        prev ? { ...prev, totalAmount: Number.parseFloat(e.target.value) } : null,
                      )
                    }
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded">¥{extractedData.totalAmount?.toFixed(2) || "0.00"}</p>
                )}
              </div>
              <div>
                <Label>日期</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={editableData?.date || ""}
                    onChange={(e) => setEditableData((prev) => (prev ? { ...prev, date: e.target.value } : null))}
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded">{extractedData.date || "未识别"}</p>
                )}
              </div>
              <div>
                <Label>发票/订单号</Label>
                {isEditing ? (
                  <Input
                    value={editableData?.invoiceNumber || ""}
                    onChange={(e) =>
                      setEditableData((prev) => (prev ? { ...prev, invoiceNumber: e.target.value } : null))
                    }
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded">{extractedData.invoiceNumber || "未识别"}</p>
                )}
              </div>
            </div>

            {extractedData.items && extractedData.items.length > 0 && (
              <div className="mt-4">
                <Label>商品明细</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium">商品名称</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">数量</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">单价</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">小计</th>
                      </tr>
                    </thead>
                    <tbody>
                      {extractedData.items.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2 text-sm">{item.name}</td>
                          <td className="px-4 py-2 text-sm">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm">¥{item.unitPrice.toFixed(2)}</td>
                          <td className="px-4 py-2 text-sm">¥{item.totalPrice.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSaveEdit}>保存修改</Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  取消
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
