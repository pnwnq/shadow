"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Filter, Plus, MessageSquare, ThumbsUp, Eye, Users, MessageCircle, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { hasPermission, getCurrentUserRole } from "@/lib/auth-utils"

// 模拟数据 - 帖子
const posts = [
      {
            id: "1",
            title: "2024年全国大学生机器人大赛报名通知",
            content: "2024年全国大学生机器人大赛将于6月在北京举行，我校将组织队伍参加。有意向的同学请在5月15日前报名...",
            author: {
                  name: "张教授",
                  avatar: "ZP",
            },
            category: "通知",
            tags: ["比赛", "机器人", "报名"],
            likes: 24,
            views: 156,
            comments: 8,
            createdAt: "2024-04-28",
            isPinned: true,
      },
      {
            id: "2",
            title: "分享：视觉SLAM在机器人导航中的应用",
            content: "最近在项目中使用了视觉SLAM技术，效果不错。这里分享一下我们的实现方法和一些优化技巧...",
            author: {
                  name: "李明",
                  avatar: "LM",
            },
            category: "技术分享",
            tags: ["SLAM", "计算机视觉", "导航"],
            likes: 42,
            views: 231,
            comments: 15,
            createdAt: "2024-04-25",
      },
      {
            id: "3",
            title: "请教：关于机械臂控制精度问题",
            content: "我们团队在开发一个高精度机械臂，但在实际测试中发现精度误差较大。有没有经验丰富的同学可以给些建议？",
            author: {
                  name: "王小明",
                  avatar: "WXM",
            },
            category: "问答",
            tags: ["机械臂", "控制", "精度"],
            likes: 12,
            views: 98,
            comments: 7,
            createdAt: "2024-04-23",
      },
      {
            id: "4",
            title: "实验室新购入的激光雷达使用指南",
            content: "实验室最近购入了新型号的激光雷达，这里整理了一份详细的使用指南和注意事项，供大家参考...",
            author: {
                  name: "赵工",
                  avatar: "ZG",
            },
            category: "资源",
            tags: ["激光雷达", "设备", "教程"],
            likes: 35,
            views: 187,
            comments: 5,
            createdAt: "2024-04-20",
      },
      {
            id: "5",
            title: "分享几个好用的ROS开发工具",
            content: "在ROS开发中，有一些工具可以大大提高效率。这里分享几个我常用的工具和插件，希望对大家有帮助...",
            author: {
                  name: "陈华",
                  avatar: "CH",
            },
            category: "技术分享",
            tags: ["ROS", "开发工具", "效率"],
            likes: 56,
            views: 312,
            comments: 23,
            createdAt: "2024-04-18",
      },
]

// 模拟数据 - 热门标签
const popularTags = [
      { name: "机器人", count: 42 },
      { name: "比赛", count: 35 },
      { name: "ROS", count: 28 },
      { name: "SLAM", count: 24 },
      { name: "计算机视觉", count: 22 },
      { name: "深度学习", count: 19 },
      { name: "Arduino", count: 17 },
      { name: "树莓派", count: 15 },
      { name: "控制算法", count: 13 },
      { name: "传感器", count: 12 },
]

// 模拟数据 - 活跃用户
const activeUsers = [
      { name: "张教授", avatar: "ZP", posts: 24, role: "教师" },
      { name: "李明", avatar: "LM", posts: 18, role: "研究生" },
      { name: "陈华", avatar: "CH", posts: 15, role: "本科生" },
      { name: "赵工", avatar: "ZG", posts: 12, role: "实验员" },
      { name: "王小明", avatar: "WXM", posts: 10, role: "研究生" },
]

export default function CommunityClientPage() {
      const [searchQuery, setSearchQuery] = useState("")
      const [activeTab, setActiveTab] = useState("all")
      const router = useRouter()
      const userRole = getCurrentUserRole()
      const canPost = hasPermission(userRole, "community_post")

      // 过滤帖子
      const filteredPosts = posts.filter((post) => {
            // 根据搜索词过滤
            if (
                  searchQuery &&
                  !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  !post.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  !post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            ) {
                  return false
            }

            // 根据标签过滤
            if (activeTab !== "all" && activeTab !== "pinned") {
                  return post.category.toLowerCase() === activeTab.toLowerCase()
            }

            // 置顶帖子过滤
            if (activeTab === "pinned") {
                  return post.isPinned
            }

            return true
      })

      return (
            <div className="container mx-auto py-6 px-4 md:px-8">
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                              <h1 className="text-3xl font-bold tracking-tight">社区论坛</h1>
                              <p className="text-muted-foreground">分享知识、交流经验、解决问题</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                              <Button variant="outline" asChild>
                                    <Link href="/community/members">
                                          <Users className="mr-2 h-4 w-4" />
                                          成员目录
                                    </Link>
                              </Button>
                              <Button variant="outline" asChild>
                                    <Link href="/community/chat">
                                          <MessageCircle className="mr-2 h-4 w-4" />
                                          实时聊天
                                    </Link>
                              </Button>
                              <Button variant="outline" asChild>
                                    <Link href="/notifications">
                                          <Bell className="mr-2 h-4 w-4" />
                                          通知中心
                                    </Link>
                              </Button>
                              {canPost && (
                                    <Button asChild>
                                          <Link href="/community/posts/create">
                                                <Plus className="mr-2 h-4 w-4" />
                                                发布帖子
                                          </Link>
                                    </Button>
                              )}
                        </div>
                  </div>

                  <div className="mb-6 grid gap-4 md:grid-cols-4">
                        <div className="md:col-span-3">
                              <div className="mb-4 flex items-center gap-2">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                    <Input
                                          placeholder="搜索帖子、标签或内容..."
                                          value={searchQuery}
                                          onChange={(e) => setSearchQuery(e.target.value)}
                                          className="flex-1"
                                    />
                                    <Button variant="outline" size="icon">
                                          <Filter className="h-4 w-4" />
                                    </Button>
                              </div>

                              <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
                                    <TabsList className="mb-4">
                                          <TabsTrigger value="all">全部</TabsTrigger>
                                          <TabsTrigger value="pinned">置顶</TabsTrigger>
                                          <TabsTrigger value="通知">通知</TabsTrigger>
                                          <TabsTrigger value="技术分享">技术分享</TabsTrigger>
                                          <TabsTrigger value="问答">问答</TabsTrigger>
                                          <TabsTrigger value="资源">资源</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="all" className="space-y-4">
                                          {filteredPosts.map((post) => (
                                                <PostCard key={post.id} post={post} />
                                          ))}
                                    </TabsContent>

                                    <TabsContent value="pinned" className="space-y-4">
                                          {filteredPosts.map((post) => (
                                                <PostCard key={post.id} post={post} />
                                          ))}
                                    </TabsContent>

                                    <TabsContent value="通知" className="space-y-4">
                                          {filteredPosts.map((post) => (
                                                <PostCard key={post.id} post={post} />
                                          ))}
                                    </TabsContent>

                                    <TabsContent value="技术分享" className="space-y-4">
                                          {filteredPosts.map((post) => (
                                                <PostCard key={post.id} post={post} />
                                          ))}
                                    </TabsContent>

                                    <TabsContent value="问答" className="space-y-4">
                                          {filteredPosts.map((post) => (
                                                <PostCard key={post.id} post={post} />
                                          ))}
                                    </TabsContent>

                                    <TabsContent value="资源" className="space-y-4">
                                          {filteredPosts.map((post) => (
                                                <PostCard key={post.id} post={post} />
                                          ))}
                                    </TabsContent>
                              </Tabs>
                        </div>

                        <div className="space-y-6">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>热门标签</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                          <div className="flex flex-wrap gap-2">
                                                {popularTags.map((tag) => (
                                                      <Badge
                                                            key={tag.name}
                                                            variant="secondary"
                                                            className="cursor-pointer"
                                                            onClick={() => setSearchQuery(tag.name)}
                                                      >
                                                            {tag.name} ({tag.count})
                                                      </Badge>
                                                ))}
                                          </div>
                                    </CardContent>
                              </Card>

                              <Card>
                                    <CardHeader>
                                          <CardTitle>活跃成员</CardTitle>
                                          <CardDescription>社区贡献最多的成员</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                          <div className="space-y-4">
                                                {activeUsers.map((user) => (
                                                      <div key={user.name} className="flex items-center gap-3">
                                                            <Avatar>
                                                                  <AvatarFallback>{user.avatar}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                  <p className="font-medium">{user.name}</p>
                                                                  <p className="text-sm text-muted-foreground">
                                                                        {user.role} · {user.posts} 篇帖子
                                                                  </p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </CardContent>
                                    <CardFooter>
                                          <Button variant="outline" className="w-full" asChild>
                                                <Link href="/community/members">
                                                      <Users className="mr-2 h-4 w-4" />
                                                      查看所有成员
                                                </Link>
                                          </Button>
                                    </CardFooter>
                              </Card>
                        </div>
                  </div>
            </div>
      )
}

function PostCard({ post }: { post: any }) {
      return (
            <Card>
                  <CardHeader>
                        <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                          <AvatarFallback>{post.author.avatar}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{post.author.name}</span>
                                    <span className="text-xs text-muted-foreground">发布于 {post.createdAt}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                    <Badge variant="outline">{post.category}</Badge>
                                    {post.isPinned && <Badge variant="secondary">置顶</Badge>}
                              </div>
                        </div>
                        <CardTitle className="mt-2">
                              <Link href={`/community/posts/${post.id}`} className="hover:underline">
                                    {post.title}
                              </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{post.content}</CardDescription>
                  </CardHeader>
                  <CardContent>
                        <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag: string) => (
                                    <Badge key={tag} variant="outline">
                                          {tag}
                                    </Badge>
                              ))}
                        </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                        <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{post.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{post.views}</span>
                              </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                              <Link href={`/community/posts/${post.id}`}>阅读全文</Link>
                        </Button>
                  </CardFooter>
            </Card>
      )
}
