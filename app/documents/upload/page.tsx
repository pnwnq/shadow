"use client"

import { useState, useEffect } from "react"
import Uppy from "@uppy/core"
import { Dashboard } from "@uppy/react"
import "@uppy/core/dist/style.min.css"
import "@uppy/dashboard/dist/style.min.css"
import XHRUpload from "@uppy/xhr-upload"
import { useRouter } from "next/navigation"
import zh_CN from '@uppy/locales/lib/zh_CN';

const Uploader = () => {
  const router = useRouter()
  // We need to use state to keep the Uppy instance
  // so that it's not recreated on every render.
  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: false,
      restrictions: {
        maxFileSize: 1024 * 1024 * 50, // 50MB
        // allowedFileTypes: ["image/*", "video/*", ".pdf"],
      },
    }).use(XHRUpload, {
      endpoint: "/api/upload",
      fieldName: "file",
      formData: true,
    })
  )

  useEffect(() => {
    const onComplete = (result: any) => {
      console.log("Upload complete!", result.successful)
      if (result.successful.length > 0) {
        // Optional: redirect to the documents list after upload
        // Invalidate cache or refetch data here if needed
        router.push("/documents")
        router.refresh(); // To show the newly uploaded file
      }
    }
    
    uppy.on("complete", onComplete)

    // Cleanup function
    return () => {
      uppy.off("complete", onComplete)
    }
  }, [uppy, router])

  return (
    <Dashboard
      uppy={uppy}
      locale={zh_CN as any}
      proudlyDisplayPoweredByUppy={false}
      theme="light"
      width="100%"
    />
  )
}

export default function UploadPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold tracking-tight mb-4">上传文件</h1>
      <div className="p-4 border rounded-lg bg-card">
        <Uploader />
      </div>
    </div>
  )
}
