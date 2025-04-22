import Link from "next/link"
import { Microscope } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 md:left-12 md:top-12">
        <Microscope className="h-6 w-6" />
        <span className="text-xl font-bold">Shadow</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">注册</CardTitle>
          <CardDescription>创建您的账号以使用系统</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名</Label>
            <Input id="name" placeholder="请输入您的姓名" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input id="email" type="email" placeholder="请输入您的邮箱" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input id="password" type="password" placeholder="请设置密码" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">确认密码</Label>
            <Input id="confirm-password" type="password" placeholder="请再次输入密码" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">注册</Button>
          <div className="text-center text-sm">
            已有账号?{" "}
            <Link href="/login" className="text-primary hover:underline">
              登录
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
