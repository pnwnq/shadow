import Link from "next/link"
import { User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { RoleBadge } from "./role-badge"

interface MemberCardProps {
  member: User
}

export function MemberCard({ member }: MemberCardProps) {
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase()

  const { mutate: addFriend, isPending } = useMutation({
    mutationFn: async (targetUserId: string) => {
      const { data } = await axios.post("/api/community/friends/requests", { targetUserId })
      return data
    },
    onSuccess: () => {
      toast.success("好友请求已发送！")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast.info("请求已发送或已是好友关系。")
        } else {
          toast.error("发送请求失败，请稍后再试。")
        }
      } else {
        toast.error("发生未知错误。")
      }
    },
  })

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <RoleBadge role={member.role as any} />
          <Badge variant="outline" className="text-gray-500">离线</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-center">
        <Avatar className="mx-auto h-20 w-20">
          <AvatarFallback>{getInitials(member.name || "U")}</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-2 text-lg">
          <Link href={`/community/members/${member.id}`} className="hover:underline">
            {member.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {member.major || "未知专业"}
        </p>
        <div className="mt-2 flex h-5 justify-center gap-2">
          {/* Awaiting tags logic */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2 pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/community/members/${member.id}`}>查看资料</Link>
        </Button>
        <Button variant="outline" size="sm" onClick={() => addFriend(member.id)} disabled={isPending}>
          {isPending ? "发送中..." : "添加好友"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export function MemberCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-center">
        <Skeleton className="mx-auto h-20 w-20 rounded-full" />
        <Skeleton className="mx-auto mt-2 h-6 w-24" />
        <Skeleton className="mx-auto mt-1 h-4 w-32" />
        <div className="mt-2 flex h-5 justify-center gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2 pt-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  )
}
