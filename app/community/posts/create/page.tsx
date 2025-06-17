"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SiteHeader } from "@/components/site-header"

export default function CreatePostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [postType, setPostType] = useState("blog")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: postType === "blog" ? "博客发布成功" : postType === "question" ? "问题发布成功" : "讨论发布成功",
        description: "您的内容已成功发布",
      })
      router.push("/community")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* 检查并移除重复的导航栏
      如果页面中包含SiteHeader组件，请删除它
      如果页面中包含重复的导航栏，请删除多余的导航栏 */}
      <SiteHeader />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/community" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              返回社区
            </Link>
          </Button>
        </div>
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>发布内容</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>内容类型</Label>
                  <RadioGroup
                    defaultValue="blog"
                    className="flex flex-wrap gap-4"
                    value={postType}
                    onValueChange={setPostType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="blog" id="blog" />
                      <Label htmlFor="blog" className="cursor-pointer">
                        博客文章
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="question" id="question" />
                      <Label htmlFor="question" className="cursor-pointer">
                        问答
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="discussion" id="discussion" />
                      <Label htmlFor="discussion" className="cursor-pointer">
                        讨论
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">标题</Label>
                  <Input
                    id="title"
                    placeholder={
                      postType === "blog"
                        ? "请输入博客标题"
                        : postType === "question"
                          ? "请输入问题标题"
                          : "请输入讨论标题"
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">分类</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">技术分享</SelectItem>
                      <SelectItem value="project">项目展示</SelectItem>
                      <SelectItem value="experience">学习心得</SelectItem>
                      <SelectItem value="notice">活动通知</SelectItem>
                      <SelectItem value="question">问题讨论</SelectItem>
                      {postType === "question" && (
                        <>
                          <SelectItem value="hardware">硬件问题</SelectItem>
                          <SelectItem value="software">软件问题</SelectItem>
                          <SelectItem value="algorithm">算法问题</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">标签</Label>
                  <Input id="tags" placeholder="输入标签，用逗号分隔" />
                  <p className="text-xs text-muted-foreground">例如：Arduino, 单片机, 传感器</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">内容</Label>
                  <Textarea
                    id="content"
                    placeholder={
                      postType === "blog"
                        ? "请输入博客内容"
                        : postType === "question"
                          ? "请详细描述您的问题，包括您已经尝试过的解决方案"
                          : "请输入讨论内容"
                    }
                    className="min-h-[300px]"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/community")}>
                  取消
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "发布中..."
                    : postType === "blog"
                      ? "发布博客"
                      : postType === "question"
                        ? "发布问题"
                        : "发布讨论"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
