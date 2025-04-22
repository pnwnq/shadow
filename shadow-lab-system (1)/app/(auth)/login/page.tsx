import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
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
        <div className="flex flex-col gap-2 text-center text-sm">
          <Link href="/login/github" className="text-primary hover:underline">
            使用GitHub账号登录
          </Link>
          <div>
            还没有账号?{" "}
            <Link href="/register" className="text-primary hover:underline">
              注册
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
