"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Download, FileWarning, Loader2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react"

// Setup worker
// This is required by react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface DocumentPreviewProps {
  fileUrl: string
  fileType: string
}

const getFileExtension = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    const pathname = parsedUrl.pathname
    const parts = pathname.split(".")
    return parts[parts.length - 1]?.toLowerCase() || ""
  } catch (error) {
    // Fallback for relative URLs or invalid URLs
    const parts = url.split("?")[0].split(".")
    return parts[parts.length - 1]?.toLowerCase() || ""
  }
}

export function DocumentPreview({ fileUrl, fileType: rawFileType }: DocumentPreviewProps) {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState(1.0)
  const [isLoading, setIsLoading] = useState(true)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages)
    setIsLoading(false)
  }
  
  const onDocumentLoadError = (error: Error) => {
    console.error("Error while loading document: ", error);
    setIsLoading(false);
  }

  const goToPrevPage = () => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  const goToNextPage = () => setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages || 1));
  
  const fileExtension = getFileExtension(fileUrl)
  const officeDocTypes = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"]
  const imageDocTypes = ["png", "jpg", "jpeg", "gif", "webp", "svg"]

  let viewerUrl = fileUrl

  // For Office documents, use Microsoft Office Web Viewer
  if (officeDocTypes.includes(fileExtension)) {
    viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`
  }
  
  const renderContent = () => {
    if (fileExtension === "pdf") {
      return (
        <div className="flex flex-col items-center">
           {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">PDF 加载中...</p>
              </div>
           )}
          <div className="max-h-[600px] overflow-auto border rounded-md">
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </div>
          {numPages && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button variant="outline" size="icon" onClick={goToPrevPage} disabled={pageNumber <= 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <p className="text-sm">
                第 {pageNumber} 页 / 共 {numPages} 页
              </p>
              <Button variant="outline" size="icon" onClick={goToNextPage} disabled={pageNumber >= numPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setScale(s => s + 0.1)}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )
    }

    if (officeDocTypes.includes(fileExtension)) {
      return (
        <iframe
          src={viewerUrl}
          className="h-[600px] w-full border-0"
          title="Office Document Preview"
        />
      )
    }

    if (imageDocTypes.includes(fileExtension)) {
      return (
        <div className="flex justify-center p-4">
          <img src={viewerUrl} alt="Image Preview" className="max-w-full max-h-[600px] rounded-md" />
        </div>
      )
    }

    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border bg-muted/50">
        <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">不支持在线预览</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          此文件类型 (.
          {fileExtension}) 暂不支持预览。
        </p>
        <Button variant="outline" className="mt-4 gap-2" asChild>
          <a href={fileUrl} download>
            <Download className="h-4 w-4" />
            下载文件
          </a>
        </Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>文档预览</CardTitle>
        <CardDescription>
          在线查看文件内容。如果预览加载失败，您也可以直接
          <a href={fileUrl} download className="text-primary hover:underline">
            下载文件
          </a>
          。
        </CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}
