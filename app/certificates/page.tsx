"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Plus, Search, Filter, Award, Medal, FileText, CheckCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

// 模拟证书数据
const certificates = [
  {
    id: "cert1",
    title: "2023年全国大学生机器人大赛三等奖",
    issueDate: "2023-11-05",
    issuer: "全国大学生机器人大赛组委会",
    type: "competition",
    image: "/placeholder.svg?key=0ol2p",
    level: "国家级",
  },
  {
    id: "cert2",
    title: "2022年中国机器人及人工智能大赛二等奖",
    issueDate: "2022-10-15",
    issuer: "中国自动化学会",
    type: "competition",
    image: "/placeholder.svg?key=2yy24",
    level: "国家级",
  },
  {
    id: "cert3",
    title: "2023年智能车竞赛华东赛区一等奖",
    issueDate: "2023-07-20",
    issuer: "全国大学生智能车竞赛组委会",
    type: "competition",
    image: "/placeholder.svg?key=5xb93",
    level: "区域级",
  },
  {
    id: "cert4",
    title: "ROS开发基础认证",
    issueDate: "2023-10-15",
    issuer: "机器人实验室",
    type: "course",
    image: "/placeholder.svg?key=9jk2p",
    level: "实验室级",
  },
  {
    id: "cert5",
    title: "机器视觉算法专项技能证书",
    issueDate: "2023-09-20",
    issuer: "机器人实验室",
    type: "skill",
    image: "/placeholder.svg?key=7ht5q",
    level: "实验室级",
  },
]

export default function CertificatesPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccess(true)
      toast({
        title: "证书上传成功",
        description: "您的证书已成功添加到列表中",
        variant: "default",
      })
      const timer = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(timer)
    }

    if (searchParams.get("deleted") === "true") {
      setShowDeleted(true)
      toast({
        title: "证书已删除",
        description: "证书已成功从您的档案中删除",
        variant: "destructive",
      })
      const timer = setTimeout(() => setShowDeleted(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams, toast])

  // 根据当前标签和搜索过滤证书
  const filteredCertificates = certificates.filter((cert) => {
    const matchesTab = activeTab === "all" || cert.type === activeTab
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">证书与奖项</h1>
        <p className="text-muted-foreground">管理您的技能证书、课程证书和竞赛奖项</p>
      </div>

      {showSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">证书上传成功！您的证书已添加到列表中。</AlertDescription>
        </Alert>
      )}

      {showDeleted && (
        <Alert className="bg-red-50 border-red-200">
          <Trash2 className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-600">证书已成功删除。</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="搜索证书或颁发机构..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">搜索</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">筛选</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>筛选条件</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">证书级别</DropdownMenuLabel>
                <DropdownMenuItem>国家级</DropdownMenuItem>
                <DropdownMenuItem>省级</DropdownMenuItem>
                <DropdownMenuItem>区域级</DropdownMenuItem>
                <DropdownMenuItem>校级</DropdownMenuItem>
                <DropdownMenuItem>实验室级</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">获得时间</DropdownMenuLabel>
                <DropdownMenuItem>最近一个月</DropdownMenuItem>
                <DropdownMenuItem>最近三个月</DropdownMenuItem>
                <DropdownMenuItem>最近一年</DropdownMenuItem>
                <DropdownMenuItem>全部时间</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button asChild>
          <Link href="/certificates/upload" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            上传新证书
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            全部
          </TabsTrigger>
          <TabsTrigger value="competition" className="flex items-center gap-1">
            <Medal className="h-4 w-4" />
            竞赛奖项
          </TabsTrigger>
          <TabsTrigger value="course" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            课程证书
          </TabsTrigger>
          <TabsTrigger value="skill" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            技能证书
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((certificate) => (
                <Link key={certificate.id} href={`/certificates/${certificate.id}`}>
                  <Card className="overflow-hidden h-full transition-all hover:border-primary">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={certificate.type === "competition" ? "default" : "secondary"}>
                          {certificate.type === "competition"
                            ? "竞赛奖项"
                            : certificate.type === "course"
                              ? "课程证书"
                              : "技能证书"}
                        </Badge>
                        <Badge variant="outline">{certificate.level}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2 text-base">{certificate.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <span>{certificate.issuer}</span>
                        <span>•</span>
                        <span>{certificate.issueDate}</span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Award className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">没有找到证书</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "没有找到匹配的证书，请尝试其他搜索条件"
                    : "您还没有添加任何证书，点击上传新证书按钮添加"}
                </p>
                {!searchQuery && (
                  <Button className="mt-4" asChild>
                    <Link href="/certificates/upload">
                      <Plus className="mr-2 h-4 w-4" />
                      上传新证书
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="competition" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 竞赛奖项内容与全部相同，但已经通过过滤器筛选 */}
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((certificate) => (
                <Link key={certificate.id} href={`/certificates/${certificate.id}`}>
                  <Card className="overflow-hidden h-full transition-all hover:border-primary">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge>竞赛奖项</Badge>
                        <Badge variant="outline">{certificate.level}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2 text-base">{certificate.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <span>{certificate.issuer}</span>
                        <span>•</span>
                        <span>{certificate.issueDate}</span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Medal className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">没有找到竞赛奖项</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "没有找到匹配的竞赛奖项，请尝试其他搜索条件"
                    : "您还没有添加任何竞赛奖项，点击上传新证书按钮添加"}
                </p>
                {!searchQuery && (
                  <Button className="mt-4" asChild>
                    <Link href="/certificates/upload">
                      <Plus className="mr-2 h-4 w-4" />
                      上传新证书
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="course" className="mt-6">
          {/* 课程证书内容与全部相同，但已经通过过滤器筛选 */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((certificate) => (
                <Link key={certificate.id} href={`/certificates/${certificate.id}`}>
                  <Card className="overflow-hidden h-full transition-all hover:border-primary">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">课程证书</Badge>
                        <Badge variant="outline">{certificate.level}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2 text-base">{certificate.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <span>{certificate.issuer}</span>
                        <span>•</span>
                        <span>{certificate.issueDate}</span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">没有找到课程证书</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "没有找到匹配的课程证书，请尝试其他搜索条件"
                    : "您还没有添加任何课程证书，点击上传新证书按钮添加"}
                </p>
                {!searchQuery && (
                  <Button className="mt-4" asChild>
                    <Link href="/certificates/upload">
                      <Plus className="mr-2 h-4 w-4" />
                      上传新证书
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="skill" className="mt-6">
          {/* 技能证书内容与全部相同，但已经通过过滤器筛选 */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((certificate) => (
                <Link key={certificate.id} href={`/certificates/${certificate.id}`}>
                  <Card className="overflow-hidden h-full transition-all hover:border-primary">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">技能证书</Badge>
                        <Badge variant="outline">{certificate.level}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2 text-base">{certificate.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <span>{certificate.issuer}</span>
                        <span>•</span>
                        <span>{certificate.issueDate}</span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Award className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">没有找到技能证书</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery
                    ? "没有找到匹配的技能证书，请尝试其他搜索条件"
                    : "您还没有添加任何技能证书，点击上传新证书按钮添加"}
                </p>
                {!searchQuery && (
                  <Button className="mt-4" asChild>
                    <Link href="/certificates/upload">
                      <Plus className="mr-2 h-4 w-4" />
                      上传新证书
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
