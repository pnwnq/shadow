"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpToLine,
  Clock,
  Database,
  FileText,
  HardDrive,
  Mail,
  Save,
  Server,
  Settings,
  Shield,
  Trash,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  // 处理保存设置
  const handleSaveSettings = () => {
    toast({
      title: "设置已保存",
      description: "系统设置已成功更新",
    })
  }

  // 处理备份
  const handleBackup = () => {
    toast({
      title: "备份已启动",
      description: "系统备份已开始，完成后将通知您",
    })
  }

  // 处理维护模式切换
  const handleMaintenanceToggle = (checked: boolean) => {
    setMaintenanceMode(checked)
    toast({
      title: checked ? "维护模式已启用" : "维护模式已禁用",
      description: checked ? "系统现在处于维护模式，普通用户无法访问" : "系统已恢复正常访问",
    })
  }

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">系统设置</h1>
          <p className="text-muted-foreground">管理系统全局设置和配置</p>
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

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">基本设置</span>
          </TabsTrigger>
          <TabsTrigger value="mail" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">邮件服务</span>
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <span className="hidden sm:inline">存储设置</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">备份恢复</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span className="hidden sm:inline">系统维护</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>基本设置</CardTitle>
              <CardDescription>配置系统的基本信息和设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">系统名称</Label>
                  <Input id="system-name" defaultValue="Shadow实验室管理系统" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="system-description">系统描述</Label>
                  <Textarea
                    id="system-description"
                    defaultValue="宁波工程学院机器人实验室综合管理系统，用于管理项目、设备、财务和竞赛等资源。"
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">管理员邮箱</Label>
                    <Input id="admin-email" type="email" defaultValue="admin@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">联系电话</Label>
                    <Input id="contact-phone" defaultValue="0574-12345678" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">系统时区</Label>
                  <Select defaultValue="Asia/Shanghai">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="选择时区" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Shanghai">中国标准时间 (UTC+8)</SelectItem>
                      <SelectItem value="Asia/Hong_Kong">香港时间 (UTC+8)</SelectItem>
                      <SelectItem value="Asia/Tokyo">东京时间 (UTC+9)</SelectItem>
                      <SelectItem value="America/New_York">纽约时间 (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">伦敦时间 (UTC+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-format">日期格式</Label>
                  <Select defaultValue="yyyy-MM-dd">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="选择日期格式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD (2023-07-15)</SelectItem>
                      <SelectItem value="dd/MM/yyyy">DD/MM/YYYY (15/07/2023)</SelectItem>
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY (07/15/2023)</SelectItem>
                      <SelectItem value="yyyy年MM月dd日">YYYY年MM月DD日 (2023年07月15日)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>系统语言</Label>
                  <Select defaultValue="zh-CN">
                    <SelectTrigger>
                      <SelectValue placeholder="选择系统语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-CN">简体中文</SelectItem>
                      <SelectItem value="zh-TW">繁体中文</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">重置为默认值</Button>
              <Button onClick={handleSaveSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="mail" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>邮件服务设置</CardTitle>
              <CardDescription>配置系统的邮件服务器和发送设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mail-driver">邮件驱动</Label>
                  <Select defaultValue="smtp">
                    <SelectTrigger id="mail-driver">
                      <SelectValue placeholder="选择邮件驱动" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendmail">Sendmail</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mail-host">SMTP服务器</Label>
                  <Input id="mail-host" defaultValue="smtp.example.com" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mail-port">SMTP端口</Label>
                    <Input id="mail-port" defaultValue="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mail-encryption">加密方式</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger id="mail-encryption">
                        <SelectValue placeholder="选择加密方式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">无加密</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mail-username">SMTP用户名</Label>
                    <Input id="mail-username" defaultValue="noreply@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mail-password">SMTP密码</Label>
                    <Input id="mail-password" type="password" defaultValue="password" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mail-from-address">发件人地址</Label>
                  <Input id="mail-from-address" defaultValue="noreply@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mail-from-name">发件人名称</Label>
                  <Input id="mail-from-name" defaultValue="Shadow实验室管理系统" />
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline">测试邮件设置</Button>
                  <Input placeholder="输入测试邮箱地址" className="max-w-sm" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">重置为默认值</Button>
              <Button onClick={handleSaveSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>存储设置</CardTitle>
              <CardDescription>配置系统的文件存储和上传设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storage-driver">存储驱动</Label>
                  <Select defaultValue="local">
                    <SelectTrigger id="storage-driver">
                      <SelectValue placeholder="选择存储驱动" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">本地存储</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="oss">阿里云OSS</SelectItem>
                      <SelectItem value="cos">腾讯云COS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>存储使用情况</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>已使用: 12.5 GB</span>
                      <span>总容量: 50 GB</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <p className="text-xs text-muted-foreground">存储空间使用率: 25%</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>上传设置</Label>
                  <div className="space-y-2">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="max-upload-size">最大上传大小 (MB)</Label>
                        <Input id="max-upload-size" type="number" defaultValue="50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="allowed-file-types">允许的文件类型</Label>
                        <Input
                          id="allowed-file-types"
                          defaultValue="jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">文件类型用逗号分隔，不包含点号和空格</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>图片处理</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="image-optimization" defaultChecked />
                      <Label htmlFor="image-optimization">启用图片优化</Label>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="max-image-width">最大图片宽度 (像素)</Label>
                        <Input id="max-image-width" type="number" defaultValue="1920" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="image-quality">图片质量 (%)</Label>
                        <Input id="image-quality" type="number" min="1" max="100" defaultValue="85" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>文件清理</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-cleanup" defaultChecked />
                      <Label htmlFor="auto-cleanup">启用自动清理临时文件</Label>
                    </div>
                    <Select defaultValue="7">
                      <SelectTrigger>
                        <SelectValue placeholder="清理周期" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">每天</SelectItem>
                        <SelectItem value="7">每周</SelectItem>
                        <SelectItem value="30">每月</SelectItem>
                      </SelectContent>
                    </Select>
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

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>备份与恢复</CardTitle>
              <CardDescription>管理系统数据的备份和恢复</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>自动备份</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-backup" defaultChecked />
                      <Label htmlFor="auto-backup">启用自动备份</Label>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="backup-frequency">备份频率</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="backup-frequency">
                            <SelectValue placeholder="选择备份频率" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">每小时</SelectItem>
                            <SelectItem value="daily">每天</SelectItem>
                            <SelectItem value="weekly">每周</SelectItem>
                            <SelectItem value="monthly">每月</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="backup-time">备份时间</Label>
                        <Select defaultValue="03:00">
                          <SelectTrigger id="backup-time">
                            <SelectValue placeholder="选择备份时间" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="00:00">00:00</SelectItem>
                            <SelectItem value="03:00">03:00</SelectItem>
                            <SelectItem value="06:00">06:00</SelectItem>
                            <SelectItem value="12:00">12:00</SelectItem>
                            <SelectItem value="18:00">18:00</SelectItem>
                            <SelectItem value="21:00">21:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>备份内容</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="backup-database" defaultChecked />
                      <Label htmlFor="backup-database">数据库</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="backup-files" defaultChecked />
                      <Label htmlFor="backup-files">上传文件</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="backup-config" defaultChecked />
                      <Label htmlFor="backup-config">系统配置</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>备份存储</Label>
                  <div className="space-y-2">
                    <Select defaultValue="local">
                      <SelectTrigger>
                        <SelectValue placeholder="选择备份存储位置" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">本地存储</SelectItem>
                        <SelectItem value="s3">Amazon S3</SelectItem>
                        <SelectItem value="oss">阿里云OSS</SelectItem>
                        <SelectItem value="cos">腾讯云COS</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Switch id="backup-encryption" defaultChecked />
                      <Label htmlFor="backup-encryption">加密备份</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>备份保留</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="backup-rotation" defaultChecked />
                      <Label htmlFor="backup-rotation">启用备份轮换</Label>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="max-backups">最大备份数量</Label>
                        <Input id="max-backups" type="number" defaultValue="10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-backup-age">最大备份保留天数</Label>
                        <Input id="max-backup-age" type="number" defaultValue="30" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button onClick={handleBackup}>
                    <ArrowUpToLine className="mr-2 h-4 w-4" />
                    立即备份
                  </Button>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    恢复备份
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    查看备份历史
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">重置为默认值</Button>
              <Button onClick={handleSaveSettings}>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>系统维护</CardTitle>
              <CardDescription>管理系统维护和性能优化</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>维护模式</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="maintenance-mode"
                        checked={maintenanceMode}
                        onCheckedChange={handleMaintenanceToggle}
                      />
                      <Label htmlFor="maintenance-mode">启用维护模式</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">启用维护模式后，除管理员外的用户将无法访问系统</p>
                    {maintenanceMode && (
                      <div className="mt-2">
                        <Label htmlFor="maintenance-message">维护信息</Label>
                        <Textarea
                          id="maintenance-message"
                          defaultValue="系统正在进行维护，预计将在1小时内完成。给您带来的不便，敬请谅解。"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>缓存管理</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-cache" defaultChecked />
                      <Label htmlFor="enable-cache">启用系统缓存</Label>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button variant="outline">清除应用缓存</Button>
                      <Button variant="outline">清除配置缓存</Button>
                      <Button variant="outline">清除路由缓存</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>日志管理</Label>
                  <div className="space-y-2">
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="日志轮换" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">单一文件</SelectItem>
                        <SelectItem value="daily">每日轮换</SelectItem>
                        <SelectItem value="weekly">每周轮换</SelectItem>
                        <SelectItem value="monthly">每月轮换</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="log-days">保留天数</Label>
                      <Input id="log-days" type="number" defaultValue="30" className="max-w-[100px]" />
                    </div>
                    <Button variant="outline">
                      <Trash className="mr-2 h-4 w-4" />
                      清理旧日志
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>计划任务</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-scheduler" defaultChecked />
                      <Label htmlFor="enable-scheduler">启用计划任务</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">上次运行时间: 2023-07-15 03:00:00</span>
                    </div>
                    <Button variant="outline">查看计划任务列表</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>系统优化</Label>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button variant="outline">优化数据库</Button>
                      <Button variant="outline">重建索引</Button>
                      <Button variant="outline">清理临时文件</Button>
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
