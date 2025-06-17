"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, Eye, EyeOff, Globe, Key, Save, Shield, Smartphone, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function SecurityPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("password")
  const [passwordLength, setPasswordLength] = useState(12)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordExample, setPasswordExample] = useState("P@ssw0rd!2023")
  const [ipAllowList, setIpAllowList] = useState("192.168.1.0/24\n10.0.0.0/8")
  const [sessionTimeout, setSessionTimeout] = useState(30)

  // 处理保存设置
  const handleSaveSettings = () => {
    toast({
      title: "设置已保存",
      description: "安全设置已成功更新",
    })
  }

  // 生成随机密码示例
  const generatePasswordExample = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"
    let result = ""
    for (let i = 0; i < passwordLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPasswordExample(result)
  }

  // 评估密码强度
  const evaluatePasswordStrength = (password: string) => {
    let strength = 0

    // 长度检查
    if (password.length >= 8) strength += 1
    if (password.length >= 12) strength += 1

    // 复杂性检查
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    if (strength < 3) return { text: "弱", color: "red" }
    if (strength < 5) return { text: "中", color: "yellow" }
    return { text: "强", color: "green" }
  }

  const passwordStrength = evaluatePasswordStrength(passwordExample)

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">安全设置</h1>
          <p className="text-muted-foreground">管理系统安全和访问控制设置</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin">
              <Shield className="mr-2 h-4 w-4" />
              管理中心
            </Link>
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            保存设置
          </Button>
        </div>
      </div>

      <Tabs defaultValue="password" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">密码策略</span>
          </TabsTrigger>
          <TabsTrigger value="login" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">登录安全</span>
          </TabsTrigger>
          <TabsTrigger value="2fa" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">双因素认证</span>
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">访问控制</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>密码策略设置</CardTitle>
              <CardDescription>设置系统密码的复杂度和安全要求</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-length">密码最小长度</Label>
                    <span className="text-sm font-medium">{passwordLength} 个字符</span>
                  </div>
                  <Slider
                    id="password-length"
                    min={8}
                    max={20}
                    step={1}
                    value={[passwordLength]}
                    onValueChange={(value) => setPasswordLength(value[0])}
                  />
                  <p className="text-sm text-muted-foreground">设置用户密码的最小长度要求</p>
                </div>

                <div className="space-y-2">
                  <Label>密码复杂度要求</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="require-uppercase" defaultChecked />
                      <Label htmlFor="require-uppercase">必须包含大写字母</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="require-lowercase" defaultChecked />
                      <Label htmlFor="require-lowercase">必须包含小写字母</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="require-numbers" defaultChecked />
                      <Label htmlFor="require-numbers">必须包含数字</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="require-special" defaultChecked />
                      <Label htmlFor="require-special">必须包含特殊字符</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>密码历史和过期</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="password-history" defaultChecked />
                      <Label htmlFor="password-history">禁止使用最近使用过的密码</Label>
                    </div>
                    <Select defaultValue="3">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="记住最近几次密码" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">记住最近 3 次密码</SelectItem>
                        <SelectItem value="5">记住最近 5 次密码</SelectItem>
                        <SelectItem value="10">记住最近 10 次密码</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="password-expiry" defaultChecked />
                      <Label htmlFor="password-expiry">密码定期过期</Label>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="密码有效期" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 天</SelectItem>
                        <SelectItem value="60">60 天</SelectItem>
                        <SelectItem value="90">90 天</SelectItem>
                        <SelectItem value="180">180 天</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>密码示例</Label>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={passwordExample}
                        onChange={(e) => setPasswordExample(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "隐藏密码" : "显示密码"}</span>
                      </Button>
                    </div>
                    <Button type="button" variant="outline" onClick={generatePasswordExample}>
                      生成示例
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">密码强度:</span>
                    <Badge
                      variant="outline"
                      className={`bg-${passwordStrength.color}-50 text-${passwordStrength.color}-700 border-${passwordStrength.color}-200`}
                    >
                      {passwordStrength.text}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">重置为默认值</Button>
              <Button onClick={handleSaveSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>登录安全设置</CardTitle>
              <CardDescription>管理用户登录的安全限制和策略</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>登录尝试限制</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="login-attempts" defaultChecked />
                      <Label htmlFor="login-attempts">启用登录尝试限制</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="max-attempts">最大尝试次数</Label>
                        <Select defaultValue="5">
                          <SelectTrigger id="max-attempts">
                            <SelectValue placeholder="选择次数" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 次</SelectItem>
                            <SelectItem value="5">5 次</SelectItem>
                            <SelectItem value="10">10 次</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lockout-duration">锁定时长</Label>
                        <Select defaultValue="15">
                          <SelectTrigger id="lockout-duration">
                            <SelectValue placeholder="选择时长" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 分钟</SelectItem>
                            <SelectItem value="15">15 分钟</SelectItem>
                            <SelectItem value="30">30 分钟</SelectItem>
                            <SelectItem value="60">1 小时</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>会话设置</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="session-timeout" defaultChecked />
                      <Label htmlFor="session-timeout">启用会话超时</Label>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="timeout-slider">会话超时时间</Label>
                        <span className="text-sm font-medium">{sessionTimeout} 分钟</span>
                      </div>
                      <Slider
                        id="timeout-slider"
                        min={5}
                        max={120}
                        step={5}
                        value={[sessionTimeout]}
                        onValueChange={(value) => setSessionTimeout(value[0])}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="concurrent-sessions" defaultChecked />
                      <Label htmlFor="concurrent-sessions">限制并发会话</Label>
                    </div>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue placeholder="最大并发会话数" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 个会话</SelectItem>
                        <SelectItem value="2">2 个会话</SelectItem>
                        <SelectItem value="3">3 个会话</SelectItem>
                        <SelectItem value="unlimited">不限制</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>登录通知</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="login-notification" defaultChecked />
                      <Label htmlFor="login-notification">新设备登录通知</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">当用户从新设备登录时发送电子邮件通知</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="suspicious-login" defaultChecked />
                      <Label htmlFor="suspicious-login">可疑登录警报</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">当检测到可疑登录活动时通知管理员</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">重置为默认值</Button>
              <Button onClick={handleSaveSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="2fa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>双因素认证设置</CardTitle>
              <CardDescription>配置系统的双因素认证选项</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>双因素认证策略</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-2fa" defaultChecked />
                      <Label htmlFor="enable-2fa">启用双因素认证</Label>
                    </div>
                    <Select defaultValue="optional">
                      <SelectTrigger>
                        <SelectValue placeholder="双因素认证要求" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="optional">可选 - 用户可以自行选择是否启用</SelectItem>
                        <SelectItem value="required-admin">必需 - 仅管理员账号</SelectItem>
                        <SelectItem value="required-all">必需 - 所有用户</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>认证方式</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="authenticator-app" defaultChecked />
                      <Label htmlFor="authenticator-app">认证器应用 (TOTP)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-auth" defaultChecked />
                      <Label htmlFor="sms-auth">短信验证码</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-auth" defaultChecked />
                      <Label htmlFor="email-auth">电子邮件验证码</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="security-key" />
                      <Label htmlFor="security-key">安全密钥 (WebAuthn/FIDO2)</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>恢复选项</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="recovery-codes" defaultChecked />
                      <Label htmlFor="recovery-codes">生成恢复码</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      允许用户生成一次性恢复码，用于在无法访问双因素认证设备时登录
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="admin-reset" defaultChecked />
                      <Label htmlFor="admin-reset">管理员重置</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">允许管理员为用户重置双因素认证</p>
                  </div>
                </div>

                <div className="rounded-md border p-4 bg-yellow-50">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">注意事项</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        启用双因素认证后，请确保用户有足够的恢复选项，以防止因无法访问认证设备而被锁定账号。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">重置为默认值</Button>
              <Button onClick={handleSaveSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>访问控制设置</CardTitle>
              <CardDescription>管理系统的IP访问限制和安全策略</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>IP访问限制</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="ip-restriction" defaultChecked />
                      <Label htmlFor="ip-restriction">启用IP访问限制</Label>
                    </div>
                    <Select defaultValue="allowlist">
                      <SelectTrigger>
                        <SelectValue placeholder="限制模式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="allowlist">白名单模式 - 仅允许指定IP访问</SelectItem>
                        <SelectItem value="blocklist">黑名单模式 - 阻止指定IP访问</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ip-list">IP地址列表</Label>
                  <Textarea
                    id="ip-list"
                    placeholder="每行输入一个IP地址或CIDR范围"
                    value={ipAllowList}
                    onChange={(e) => setIpAllowList(e.target.value)}
                    rows={5}
                  />
                  <p className="text-sm text-muted-foreground">输入IP地址或CIDR范围，每行一个。例如: 192.168.1.0/24</p>
                </div>

                <div className="space-y-2">
                  <Label>地理位置限制</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="geo-restriction" />
                      <Label htmlFor="geo-restriction">启用地理位置限制</Label>
                    </div>
                    <Select defaultValue="china">
                      <SelectTrigger>
                        <SelectValue placeholder="允许访问的国家/地区" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="china">仅中国</SelectItem>
                        <SelectItem value="asia">亚洲</SelectItem>
                        <SelectItem value="custom">自定义国家/地区</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>高级安全设置</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="force-https" defaultChecked />
                      <Label htmlFor="force-https">强制使用HTTPS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="hsts" defaultChecked />
                      <Label htmlFor="hsts">启用HSTS (HTTP严格传输安全)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="xss-protection" defaultChecked />
                      <Label htmlFor="xss-protection">XSS保护</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="content-security" defaultChecked />
                      <Label htmlFor="content-security">内容安全策略 (CSP)</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">重置为默认值</Button>
              <Button onClick={handleSaveSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
