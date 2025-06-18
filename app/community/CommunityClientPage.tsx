"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Search, Filter, Plus, MessageSquare, ThumbsUp, Eye, Users, MessageCircle, Bell } from "lucide-react"
import {
  CommunityPost,
  CommunityCategory,
  CommunityPostVote,
  User,
  CommunityComment,
} from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type ExtendedPost = CommunityPost & {
  category: CommunityCategory | null
  votes: CommunityPostVote[]
  author: User
  comments: CommunityComment[]
}

interface CommunityClientPageProps {
  initialPosts: ExtendedPost[]
}

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

export default function CommunityClientPage({
  initialPosts,
}: CommunityClientPageProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()
  const { data: session, status } = useSession()

  const userRole = session?.user?.role
  const canPost = status === "authenticated" && userRole && ["SUPER_ADMIN", "ADMIN", "MEMBER"].includes(userRole)

  // 过滤帖子
  const filteredPosts = posts.filter((post) => {
    if (
      searchQuery &&
      !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      post.content &&
      !post.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (activeTab !== "all" && activeTab !== "pinned") {
      // @ts-ignore
      return post.category?.name.toLowerCase() === activeTab.toLowerCase()
    }

    // if (activeTab === "pinned") { // 'isPinned' is not in the model yet
    //   return post.isPinned
    // }

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

function PostCard({ post }: { post: ExtendedPost }) {
  const router = useRouter()
  const upVotes = post.votes.filter((vote) => vote.type === "UP").length
  const downVotes = post.votes.filter((vote) => vote.type === "DOWN").length
  const voteCount = upVotes - downVotes

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => router.push(`/community/posts/${post.id}`)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{post.category?.name || "无分类"}</Badge>
          {/* Add pin logic later */}
        </div>
        <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {post.content?.substring(0, 200) || "没有内容..."}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{post.author.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <span>{post.author.name}</span>
          <span>·</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{voteCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.viewCount}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
