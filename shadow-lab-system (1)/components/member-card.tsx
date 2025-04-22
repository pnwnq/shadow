import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MemberCardProps {
  member: {
    id: string
    name: string
    avatar: string
    role: string
    online: boolean
    major: string
    grade: string
    tags: string[]
  }
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge>{member.role}</Badge>
          <Badge variant="outline" className={member.online ? "text-green-500" : "text-red-500"}>
            {member.online ? "在线" : "离线"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-center">
        <Avatar className="mx-auto h-20 w-20">
          <AvatarFallback>{member.avatar}</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-2 text-lg">
          <Link href={`/community/members/${member.id}`} className="hover:underline">
            {member.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {member.major} / {member.grade}
        </p>
        <div className="mt-2 flex justify-center gap-2">
          {member.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2 pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/community/members/${member.id}`}>查看资料</Link>
        </Button>
        <Button variant="outline" size="sm">
          添加好友
        </Button>
      </CardFooter>
    </Card>
  )
}
