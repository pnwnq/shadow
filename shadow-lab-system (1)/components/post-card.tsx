import Link from "next/link"
import { BookOpen, ChevronDown, MessageSquare, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
    author: {
      id: string
      name: string
      avatar: string
    }
    date: string
    tags: string[]
    likes: number
    comments: number
    views: number
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{post.author.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/community/members/${post.author.id}`} className="text-sm font-medium hover:underline">
                {post.author.name}
              </Link>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">操作</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>收藏</DropdownMenuItem>
              <DropdownMenuItem>分享</DropdownMenuItem>
              <DropdownMenuItem>举报</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="mt-2 text-base">
          <Link href={`/community/posts/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{post.views}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/community/posts/${post.id}`}>阅读全文</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
