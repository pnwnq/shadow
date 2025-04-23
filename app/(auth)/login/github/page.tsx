import { Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function GitHubLoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">登录</CardTitle>
        <CardDescription>使用GitHub账号登录Shadow实验室管理系统</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
        <div className="flex size-20 items-center justify-center rounded-full bg-muted">
          <Github className="size-10" />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            我们使用GitHub进行身份验证，确保只有实验室成员才能访问系统。点击下方按钮使用GitHub账号登录。
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full gap-2" asChild>
          <a href="/dashboard">
            <Github className="size-5" />
            使用GitHub登录
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
