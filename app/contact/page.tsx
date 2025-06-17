import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/welcome">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">联系方式</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-semibold">联系信息</h2>

          <div className="mb-8 space-y-4">
            <div className="flex items-start">
              <MapPin className="mr-3 h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">地址</h3>
                <p className="text-muted-foreground">
                  中国浙江省宁波市江北区风华路201号
                  <br />
                  宁波工程学院 智能工程学院 机器人实验室
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="mr-3 h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">邮箱</h3>
                <p className="text-muted-foreground">
                  shadow.lab@nbut.edu.cn
                  <br />
                  robotics.shadow@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="mr-3 h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">电话</h3>
                <p className="text-muted-foreground">
                  +86 (0574) 8780-xxxx
                  <br />
                  +86 138-xxxx-xxxx（实验室负责人）
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-6">
            <h3 className="mb-3 text-lg font-medium">开放时间</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>周一至周五</span>
                <span>9:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>周六</span>
                <span>10:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>周日</span>
                <span>闭馆</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>* 寒暑假期间开放时间可能有所调整，请提前联系确认</p>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>发送消息</CardTitle>
              <CardDescription>如有任何问题或合作意向，请填写以下表单联系我们</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input id="name" placeholder="请输入您的姓名" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">主题</Label>
                <Select>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="请选择联系主题" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">一般咨询</SelectItem>
                    <SelectItem value="cooperation">合作意向</SelectItem>
                    <SelectItem value="visit">参观预约</SelectItem>
                    <SelectItem value="join">加入实验室</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">消息内容</Label>
                <Textarea id="message" placeholder="请输入您的消息内容" rows={5} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <Send className="h-4 w-4" />
                <span>发送消息</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold">位置</h2>
        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-slate-200">
          {/* 这里可以嵌入地图，暂时用占位图 */}
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-muted-foreground">宁波工程学院地图加载中...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
