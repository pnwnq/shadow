'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { signOut } from "next-auth/react";
import { Clock } from "lucide-react";

export default function PendingApprovalPage() {
      return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                  <Card className="w-full max-w-md mx-4">
                        <CardHeader className="text-center">
                              <div className="flex justify-center mb-4">
                                    <Clock className="w-12 h-12 text-yellow-500" />
                              </div>
                              <CardTitle className="text-2xl">审核进行中</CardTitle>
                              <CardDescription>
                                    您的账户已成功创建，正在等待管理员审核。
                              </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                              <p className="text-sm text-muted-foreground mb-6">
                                    审核通过后，您将可以访问系统的所有功能。请耐心等待，或联系管理员以获取更多信息。
                              </p>
                              <Button
                                    onClick={() => signOut({ callbackUrl: '/login' })}
                                    variant="outline"
                                    className="w-full"
                              >
                                    退出登录
                              </Button>
                        </CardContent>
                  </Card>
            </div>
      );
} 