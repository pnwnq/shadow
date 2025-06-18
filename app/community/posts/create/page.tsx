"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { CommunityCategory, CommunityPostType } from "@prisma/client"

import { PostCreationRequest, PostValidator } from "@/lib/validators/post"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { SiteHeader } from "@/components/site-header"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CreatePostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [categories, setCategories] = useState<CommunityCategory[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get<CommunityCategory[]>("/api/community/categories")
        setCategories(data)
      } catch (error) {
        toast({
          title: "错误",
          description: "无法加载分类，请稍后重试。",
          variant: "destructive",
        })
      }
    }
    fetchCategories()
  }, [toast])

  const form = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
      type: CommunityPostType.BLOG,
    },
  })

  // Watch for changes in the 'type' field to update the form's default value
  const postType = form.watch("type")

  const { mutate: createPost, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: PostCreationRequest) => {
      const { data: responseData } = await axios.post("/api/community/posts", data)
      return responseData
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          return toast({
            title: "输入无效",
            description: "请检查您的输入是否符合要求。",
            variant: "destructive",
          })
        }
      }
      toast({
        title: "发生错误",
        description: "无法创建帖子，请稍后再试。",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        title: "发布成功",
        description: "您的内容已成功发布。",
      })
      router.refresh()
      router.push("/community")
    },
  })

  function onSubmit(data: PostCreationRequest) {
    createPost(data)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>内容类型</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value as CommunityPostType)}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value={CommunityPostType.BLOG} id="blog" />
                              </FormControl>
                              <Label htmlFor="blog" className="cursor-pointer">
                                博客文章
                              </Label>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value={CommunityPostType.QUESTION} id="question" />
                              </FormControl>
                              <Label htmlFor="question" className="cursor-pointer">
                                问答
                              </Label>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value={CommunityPostType.DISCUSSION} id="discussion" />
                              </FormControl>
                              <Label htmlFor="discussion" className="cursor-pointer">
                                讨论
                              </Label>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>标题</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              postType === "BLOG"
                                ? "请输入博客标题"
                                : postType === "QUESTION"
                                  ? "请输入问题标题"
                                  : "请输入讨论标题"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>分类</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择一个分类" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* We can add tag input functionality later */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">标签</Label>
                    <Input id="tags" placeholder="输入标签，用逗号分隔" />
                    <p className="text-xs text-muted-foreground">例如：Arduino, 单片机, 传感器</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>内容</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={
                              postType === "BLOG"
                                ? "请输入博客内容"
                                : postType === "QUESTION"
                                  ? "请详细描述您的问题，包括您已经尝试过的解决方案"
                                  : "请输入讨论内容"
                            }
                            className="min-h-[300px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.push("/community")}>
                    取消
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? "发布中..."
                      : postType === "BLOG"
                        ? "发布博客"
                        : postType === "QUESTION"
                          ? "发布问题"
                          : "发布讨论"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </main>
    </div>
  )
}
