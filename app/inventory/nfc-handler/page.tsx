"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Item, ItemCategory } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
// import { useSession } from "next-auth/react";

type ItemWithDetails = Item & {
      category: ItemCategory;
      borrowedBy: { id: string; name: string | null; } | null;
};

export default function NfcHandlerPage() {
      const searchParams = useSearchParams();
      const tagId = searchParams.get("tagId");
      // const { data: session } = useSession();

      const [item, setItem] = useState<ItemWithDetails | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [isProcessing, setIsProcessing] = useState(false);

      useEffect(() => {
            if (tagId) {
                  const fetchItem = async () => {
                        try {
                              const res = await fetch(`/api/nfc/${tagId}`);
                              if (!res.ok) {
                                    throw new Error(await res.text());
                              }
                              const data = await res.json();
                              setItem(data);
                        } catch (err: any) {
                              setError(err.message || "无法找到该物品");
                        } finally {
                              setLoading(false);
                        }
                  };
                  fetchItem();
            } else {
                  setError("无效的 NFC 标签");
                  setLoading(false);
            }
      }, [tagId]);

      const handleAction = async (action: "borrow" | "return") => {
            // Hardcode admin email for testing
            const adminEmail = "admin@example.com";

            setIsProcessing(true);
            try {
                  // Fetch admin user ID
                  const userRes = await fetch(`/api/users/by-email/${encodeURIComponent(adminEmail)}`);
                  if (!userRes.ok) {
                        throw new Error("找不到用于测试的管理员用户。");
                  }
                  const adminUser = await userRes.json();
                  const userId = adminUser.id;

                  if (!item || !userId) {
                        toast.error("无效的操作或测试用户不存在");
                        setIsProcessing(false);
                        return;
                  }

                  const res = await fetch(`/api/items/${item.id}/${action}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: userId }),
                  });

                  if (!res.ok) {
                        throw new Error(await res.text());
                  }
                  toast.success(`物品 ${action === 'borrow' ? '借用' : '归还'} 成功!`);
                  // Refresh item state
                  const updatedRes = await fetch(`/api/nfc/${tagId}`);
                  const updatedData = await updatedRes.json();
                  setItem(updatedData);

            } catch (err: any) {
                  toast.error(err.message || "操作失败");
            } finally {
                  setIsProcessing(false);
            }
      };


      const renderContent = () => {
            if (loading) {
                  return (
                        <div className="flex flex-col items-center justify-center gap-4">
                              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                              <p className="text-muted-foreground">正在读取 NFC 标签...</p>
                        </div>
                  );
            }

            if (error) {
                  return <p className="text-destructive text-center">{error}</p>;
            }

            if (item) {
                  return (
                        <>
                              <CardHeader>
                                    <CardTitle className="text-center">{item.name}</CardTitle>
                              </CardHeader>
                              <CardContent className="flex flex-col gap-4">
                                    <p className="text-center text-muted-foreground">
                                          分类: {item.category.name}
                                    </p>
                                    {item.status === 'IN_STOCK' && (
                                          <Button onClick={() => handleAction('borrow')} disabled={isProcessing} size="lg" className="w-full">
                                                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                确认借用
                                          </Button>
                                    )}
                                    {item.status === 'BORROWED' && (
                                          <>
                                                <p className="text-center">当前借用人: {item.borrowedBy?.name || '未知'}</p>
                                                <Button onClick={() => handleAction('return')} disabled={isProcessing} size="lg" className="w-full">
                                                      {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                      确认归还
                                                </Button>
                                          </>
                                    )}
                              </CardContent>
                        </>
                  );
            }

            return null;
      };

      return (
            <div className="flex items-center justify-center min-h-screen bg-muted/40">
                  <Card className="w-full max-w-sm">
                        {renderContent()}
                  </Card>
            </div>
      );
} 