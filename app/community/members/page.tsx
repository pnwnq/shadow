"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, Filter, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MemberCard } from "@/components/member-card"

// 模拟数据
const members = [
  {
    id: "zhangsan",
    name: "张三",
    avatar: "ZS",
    role: "管理员",
    online: true,
    major: "电子工程",
    grade: "2020级",
    tags: ["Arduino", "PCB设计"],
  },
  {
    id: "lisi",
    name: "李四",
    avatar: "LS",
    role: "项目负责人",
    online: true,
    major: "通信工程",
    grade: "2021级",
    tags: ["树莓派", "Python"],
  },
  {
    id: "wangwu",
    name: "王五",
    avatar: "WW",
    role: "普通成员",
    online: false,
    major: "计算机科学",
    grade: "2022级",
    tags: ["传感器", "物联网"],
  },
  {
    id: "zhaoliu",
    name: "赵六",
    avatar: "ZL",
    role: "普通成员",
    online: false,
    major: "自动化",
    grade: "2021级",
    tags: ["单片机", "机器人"],
  },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMembers, setFilteredMembers] = useState(members)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (!term.trim()) {
      setFilteredMembers(members)
      return
    }

    const filtered = members.filter(
      (member) =>
        member.name.toLowerCase().includes(term.toLowerCase()) ||
        member.major.toLowerCase().includes(term.toLowerCase()) ||
        member.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase())),
    )
    setFilteredMembers(filtered)
  }

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">成员列表</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索成员..."
              className="w-64 rounded-lg pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              筛选
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>角色</DropdownMenuLabel>
            <DropdownMenuItem>管理员</DropdownMenuItem>
            <DropdownMenuItem>项目负责人</DropdownMenuItem>
            <DropdownMenuItem>普通成员</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>状态</DropdownMenuLabel>
            <DropdownMenuItem>在线</DropdownMenuItem>
            <DropdownMenuItem>离线</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <SlidersHorizontal className="h-4 w-4" />
              排序
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>姓名 (A-Z)</DropdownMenuItem>
            <DropdownMenuItem>姓名 (Z-A)</DropdownMenuItem>
            <DropdownMenuItem>加入时间 (最新)</DropdownMenuItem>
            <DropdownMenuItem>加入时间 (最早)</DropdownMenuItem>
            <DropdownMenuItem>活跃度 (高到低)</DropdownMenuItem>
            <DropdownMenuItem>活跃度 (低到高)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => <MemberCard key={member.id} member={member} />)
        ) : (
          <div className="col-span-full flex h-40 items-center justify-center rounded-lg border p-8 text-center">
            <p className="text-muted-foreground">没有找到匹配的成员</p>
          </div>
        )}
      </div>
    </main>
  )
}
