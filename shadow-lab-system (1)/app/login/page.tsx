import Link from "next/link"
import { Microscope } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 md:left-12 md:top-12">
        <Microscope className="h-6 w-6" />
        <span className="text-xl font-bold">Shadow</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">登录</CardTitle>
          <CardDescription>输入您的账号和密码登录系统</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">用户名/邮箱</Label>
            <Input id="email" placeholder="请输入用户名或邮箱" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">密码</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                忘记密码?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="请输入密码" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">登录</Button>
          <div className="text-center text-sm">
            还没有账号?{" "}
            <Link href="/register" className="text-primary hover:underline">
              注册
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
