'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Github,
  Linkedin,
  Twitter,
  LinkIcon,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { User } from '@prisma/client';

// 扩展 User 类型以包含可能的关联数据
type UserProfile = User & {
  // 这里可以定义未来会用到的关联数据类型
  // skills: Skill[], education: Education[], etc.
};

interface ProfileClientProps {
  user: UserProfile;
}

export function ProfileClient({ user }: ProfileClientProps) {
  // 在客户端组件中，我们可以安全地使用 mockData 或 props
  // 来处理尚未在数据库中定义的字段
    const mockData: {
    skills: { name: string; level: number }[];
    education: any[];
    projects: any[];
    certificates: any[];
    competitions: any[];
    publications: any[];
    socialLinks: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
    settings: any;
    department: string;
    bio: string;
  } = {
    skills: [],
    education: [],
    projects: [],
    certificates: [],
    competitions: [],
    publications: [],
    socialLinks: {},
    settings: {
      emailNotifications: true,
      projectUpdates: true,
      teamMessages: true,
      competitionAlerts: true,
    },
    department: '暂无部门',
    bio: user.bio || '这位用户很神秘，什么都还没留下...', // 假设 user 对象未来会有 bio 字段
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">个人资料</h1>
          <p className="text-muted-foreground">
            查看和管理您的个人信息、项目经历和技能认证
          </p>
        </div>
        <div className="flex gap-2">
          <Button>编辑资料</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
           <CardHeader className="relative">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name || '用户头像'} />
                  <AvatarFallback>{user.name?.slice(0, 2) || 'U'}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{user.name || '未命名'}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Badge variant="outline">{user.role || '无角色'}</Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">联系方式</div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email || '未填写'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{'未填写'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{'未填写'}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium">基本信息</div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{mockData.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>加入时间：{format(user.createdAt, 'yyyy-MM-dd')}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium">社交链接</div>
              <div className="grid gap-2">
                 <div className="flex items-center gap-2 text-sm">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <a href={mockData.socialLinks.github || '#'} target="_blank" rel="noopener noreferrer" className={!mockData.socialLinks.github ? "text-muted-foreground pointer-events-none" : "hover:underline"}>
                    {'未填写'}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                   <a href={mockData.socialLinks.linkedin || '#'} target="_blank" rel="noopener noreferrer" className={!mockData.socialLinks.linkedin ? "text-muted-foreground pointer-events-none" : "hover:underline"}>
                    {'未填写'}
                  </a>
                </div>
                 <div className="flex items-center gap-2 text-sm">
                  <Twitter className="h-4 w-4 text-muted-foreground" />
                   <a href={mockData.socialLinks.twitter || '#'} target="_blank" rel="noopener noreferrer" className={!mockData.socialLinks.twitter ? "text-muted-foreground pointer-events-none" : "hover:underline"}>
                    {'未填写'}
                  </a>
                </div>
                 <div className="flex items-center gap-2 text-sm">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                   <a href={mockData.socialLinks.website || '#'} target="_blank" rel="noopener noreferrer" className={!mockData.socialLinks.website ? "text-muted-foreground pointer-events-none" : "hover:underline"}>
                    {'未填写'}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="bio">
             <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bio">个人简介</TabsTrigger>
              <TabsTrigger value="skills">专业技能</TabsTrigger>
              <TabsTrigger value="activity">项目与动态</TabsTrigger>
            </TabsList>
            <TabsContent value="bio">
              <Card>
                <CardHeader>
                  <CardTitle>个人简介</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {mockData.bio}
                  </p>
                </CardContent>
              </Card>
              <Card className="mt-6">
                 <CardHeader>
                  <CardTitle>教育背景</CardTitle>
                </CardHeader>
                <CardContent>
                  {mockData.education.length > 0 ? (
                    <ul className="space-y-4">
                      {mockData.education.map((edu, i) => (
                        <li key={i}>...</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">暂无教育背景信息。</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>专业技能</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {mockData.skills.length > 0 ? (
                    mockData.skills.map((skill, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} />
                      </div>
                    ))
                  ) : (
                     <p className="text-sm text-muted-foreground">暂未添加任何技能。</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity">
                <Card>
                    <CardHeader>
                        <CardTitle>参与的项目</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockData.projects.length > 0 ? (
                            <div className="space-y-4">...</div>
                        ) : (
                            <p className="text-sm text-muted-foreground">暂未参与任何项目。</p>
                        )}
                    </CardContent>
                </Card>
                 <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>获得的证书</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockData.certificates.length > 0 ? (
                            <div className="space-y-4">...</div>
                        ) : (
                            <p className="text-sm text-muted-foreground">暂未获得任何证书。</p>
                        )}
                    </CardContent>
                </Card>
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>竞赛成就</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockData.competitions.length > 0 ? (
                            <div className="space-y-4">...</div>
                        ) : (
                            <p className="text-sm text-muted-foreground">暂无竞赛成就。</p>
                        )}
                    </CardContent>
                </Card>
                 <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>发表的论文</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockData.publications.length > 0 ? (
                            <div className="space-y-4">...</div>
                        ) : (
                            <p className="text-sm text-muted-foreground">暂未发表任何论文。</p>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 