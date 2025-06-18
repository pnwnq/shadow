"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronLeft, MessageSquare, Share2, ThumbsUp } from "lucide-react"
import { useParams } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { CommunityPost, CommunityComment, User, CommunityPostVote, CommunityCommentVote } from "@prisma/client"
import { CommentCreationRequest, CommentValidator } from "@/lib/validators/comment"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

type ExtendedComment = CommunityComment & {
  author: User
  votes: CommunityCommentVote[]
  replies: ExtendedComment[]
}

type ExtendedPost = CommunityPost & {
  author: User
  category: { name: string } | null
  votes: CommunityPostVote[]
  comments: ExtendedComment[]
}

const PostDetailSkeleton = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Skeleton className="h-10 w-3/4" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
      </div>
      <Separator />
      <h3 className="text-lg font-semibold">评论</h3>
      <div className="space-y-4">
        <div className="flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Comment({ comment, postId }: { comment: ExtendedComment; postId: string }) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isReplying, setIsReplying] = useState(false)

  const commentForm = useForm<CommentCreationRequest>({
    resolver: zodResolver(CommentValidator),
    defaultValues: {
      postId,
      content: "",
      replyToId: comment.id,
    },
  })

  const { mutate: postReply, isPending: isReplyingPending } = useMutation({
    mutationFn: async (payload: CommentCreationRequest) => {
      await axios.post(`/api/community/posts/${postId}/comments`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] })
      setIsReplying(false)
      commentForm.reset()
      toast({ title: "成功", description: "您的回复已成功发布。" })
    },
    onError: () => {
      toast({ title: "发生错误", description: "无法提交回复，请稍后再试。", variant: "destructive" })
    }
  })

  const { mutate: vote, isPending: isVoting } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/community/comments/${comment.id}/vote`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] })
    },
    onError: () => {
      toast({ title: "错误", description: "点赞失败", variant: "destructive" })
    }
  })

  const userVote = comment.votes.find((v: CommunityCommentVote) => v.userId === session?.user.id)
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{getInitials(comment.author.name || "无名")}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <Link href={`/community/members/${comment.author.id}`} className="text-sm font-medium hover:underline">
              {comment.author.name}
            </Link>
            <span className="text-xs text-muted-foreground">{format(new Date(comment.createdAt), "yyyy-MM-dd HH:mm")}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 gap-1 px-2" onClick={() => vote()} disabled={!session || isVoting}>
              <ThumbsUp className={`h-3 w-3 ${userVote ? 'text-blue-500' : ''}`} />
              <span className="text-xs">{comment.votes.length}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 gap-1 px-2" onClick={() => setIsReplying(!isReplying)} disabled={!session}>
              <MessageSquare className="h-3 w-3" />
              <span className="text-xs">回复</span>
            </Button>
          </div>

          {isReplying && (
            <div className="mt-2">
              <Form {...commentForm}>
                <form onSubmit={commentForm.handleSubmit(data => postReply(data))}>
                  <FormField control={commentForm.control} name="content" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder={`回复 @${comment.author.name}...`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setIsReplying(false)}>取消</Button>
                    <Button size="sm" type="submit" disabled={isReplyingPending}>
                      {isReplyingPending ? '提交中...' : '回复'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-4 space-y-4 border-l-2 pl-4">
          {comment.replies.map((reply: ExtendedComment) => (
            <Comment key={reply.id} comment={reply} postId={postId} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function PostDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const postId = params.id as string

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<ExtendedPost>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/community/posts/${postId}`)
      return data
    },
    enabled: !!postId,
  })

  const commentForm = useForm<CommentCreationRequest>({
    resolver: zodResolver(CommentValidator),
    defaultValues: {
      postId,
      content: "",
    },
  })

  const { mutate: postComment, isPending: isCommenting } = useMutation({
    mutationFn: async (payload: CommentCreationRequest) => {
      await axios.post(`/api/community/posts/${postId}/comments`, payload)
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.status === 401) {
        return toast({ title: "请先登录", description: "您需要登录后才能发表评论。", variant: "destructive" })
      }
      toast({ title: "发生错误", description: "无法提交评论，请稍后再试。", variant: "destructive" })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] })
      commentForm.reset()
      toast({ title: "成功", description: "您的评论已成功发布。" })
    },
  })

  const { mutate: vote, isPending: isVoting } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/community/posts/${postId}/vote`)
    },
    onError: (err, _, context: { previousPost: ExtendedPost | undefined } | undefined) => {
      toast({ title: "发生错误", description: "无法完成点赞操作。", variant: "destructive" })
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost)
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] })
      const previousPost = queryClient.getQueryData<ExtendedPost>(["post", postId])

      queryClient.setQueryData<ExtendedPost>(["post", postId], (oldData: ExtendedPost | undefined) => {
        if (!oldData) return undefined

        const existingVote = oldData.votes.find((v: CommunityPostVote) => v.userId === session?.user?.id)
        let newVotes: CommunityPostVote[]

        if (existingVote) {
          newVotes = oldData.votes.filter((v: CommunityPostVote) => v.userId !== session?.user?.id)
        } else {
          const newVote: CommunityPostVote = {
            id: 'optimistic-vote',
            postId: postId,
            userId: session!.user.id,
            type: 'UP'
          }
          newVotes = [...oldData.votes, newVote]
        }
        return { ...oldData, votes: newVotes }
      })
      return { previousPost }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] })
    },
  })

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({ title: "链接已复制", description: "博客链接已复制到剪贴板" })
  }

  if (isLoading) return <main className="flex-1 space-y-6 p-4 md:p-8"><PostDetailSkeleton /></main>
  if (isError || !post) return (
    <main className="flex-1 p-4 md:p-8">
      <div className="text-center">
        <p className="text-destructive">无法加载帖子。</p>
        <Button asChild className="mt-4"><Link href="/community">返回社区</Link></Button>
      </div>
    </main>
  )

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase()
  const userVote = post.votes.find((v: CommunityPostVote) => v.userId === session?.user?.id)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="mb-6">
          <Link
            href="/community"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            返回社区
          </Link>
        </div>
        <div className="mx-auto max-w-4xl">
          <article className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(post.author.name || "无名")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/community/members/${post.author.id}`} className="font-medium hover:underline">
                      {post.author.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{format(new Date(post.createdAt), "yyyy-MM-dd HH:mm")}</p>
                  </div>
                </div>
                {post.category && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">
                      {post.category.name}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            <div
              className="prose prose-sm max-w-none dark:prose-invert md:prose-base"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
            <div className="flex items-center gap-4">
              <Button
                variant={userVote ? "default" : "outline"}
                size="sm"
                className="gap-1"
                onClick={() => vote()}
                disabled={isVoting || !session}
              >
                <ThumbsUp className="h-4 w-4" />
                点赞 ({post.votes.length})
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                分享
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <BookOpen className="h-4 w-4" />
                收藏
              </Button>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">评论 ({post.comments.length})</h3>
              <div className="space-y-4">
                {post.comments.map((comment: ExtendedComment) => (
                  <Comment key={comment.id} comment={comment} postId={postId} />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">发表评论</h4>
                <Form {...commentForm}>
                  <form onSubmit={commentForm.handleSubmit(data => postComment(data))}>
                    <FormField
                      control={commentForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea placeholder="写下你的评论..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="mt-2 flex justify-end">
                      <Button size="sm" type="submit" disabled={isCommenting || !session}>
                        {isCommenting ? "提交中..." : "提交评论"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}
