"use client";

import type { Metadata } from "next"
import Link from "next/link"
import {
  ChevronDown,
  Filter,
  Package,
  Plus,
  SlidersHorizontal,
  Smartphone,
  Scan,
  History,
  User,
  Users,
  ScanLine,
  RotateCcw,
  Search
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useEffect, useState, useMemo, useCallback } from "react"
import { Item, ItemCategory, ItemStatus } from "@prisma/client"
import { toast } from "sonner"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';

// Metadata is now static as this is a client component
// export const metadata: Metadata = {
//   title: "物品管理 | Shadow 实验室管理系统",
//   description: "Shadow 实验室管理系统物品管理页面",
// }

type ItemWithDetails = Item & {
  category: ItemCategory;
  owner: { id: string; name: string | null; image: string | null } | null;
  borrowedBy: { id: string; name: string | null; image: string | null } | null;
};

interface ApiResponse {
  data: ItemWithDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

type BorrowedItem = Item & {
  category: ItemCategory;
  borrowedAt: string | null;
};

export default function InventoryPage() {
  const [items, setItems] = useState<ItemWithDetails[]>([]);
  const [categories, setCategories] = useState<ItemCategory[]>([]);
  const [stats, setStats] = useState({ inStock: 0, borrowed: 0, inRepair: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>([]);
  const [isBorrowListLoading, setIsBorrowListLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("admin");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentStatus = searchParams.get('status') as ItemStatus | null;
  const currentCategory = searchParams.get('categoryId');
  const currentSearch = searchParams.get('name');

  const createQueryString = useCallback(
    (paramsToUpdate: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = useDebouncedCallback((term: string) => {
    router.push(pathname + '?' + createQueryString({ name: term || null }))
  }, 300);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    const query = new URLSearchParams(searchParams.toString()).toString();
    try {
      const res = await fetch(`/api/items?${query}`);
      const data: ApiResponse = await res.json();
      setItems(data.data);
    } catch (error) {
      toast.error("加载物品列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const fetchSidebarData = useCallback(async () => {
    try {
      const [categoriesRes, statsRes] = await Promise.all([
        fetch("/api/item-categories"),
        fetch('/api/items/stats')
      ]);
      const categoriesData = await categoriesRes.json();
      const statsData = await statsRes.json();
      setCategories(categoriesData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch sidebar data:", error);
    }
  }, []);

  useEffect(() => {
    fetchSidebarData();
  }, [fetchSidebarData]);

  const fetchBorrowedItems = async () => {
    setIsBorrowListLoading(true);
    try {
      // Using the same hardcoded user logic for now
      const userRes = await fetch(`/api/users/by-email/admin@example.com`);
      if (!userRes.ok) throw new Error("Failed to find user");
      const adminUser = await userRes.json();

      const res = await fetch(`/api/users/${adminUser.id}/borrowed-items`);
      const data = await res.json();
      setBorrowedItems(data);
    } catch (error) {
      console.error("Failed to fetch borrowed items:", error);
      toast.error("加载借用物品失败");
    } finally {
      setIsBorrowListLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'personal') {
      fetchBorrowedItems();
    }
  }, [activeTab]);

  const handleReturn = async (itemId: string) => {
    try {
      // Using the same hardcoded user logic for now
      const userRes = await fetch(`/api/users/by-email/admin@example.com`);
      if (!userRes.ok) throw new Error("Failed to find user");
      const adminUser = await userRes.json();

      const res = await fetch(`/api/items/${itemId}/return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: adminUser.id })
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      toast.success("物品归还成功");
      // Refresh the list
      fetchBorrowedItems();
    } catch (error: any) {
      toast.error(`归还失败: ${error.message}`);
    }
  };

  const getBadgeVariant = (status: ItemStatus): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'IN_STOCK':
        return 'default';
      case 'BORROWED':
        return 'secondary';
      case 'IN_REPAIR':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">物品管理</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/inventory/scan-nfc">
              <Smartphone className="h-4 w-4 mr-2" />
              NFC扫描
            </Link>
          </Button>
          <Button className="gap-1" asChild>
            <Link href="/inventory/items/new">
              <Plus className="h-4 w-4" />
              添加物品
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="admin" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="admin" className="flex-1">
            <Users className="h-4 w-4 mr-2" />
            实验室物品管理
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex-1">
            <User className="h-4 w-4 mr-2" />
            我的物品借用
          </TabsTrigger>
        </TabsList>

        <TabsContent value="admin" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">物品状态概览</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-2xl font-bold text-blue-600">{isLoading ? '...' : stats.total}</span>
                <span className="text-sm text-muted-foreground">总物品数</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg border border-green-100">
                <span className="text-2xl font-bold text-green-600">{isLoading ? '...' : stats.inStock}</span>
                <span className="text-sm text-muted-foreground">在库物品</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-lg border border-amber-100">
                <span className="text-2xl font-bold text-amber-600">{isLoading ? '...' : stats.borrowed}</span>
                <span className="text-sm text-muted-foreground">借出物品</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg border border-red-100">
                <span className="text-2xl font-bold text-red-600">{isLoading ? '...' : stats.inRepair}</span>
                <span className="text-sm text-muted-foreground">维修中</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="md:w-1/4 lg:w-1/5 space-y-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle>筛选与分类</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">状态</h4>
                      <div className="space-y-1">
                        <Button variant={!currentStatus ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => router.push(pathname + '?' + createQueryString({ status: null, categoryId: null }))}>全部</Button>
                        <Button variant={currentStatus === 'IN_STOCK' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => router.push(pathname + '?' + createQueryString({ status: 'IN_STOCK' }))}>在库</Button>
                        <Button variant={currentStatus === 'BORROWED' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => router.push(pathname + '?' + createQueryString({ status: 'BORROWED' }))}>已借出</Button>
                        <Button variant={currentStatus === 'IN_REPAIR' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => router.push(pathname + '?' + createQueryString({ status: 'IN_REPAIR' }))}>维修中</Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">物品分类</h4>
                      <div className="space-y-1">
                        {categories.map(category => (
                          <Button key={category.id} variant={currentCategory === category.id ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => router.push(pathname + '?' + createQueryString({ categoryId: category.id, status: null }))}>
                            {category.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex-1 space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="按名称搜索物品..."
                  className="w-full rounded-lg bg-background pl-8"
                  onChange={(e) => handleSearch(e.target.value)}
                  defaultValue={searchParams.get('name') || ''}
                />
              </div>

              {isLoading ? (
                <div className="text-center p-8">正在加载物品...</div>
              ) : items.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="truncate">{item.name}</span>
                          <Badge variant={getBadgeVariant(item.status)}>
                            {item.status === 'IN_STOCK' ? '在库' : item.status === 'BORROWED' ? '已借出' : '维修中'}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.category.name}</p>
                        <p className="text-sm text-muted-foreground">位置: {item.location || 'N/A'}</p>
                        {item.borrowedBy && (
                          <p className="text-sm text-muted-foreground">借用人: {item.borrowedBy.name}</p>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" asChild size="sm">
                          <Link href={`/inventory/items/${item.id}`}>查看详情</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  没有找到符合条件的物品。
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>我借用的物品</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isBorrowListLoading ? (
                <p>正在加载...</p>
              ) : borrowedItems.length === 0 ? (
                <p>您当前没有借用任何物品。</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {borrowedItems.map((item) => (
                    <li key={item.id} className="py-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.category.name} - 借于 {item.borrowedAt ? new Date(item.borrowedAt).toLocaleDateString() : '未知日期'}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleReturn(item.id)}>
                        归还
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
