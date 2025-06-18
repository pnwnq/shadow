"use client";

import { useState, useEffect, useTransition } from "react";
import {
      AlertTriangle,
      ArrowUpDown,
      Calendar,
      Download,
      Filter,
      Info,
      Search,
      XCircle,
} from "lucide-react";
import { useDebounce } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
      Pagination,
      PaginationContent,
      PaginationItem,
      PaginationLink,
      PaginationNext,
      PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface Log {
      id: string;
      timestamp: string;
      type: string | null;
      level: string | null;
      user: string;
      action: string;
      details: string;
      ip: string | null;
}

const LogsTable = () => {
      const [logs, setLogs] = useState<Log[]>([]);
      const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
      const [searchQuery, setSearchQuery] = useState("");
      const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
      const [activeTab, setActiveTab] = useState("all");
      const [logLevel, setLogLevel] = useState("all");
      const [sortBy, setSortBy] = useState("timestamp");
      const [sortOrder, setSortOrder] = useState("desc");
      const [isPending, startTransition] = useTransition();

      const fetchLogs = () => {
            startTransition(async () => {
                  const params = new URLSearchParams({
                        page: pagination.page.toString(),
                        limit: pagination.limit.toString(),
                        search: debouncedSearchQuery,
                        sortBy,
                        sortOrder,
                  });
                  if (activeTab !== "all") params.append("type", activeTab);
                  if (logLevel !== "all") params.append("level", logLevel);

                  try {
                        const response = await fetch(`/api/admin/logs?${params.toString()}`);
                        if (!response.ok) throw new Error("Failed to fetch logs");
                        const data = await response.json();
                        setLogs(data.data);
                        setPagination(data.pagination);
                  } catch (error) {
                        console.error(error);
                        // Here you might want to show a toast notification
                  }
            });
      };

      useEffect(() => {
            fetchLogs();
      }, [pagination.page, pagination.limit, debouncedSearchQuery, activeTab, logLevel, sortBy, sortOrder]);

      const handlePageChange = (newPage: number) => {
            setPagination(prev => ({ ...prev, page: newPage }));
      };

      const handleSort = (column: string) => {
            if (sortBy === column) {
                  setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
            } else {
                  setSortBy(column);
                  setSortOrder('desc');
            }
      };

      const getLevelBadge = (level: string | null) => {
            switch (level) {
                  case "info": return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Info className="mr-1 h-3 w-3" />信息</Badge>;
                  case "warning": return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><AlertTriangle className="mr-1 h-3 w-3" />警告</Badge>;
                  case "error": return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="mr-1 h-3 w-3" />错误</Badge>;
                  case "critical": return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 font-bold"><XCircle className="mr-1 h-3 w-3" />严重</Badge>;
                  default: return <Badge variant="outline">未知</Badge>;
            }
      };

      return (
            <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                        <div className="relative w-full max-w-sm">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                    placeholder="搜索用户、操作、IP..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                              />
                        </div>
                        <div className="flex items-center gap-2">
                              <Select value={logLevel} onValueChange={setLogLevel}>
                                    <SelectTrigger className="w-[150px]">
                                          <Filter className="mr-2 h-4 w-4" />
                                          <SelectValue placeholder="日志级别" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectItem value="all">所有级别</SelectItem>
                                          <SelectItem value="info">信息</SelectItem>
                                          <SelectItem value="warning">警告</SelectItem>
                                          <SelectItem value="error">错误</SelectItem>
                                          <SelectItem value="critical">严重</SelectItem>
                                    </SelectContent>
                              </Select>
                              <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    导出日志
                              </Button>
                        </div>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                              <TabsTrigger value="all">所有日志</TabsTrigger>
                              <TabsTrigger value="login">登录日志</TabsTrigger>
                              <TabsTrigger value="action">操作日志</TabsTrigger>
                              <TabsTrigger value="security">安全日志</TabsTrigger>
                              <TabsTrigger value="system">系统日志</TabsTrigger>
                        </TabsList>
                  </Tabs>

                  <div className="rounded-lg border">
                        <Table>
                              <TableHeader>
                                    <TableRow>
                                          <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort('timestamp')}>
                                                时间 <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                                          </TableHead>
                                          <TableHead>级别</TableHead>
                                          <TableHead>用户</TableHead>
                                          <TableHead>操作</TableHead>
                                          <TableHead>详情</TableHead>
                                          <TableHead className="w-[130px]">IP 地址</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {isPending ? (
                                          Array.from({ length: pagination.limit }).map((_, i) => (
                                                <TableRow key={i}>
                                                      <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                                                      <TableCell><Skeleton className="h-6 w-[70px] rounded-full" /></TableCell>
                                                      <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                                      <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                                                      <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                                      <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                                </TableRow>
                                          ))
                                    ) : logs.length > 0 ? (
                                          logs.map((log) => (
                                                <TableRow key={log.id}>
                                                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                                                      <TableCell>{getLevelBadge(log.level)}</TableCell>
                                                      <TableCell>{log.user}</TableCell>
                                                      <TableCell>{log.action}</TableCell>
                                                      <TableCell className="max-w-[400px] truncate">{log.details}</TableCell>
                                                      <TableCell>{log.ip}</TableCell>
                                                </TableRow>
                                          ))
                                    ) : (
                                          <TableRow>
                                                <TableCell colSpan={6} className="h-24 text-center">
                                                      暂无日志记录
                                                </TableCell>
                                          </TableRow>
                                    )}
                              </TableBody>
                        </Table>
                  </div>

                  <Pagination>
                        <PaginationContent>
                              <PaginationItem>
                                    <PaginationPrevious
                                          href="#"
                                          onClick={(e) => { e.preventDefault(); if (pagination.page > 1) handlePageChange(pagination.page - 1); }}
                                          className={pagination.page <= 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                              </PaginationItem>
                              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                                    <PaginationItem key={page}>
                                          <PaginationLink
                                                href="#"
                                                isActive={pagination.page === page}
                                                onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                                          >
                                                {page}
                                          </PaginationLink>
                                    </PaginationItem>
                              ))}
                              <PaginationItem>
                                    <PaginationNext
                                          href="#"
                                          onClick={(e) => { e.preventDefault(); if (pagination.page < pagination.totalPages) handlePageChange(pagination.page + 1); }}
                                          className={pagination.page >= pagination.totalPages ? "pointer-events-none opacity-50" : ""}
                                    />
                              </PaginationItem>
                        </PaginationContent>
                  </Pagination>
            </div>
      );
};

export default LogsTable; 