"use client"
import Link from "next/link"
import Image from "next/image"
import { Rocket, Award, Users, BookOpen, ArrowRight, MapPin, Mail, Phone, Beaker } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"
import { RoleSwitcher } from "@/components/role-switcher"

export default function WelcomePage() {
  const isMobile = useMobile()

  return (
    <div className="flex min-h-screen flex-col">
      {/* 英雄区域 */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                探索机器人技术的<span className="text-primary">未来</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                机器人创新实验室致力于培养创新人才，推动机器人技术发展，打造智能未来。
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">加入我们</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">了解更多</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                <Image src="/placeholder.svg?height=400&width=400" alt="机器人展示" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特色区域 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">我们的特色</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">竞赛成就</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  在RoboMaster、RoboCup等国内外重要赛事中屡获佳绩，培养了一批批优秀的机器人技术人才。
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/achievements">
                    <span>查看成果</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">技术研发</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  专注于机器人感知、控制、规划等核心技术研发，拥有多项发明专利和软件著作权。
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="gap-1" asChild>
                  <Link href="/achievements?tab=projects">
                    <span>研发项目</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">人才培养</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  提供完善的培训体系和实践平台，培养学生的创新能力、工程实践能力和团队协作精神。
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/about#join">
                    <span>加入我们</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* 角色切换器 - 开发测试工具 */}
      <div className="bg-slate-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <Beaker className="h-5 w-5 text-amber-500" />
              <h3 className="text-sm font-medium">开发测试模式</h3>
            </div>
            <div className="text-xs text-muted-foreground">选择用户角色以测试不同权限级别</div>
            <div className="mt-2">
              <RoleSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* 底部区域 */}
      <footer className="mt-auto border-t bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">机器人实验室</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">探索机器人技术的未来，培养创新人才，推动技术发展</p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">快速链接</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link href="/achievements" className="hover:text-primary">
                    成果展示
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    联系方式
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">联系我们</h3>
              <address className="not-italic">
                {/* 联系信息 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">地址</h4>
                      <p className="text-muted-foreground">
                        中国浙江省宁波市江北区风华路201号
                        <br />
                        宁波工程学院 机器人实验室
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">邮箱</h4>
                      <p className="text-muted-foreground">shadow.lab@nbut.edu.cn</p>
                      <p className="text-muted-foreground">robotics.shadow@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">电话</h4>
                      <p className="text-muted-foreground">+86 (0574) 8780-xxxx</p>
                    </div>
                  </div>
                </div>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Shadow 机器人实验室. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
