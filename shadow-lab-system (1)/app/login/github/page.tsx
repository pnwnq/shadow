import Link from "next/link"
import { Github, Microscope } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function GitHubLoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 md:left-12 md:top-12">
        <Microscope className="h-6 w-6" />
        <span className="text-xl font-bold">Shadow</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">登录</CardTitle>
          <CardDescription>使用GitHub账号登录Shadow实验室管理系统</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Github className="h-10 w-10" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              我们使用GitHub进行身份验证，确保只有实验室成员才能访问系统。点击下方按钮使用GitHub账号登录。
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full gap-2">
            <Github className="h-5 w-5" />
            使用GitHub登录
          </Button>
          <div className="text-center text-sm text-muted-foreground">由Shadow小组开发和维护</div>
        </CardFooter>
      </Card>
    </div>
  )
}
