import { Loader2 } from "lucide-react"

export default function JoinProjectLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold">加载中...</h2>
        <p className="mt-2 text-muted-foreground">请稍候</p>
      </div>
    </div>
  )
}
