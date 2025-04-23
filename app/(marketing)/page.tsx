import Link from "next/link"
import {
  ChevronRight,
  Github,
  Microscope,
  BookOpen,
  Package,
  FileText,
  Folder,
  Bot,
  MessageSquare,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"

// async function getGitHubStars(): Promise<string | null> {
//   try {
//     const response = await fetch(
//       "https://api.github.com/repos/shadcn/taxonomy",
//       {
//         headers: {
//           Accept: "application/vnd.github+json",
//           // Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`, // Removed reference
//         },
//         next: {
//           revalidate: 60,
//         },
//       }
//     )

//     if (!response?.ok) {
//       return null
//     }

//     const json = await response.json()

//     return parseInt(json["stargazers_count"]).toLocaleString()
//   } catch (error) {
//     return null
//   }
// }

export default function Home() {
  // const stars = await getGitHubStars()
  const stars = null // Temporarily set stars to null

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Microscope className="size-6" />
            <span className="text-xl font-bold">Shadow</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login/github" className={cn(buttonVariants({ size: "sm" }), "gap-2")}>
              <Github className="size-4" />
              GitHub登录
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Shadow 实验室管理系统
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  让实验室管理不再是负担，提高运营效率，降低学习门槛
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "gap-1")}>
                  开始使用
                  <ChevronRight className="size-4" />
                </Link>
                <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-1")}>
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">核心功能模块</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  全方位的实验室数字化管理解决方案
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <BookOpen className="size-6" />
                    <div>
                      <CardTitle>学习路径系统</CardTitle>
                      <CardDescription>从入门到精通的分阶段学习指导</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>AI生成个性化学习建议，元器件使用指南一站式查询，降低学习门槛</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/learning" className="text-sm text-primary hover:underline">
                      了解更多 <ChevronRight className="inline size-4" />
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <Package className="size-6" />
                    <div>
                      <CardTitle>物品管理系统</CardTitle>
                      <CardDescription>集成NFC技术，扫一扫即可借还</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>实时库存监控，物品使用记录完整追踪，轻松找到你需要的一切</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/inventory" className="text-sm text-primary hover:underline">
                      了解更多 <ChevronRight className="inline size-4" />
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <FileText className="size-6" />
                    <div>
                      <CardTitle>文档管理系统</CardTitle>
                      <CardDescription>告别U盘传递文件的时代</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>版本控制，强大的搜索功能，快速定位所需文档，再也不怕资料覆盖</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/documents" className="text-sm text-primary hover:underline">
                      了解更多 <ChevronRight className="inline size-4" />
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <Folder className="size-6" />
                    <div>
                      <CardTitle>项目管理系统</CardTitle>
                      <CardDescription>任务分配一目了然</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>进度实时更新，团队协作无缝对接，项目进展透明可视</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/projects" className="text-sm text-primary hover:underline">
                      了解更多 <ChevronRight className="inline size-4" />
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <Bot className="size-6" />
                    <div>
                      <CardTitle>AI智能助手</CardTitle>
                      <CardDescription>实验室专属问答机器人</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>基于本地知识库的精准回答，智能推荐相关资源</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/ai-assistant" className="text-sm text-primary hover:underline">
                      了解更多 <ChevronRight className="inline size-4" />
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <MessageSquare className="size-6" />
                    <div>
                      <CardTitle>社区论坛</CardTitle>
                      <CardDescription>知识分享与技术交流平台</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>发布技术博客，项目展示，经验分享，打造活跃的学习社区</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/community" className="text-sm text-primary hover:underline">
                      了解更多 <ChevronRight className="inline size-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      {/* <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Shadow 实验室管理系统. 保留所有权利.
          </p>
        </div>
      </footer> */}
    </div>
  )
}
