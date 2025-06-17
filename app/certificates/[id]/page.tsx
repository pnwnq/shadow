"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ChevronLeft,
  Download,
  Share2,
  Calendar,
  Edit,
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle2,
  Trophy,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 模拟证书数据
const certificates = [
  {
    id: "cert1",
    title: "2023年全国大学生机器人大赛三等奖",
    issueDate: "2023-11-05",
    expiryDate: null,
    issuer: "全国大学生机器人大赛组委会",
    issuerLogo: "/placeholder-c58j2.png",
    issuerWebsite: "https://www.cnrobocon.net",
    type: "competition",
    image: "/placeholder-qhuuf.png",
    description:
      "参与2023年全国大学生机器人创新大赛，获得三等奖。该奖项表彰团队在机器人设计与创新方面的突出表现，项目展示了在自主导航和环境感知方面的创新解决方案。",
    skills: ["机器人设计", "控制算法", "嵌入式系统", "团队协作"],
    awardType: "lab",
    credentialId: "COMP-2023-11-05-127",
    verificationUrl: "https://www.cnrobocon.net/verify/COMP-2023-11-05-127",
    value: "高",
    recognitionLevel: "国家级",
    teamMembers: [
      { name: "王五", avatar: "WW", role: "队长" },
      { name: "赵六", avatar: "ZL", role: "硬件工程师" },
      { name: "孙七", avatar: "SQ", role: "软件工程师" },
    ],
    history: [
      { date: "2023-11-05", event: "颁奖典礼" },
      { date: "2023-11-01", event: "决赛评审" },
      { date: "2023-10-15", event: "入围决赛" },
      { date: "2023-09-10", event: "提交参赛作品" },
      { date: "2023-07-01", event: "开始项目开发" },
    ],
  },
  {
    id: "cert2",
    title: "2023年中国机器人及人工智能大赛二等奖",
    issueDate: "2023-09-20",
    expiryDate: null,
    issuer: "中国自动化学会",
    issuerLogo: "/placeholder.svg?height=40&width=40&query=AI%20competition%20logo",
    issuerWebsite: "https://www.robotai.cn",
    type: "competition",
    image: "/placeholder.svg?height=600&width=800&query=AI%20competition%20certificate",
    description:
      "在2023年中国机器人及人工智能大赛中获得二等奖。该比赛是国内人工智能领域最具影响力的赛事之一，团队在计算机视觉和自然语言处理方面的创新应用获得评委高度认可。",
    skills: ["人工智能", "机器人技术", "计算机视觉", "自然语言处理"],
    awardType: "lab",
    credentialId: "AI-2023-09-20-042",
    verificationUrl: "https://www.robotai.cn/verify/AI-2023-09-20-042",
    value: "高",
    recognitionLevel: "国家级",
    teamMembers: [
      { name: "李四", avatar: "LS", role: "队长" },
      { name: "张三", avatar: "ZS", role: "算法工程师" },
      { name: "王五", avatar: "WW", role: "前端工程师" },
    ],
    history: [
      { date: "2023-09-20", event: "颁奖典礼" },
      { date: "2023-09-15", event: "决赛答辩" },
      { date: "2023-08-20", event: "入围决赛" },
      { date: "2023-07-10", event: "提交初赛作品" },
      { date: "2023-06-01", event: "开始项目开发" },
    ],
  },
  {
    id: "cert3",
    title: "2022年全国大学生智能车竞赛一等奖",
    issueDate: "2022-10-15",
    expiryDate: null,
    issuer: "全国大学生智能车竞赛组委会",
    issuerLogo: "/placeholder.svg?height=40&width=40&query=smart%20car%20competition%20logo",
    issuerWebsite: "https://www.smartcar.org.cn",
    type: "competition",
    image: "/placeholder.svg?height=600&width=800&query=smart%20car%20competition%20certificate",
    description:
      "在2022年全国大学生智能车竞赛中获得一等奖。团队设计的智能车在复杂路况下展现出色的自主导航能力，在速度和稳定性方面表现突出。",
    skills: ["嵌入式系统", "传感器技术", "控制算法", "电路设计"],
    awardType: "lab",
    credentialId: "SC-2022-10-15-008",
    verificationUrl: "https://www.smartcar.org.cn/verify/SC-2022-10-15-008",
    value: "中",
    recognitionLevel: "国家级",
    teamMembers: [
      { name: "赵六", avatar: "ZL", role: "队长" },
      { name: "钱七", avatar: "QQ", role: "硬件工程师" },
      { name: "孙八", avatar: "SB", role: "软件工程师" },
    ],
    history: [
      { date: "2022-10-15", event: "颁奖典礼" },
      { date: "2022-10-10", event: "全国总决赛" },
      { date: "2022-09-15", event: "区域赛获胜" },
      { date: "2022-08-10", event: "校内选拔赛" },
      { date: "2022-06-01", event: "开始项目开发" },
    ],
  },
]

export default function CertificateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const certificateId = params.id as string

  // 查找对应的证书数据
  const certificate = certificates.find((cert) => cert.id === certificateId) || certificates[0]

  const [activeTab, setActiveTab] = useState("details")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = () => {
    // 模拟删除操作
    setTimeout(() => {
      router.push("/certificates?deleted=true")
    }, 500)
  }

  return (
    <div className="space-y-6 p-6 md:p-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile">个人资料</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/certificates">证书与奖项</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/certificates/${certificate.id}`}>{certificate.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/certificates" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            返回证书列表
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            含金量: {certificate.value}
          </Badge>
          <Badge>{certificate.recognitionLevel}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">下载</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">分享</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-wechat mr-2 h-4 w-4"
                      >
                        <path d="M9.817 17.18a10.107 10.107 0 0 0 10.5-2.681 8.4 8.4 0 0 0 2.1-8.159 8.4 8.4 0 0 0-7.57-5.19c-4.035-.389-8.105 1.781-9.612 5.04-1.578 3.42.122 7.151 3.623 8.67" />
                        <path d="M6.303 14.503a1.275 1.275 0 1 1 .708-2.322" />
                        <path d="M2.5 17.5c1.421-1.5 3.806-2.5 5.5-2.5a7.5 7.5 0 0 1 7.5 7.5v1h-13a1 1 0 0 1-1-1v-5Z" />
                        <path d="M14.235 14.503a1.275 1.275 0 1 0-.708-2.322" />
                      </svg>
                      分享到微信
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-link mr-2 h-4 w-4"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      复制链接
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-mail mr-2 h-4 w-4"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      通过邮件分享
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={certificate.image || "/placeholder.svg"}
                  alt={certificate.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <CardHeader>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <Badge variant="secondary">竞赛奖项</Badge>
                  <Badge variant="outline">{certificate.awardType === "personal" ? "个人" : "团队"}</Badge>
                </div>
                <h1 className="text-2xl font-bold">{certificate.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>获得日期: {certificate.issueDate}</span>
                </div>
              </div>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">详细信息</TabsTrigger>
                <TabsTrigger value="verification">验证信息</TabsTrigger>
                <TabsTrigger value="history">获奖历程</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 py-4">
                <div>
                  <h3 className="font-medium mb-2">竞赛描述</h3>
                  <p className="text-muted-foreground">{certificate.description}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">相关技能</h3>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">颁发机构</h3>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={certificate.issuerLogo || "/placeholder.svg"} alt={certificate.issuer} />
                      <AvatarFallback>{certificate.issuer.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{certificate.issuer}</p>
                      <a
                        href={certificate.issuerWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground flex items-center gap-1 hover:underline"
                      >
                        访问官网
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {certificate.awardType === "personal" ? (
                  <div>
                    <h3 className="font-medium mb-2">获得者</h3>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{certificate.user?.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{certificate.user?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {certificate.user?.role} • {certificate.user?.department}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium mb-2">团队成员</h3>
                    <div className="space-y-3">
                      {certificate.teamMembers?.map((member, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="verification" className="space-y-6 py-4">
                <div>
                  <h3 className="font-medium mb-2">证书ID</h3>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1">{certificate.credentialId}</code>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-copy"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      <span className="sr-only">复制</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">验证链接</h3>
                  <div className="flex items-center gap-2">
                    <a
                      href={certificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {certificate.verificationUrl}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-copy"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      <span className="sr-only">复制</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">验证状态</h3>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>已验证</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" asChild>
                    <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                      在线验证此证书
                    </a>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history" className="py-4">
                <div className="relative border-l pl-6 ml-3 space-y-6">
                  {certificate.history?.map((event, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border bg-background"></div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="font-medium mt-1">{event.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <CardFooter className="border-t px-6 py-4">
              <div className="flex w-full justify-between">
                <Button variant="outline" asChild>
                  <Link href="/certificates">返回列表</Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/certificates/${certificate.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      编辑证书
                    </Link>
                  </Button>
                  <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        删除证书
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确认删除证书</AlertDialogTitle>
                        <AlertDialogDescription>
                          您确定要删除"{certificate.title}"���？此操作无法撤销。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground"
                          onClick={handleDelete}
                        >
                          删除
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>竞赛评估</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">含金量</span>
                  <div className="flex items-center">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            certificate.value === "高"
                              ? "text-amber-500"
                              : certificate.value === "中" && i < 2
                                ? "text-amber-500"
                                : "text-gray-300"
                          }`}
                          fill={
                            certificate.value === "高"
                              ? "currentColor"
                              : certificate.value === "中" && i < 2
                                ? "currentColor"
                                : "none"
                          }
                        />
                      ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">认可度</span>
                  <Badge variant="outline">{certificate.recognitionLevel}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">竞赛级别</span>
                  <Badge variant="secondary">国家级</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>颁发机构</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={certificate.issuerLogo || "/placeholder.svg"} alt={certificate.issuer} />
                  <AvatarFallback>{certificate.issuer.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{certificate.issuer}</p>
                  <p className="text-sm text-muted-foreground">官方认证机构</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {certificate.issuer}
                是由教育部高等教育司主办的全国性大学生科技竞赛组织机构，负责组织和管理全国范围内的相关竞赛活动。
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a
                  href={certificate.issuerWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1"
                >
                  访问官方网站
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>相关证书</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {certificates
                .filter((cert) => cert.id !== certificate.id)
                .slice(0, 2)
                .map((cert, index) => (
                  <Link key={index} href={`/certificates/${cert.id}`}>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                      <div className="h-12 w-12 overflow-hidden rounded bg-muted">
                        <img
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{cert.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {cert.issueDate} • {cert.recognitionLevel}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/certificates">查看全部证书</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
