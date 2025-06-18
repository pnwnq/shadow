"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function JoinProjectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const projectId = searchParams.get("projectId")
  const action = searchParams.get("action")

  useEffect(() => {
    // 模拟处理加入项目的API调用
    const processJoinRequest = async () => {
      // 在实际应用中，这里会调用API处理加入项目的请求
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (action === "accept") {
        // 重定向到项目列表，并传递参数表示已加入项目
        router.push(`/projects?joined=true&projectId=${projectId}`)
      } else {
        // 如果拒绝，则返回通知页面
        router.push("/notifications")
      }
    }

    if (projectId && action) {
      processJoinRequest()
    } else {
      router.push("/projects")
    }
  }, [projectId, action, router])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold">
          {action === "accept" ? "正在加入项目..." : "正在处理您的请求..."}
        </h2>
        <p className="mt-2 text-muted-foreground">请稍候，我们正在处理您的请求</p>
      </div>
    </div>
  )
}
