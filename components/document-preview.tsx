"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  ImageIcon,
  Download,
  ExternalLink,
  Eye,
  FileImage,
  FileCode,
  FileDigitIcon as File3D,
  Loader2,
} from "lucide-react"

interface DocumentPreviewProps {
  fileId: string
  fileName: string
  fileType: string
  fileSize: number
  fileUrl: string
}

export default function DocumentPreview({ fileId, fileName, fileType, fileSize, fileUrl }: DocumentPreviewProps) {
  const [previewContent, setPreviewContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previewType, setPreviewType] = useState<"text" | "image" | "pdf" | "code" | "3d" | "unsupported">(
    "unsupported",
  )

  useEffect(() => {
    determinePreviewType()
  }, [fileType, fileName])

  const determinePreviewType = () => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    const mimeType = fileType.toLowerCase()

    if (mimeType.startsWith("image/")) {
      setPreviewType("image")
    } else if (mimeType === "application/pdf") {
      setPreviewType("pdf")
    } else if (
      mimeType.startsWith("text/") ||
      ["js", "ts", "jsx", "tsx", "py", "cpp", "c", "h", "css", "html", "json", "xml", "md"].includes(extension || "")
    ) {
      setPreviewType("code")
      loadTextContent()
    } else if (["stl", "obj", "gltf", "glb"].includes(extension || "")) {
      setPreviewType("3d")
    } else if (["txt", "md", "readme"].includes(extension || "")) {
      setPreviewType("text")
      loadTextContent()
    } else {
      setPreviewType("unsupported")
    }
  }

  const loadTextContent = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/documents/${fileId}/content`)
      if (response.ok) {
        const content = await response.text()
        setPreviewContent(content)
      }
    } catch (error) {
      console.error("Failed to load file content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getFileIcon = () => {
    switch (previewType) {
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "code":
        return <FileCode className="h-5 w-5" />
      case "3d":
        return <File3D className="h-5 w-5" />
      case "pdf":
        return <FileText className="h-5 w-5" />
      default:
        return <FileImage className="h-5 w-5" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const renderPreview = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">加载预览中...</span>
        </div>
      )
    }

    switch (previewType) {
      case "image":
        return (
          <div className="flex justify-center">
            <img
              src={fileUrl || "/placeholder.svg"}
              alt={fileName}
              className="max-w-full max-h-96 object-contain rounded-lg shadow-sm"
            />
          </div>
        )

      case "pdf":
        return (
          <div className="h-96">
            <iframe src={`${fileUrl}#toolbar=0`} className="w-full h-full border rounded-lg" title={fileName} />
          </div>
        )

      case "code":
      case "text":
        return (
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono">{previewContent || "无法加载文件内容"}</pre>
          </div>
        )

      case "3d":
        return (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
            <File3D className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">3D模型预览</p>
            <p className="text-sm text-gray-500">需要专用的3D查看器</p>
            <Button variant="outline" className="mt-4">
              <ExternalLink className="h-4 w-4 mr-2" />
              在外部应用中打开
            </Button>
          </div>
        )

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
            <FileImage className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">无法预览此文件类型</p>
            <p className="text-sm text-gray-500">请下载文件后使用相应软件打开</p>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getFileIcon()}
            {fileName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{formatFileSize(fileSize)}</Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              下载
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              预览
            </TabsTrigger>
            <TabsTrigger value="info">文件信息</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-4">
            {renderPreview()}
          </TabsContent>

          <TabsContent value="info" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">基本信息</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">文件名:</span>
                    <span>{fileName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">文件类型:</span>
                    <span>{fileType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">文件大小:</span>
                    <span>{formatFileSize(fileSize)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">支持的操作</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    下载文件
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    在新窗口打开
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
