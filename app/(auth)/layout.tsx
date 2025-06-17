import type { ReactNode } from "react"
import { Microscope } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* 左侧品牌展示区 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-primary flex-col items-center justify-center p-12 text-white">
        <div className="max-w-md space-y-8">
          <div className="flex items-center gap-3">
            <Microscope className="h-8 w-8" />
            <span className="text-2xl font-bold">Shadow 机器人实验室</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            欢迎加入我们的创新实验室
          </h1>
          <p className="text-lg text-white/80">
            在这里，我们将共同探索机器人技术的未来，创造改变世界的创新。
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>先进的实验设备</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>专业的导师团队</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>丰富的项目实践</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧表单区域 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="lg:hidden flex items-center justify-center mb-8">
              <Link href="/" className="flex items-center gap-2 text-primary">
                <Microscope className="h-6 w-6" />
                <span className="text-xl font-bold">Shadow</span>
              </Link>
            </div>
            {children}
          </div>
        </div>
        <footer className="py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Shadow 机器人实验室. 保留所有权利.</p>
        </footer>
      </div>
    </div>
  )
}
