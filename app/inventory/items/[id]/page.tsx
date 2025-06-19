import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { ItemStatus } from "@prisma/client";
import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table";

const getBadgeVariant = (
      status: ItemStatus
): "default" | "secondary" | "destructive" => {
      switch (status) {
            case "IN_STOCK":
                  return "default";
            case "BORROWED":
                  return "secondary";
            case "IN_REPAIR":
                  return "destructive";
            default:
                  return "default";
      }
};

const ItemDetailPage = async ({ params }: { params: { id: string } }) => {
      const item = await db.item.findUnique({
            where: { id: params.id },
            include: {
                  category: true,
                  owner: { select: { name: true } },
                  borrowedBy: { select: { name: true } },
            },
      });

      if (!item) {
            notFound();
      }

      const itemLogs = await db.itemLog.findMany({
            where: { itemId: params.id },
            orderBy: { createdAt: "desc" },
            include: { user: { select: { name: true } } },
      });

      return (
            <div className="flex-1 space-y-4 p-4 md:p-8">
                  <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold tracking-tight">物品详情</h1>
                        <Button asChild>
                              <Link href={`/inventory/items/${item.id}/edit`}>编辑物品</Link>
                        </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                              <Card>
                                    <CardHeader>
                                          <CardTitle className="flex items-center justify-between">
                                                <span>{item.name}</span>
                                                <Badge variant={getBadgeVariant(item.status)}>
                                                      {{
                                                            IN_STOCK: "在库",
                                                            BORROWED: "已借出",
                                                            IN_REPAIR: "维修中",
                                                            DISPOSED: "已处置",
                                                      }[item.status]}
                                                </Badge>
                                          </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                          <div className="grid grid-cols-2 gap-4 text-sm">
                                                <p><span className="font-semibold text-muted-foreground">分类:</span> {item.category.name}</p>
                                                <p><span className="font-semibold text-muted-foreground">型号:</span> {item.model || "N/A"}</p>
                                                <p><span className="font-semibold text-muted-foreground">序列号:</span> {item.serialNumber || "N/A"}</p>
                                                <p><span className="font-semibold text-muted-foreground">位置:</span> {item.location || "N/A"}</p>
                                                <p><span className="font-semibold text-muted-foreground">价格:</span> {item.price ? `¥${item.price.toFixed(2)}` : "N/A"}</p>
                                                <p><span className="font-semibold text-muted-foreground">购入日期:</span> {item.purchaseDate ? format(item.purchaseDate, "yyyy-MM-dd") : "N/A"}</p>
                                                <p><span className="font-semibold text-muted-foreground">负责人:</span> {item.owner?.name || "N/A"}</p>
                                                <p><span className="font-semibold text-muted-foreground">借用人:</span> {item.borrowedBy?.name || "无"}</p>
                                                <p className="col-span-2"><span className="font-semibold text-muted-foreground">NFC ID:</span> {item.nfcTagId || "未绑定"}</p>
                                                <p className="col-span-2"><span className="font-semibold text-muted-foreground">备注:</span> {item.notes || "无"}</p>
                                          </div>
                                    </CardContent>
                              </Card>
                        </div>

                        <div className="md:col-span-3">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>操作历史</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                          <Table>
                                                <TableHeader>
                                                      <TableRow>
                                                            <TableHead>时间</TableHead>
                                                            <TableHead>操作人</TableHead>
                                                            <TableHead>操作类型</TableHead>
                                                      </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                      {itemLogs.map((log) => (
                                                            <TableRow key={log.id}>
                                                                  <TableCell>{format(log.createdAt, "yyyy-MM-dd HH:mm")}</TableCell>
                                                                  <TableCell>{log.user.name}</TableCell>
                                                                  <TableCell>
                                                                        <Badge variant="outline">{log.action}</Badge>
                                                                  </TableCell>
                                                            </TableRow>
                                                      ))}
                                                      {itemLogs.length === 0 && (
                                                            <TableRow>
                                                                  <TableCell colSpan={3} className="text-center">
                                                                        暂无操作历史
                                                                  </TableCell>
                                                            </TableRow>
                                                      )}
                                                </TableBody>
                                          </Table>
                                    </CardContent>
                              </Card>
                        </div>
                  </div>
            </div>
      );
};

export default ItemDetailPage; 