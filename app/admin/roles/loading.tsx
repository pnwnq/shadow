import { Loader2 } from "lucide-react"

export default function RolesLoading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="mt-4 text-lg font-medium">加载角色管理...</p>
      <p className="text-sm text-muted-foreground">请稍候</p>
    </div>
  )
}
