"use client";

import { useState, useEffect, useTransition } from "react";
import { Globe, Key, Save, Shield, Smartphone, User, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

const initialSettings = {
      password_min_length: "12",
      password_require_uppercase: "true",
      password_require_lowercase: "true",
      password_require_numbers: "true",
      password_require_special: "true",
      password_history_enabled: "true",
      password_history_count: "3",
      password_expiry_enabled: "true",
      password_expiry_days: "90",
      login_max_attempts: "5",
      login_lockout_duration: "15",
      session_timeout: "30",
      two_fa_enabled: "false",
      access_ip_allow_list: "0.0.0.0/0",
};

export function SecuritySettings() {
      const { toast } = useToast();
      const [settings, setSettings] = useState(initialSettings);
      const [isLoading, setIsLoading] = useState(true);
      const [isSaving, startTransition] = useTransition();

      useEffect(() => {
            const fetchSettings = async () => {
                  setIsLoading(true);
                  try {
                        const response = await fetch("/api/admin/settings");
                        if (!response.ok) throw new Error("Failed to fetch settings");
                        const data = await response.json();
                        if (Object.keys(data).length > 0) {
                              setSettings(prev => ({ ...prev, ...data }));
                        }
                  } catch (error) {
                        console.error(error);
                        toast({ title: "加载设置失败", variant: "destructive" });
                  } finally {
                        setIsLoading(false);
                  }
            };
            fetchSettings();
      }, [toast]);

      const handleSettingChange = (key: keyof typeof initialSettings, value: string | boolean | number) => {
            setSettings(prev => ({ ...prev, [key]: String(value) }));
      };

      const handleSave = () => {
            startTransition(async () => {
                  try {
                        const response = await fetch("/api/admin/settings", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(settings),
                        });
                        if (!response.ok) throw new Error("Failed to save settings");
                        toast({ title: "安全设置已成功保存" });
                  } catch (error) {
                        console.error(error);
                        toast({ title: "保存设置失败", variant: "destructive" });
                  }
            });
      };

      if (isLoading) {
            return (
                  <div className="space-y-6">
                        <div className="flex items-center justify-between">
                              <Skeleton className="h-10 w-48" />
                              <Skeleton className="h-10 w-32" />
                        </div>
                        <Skeleton className="h-12 w-full" />
                        <Card>
                              <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                              <CardContent className="space-y-6">
                                    <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-8 w-full" /></div>
                                    <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-20 w-full" /></div>
                              </CardContent>
                        </Card>
                  </div>
            );
      }

      return (
            <div className="space-y-6">
                  <div className="flex items-center justify-between">
                        <div />
                        <Button onClick={handleSave} disabled={isSaving}>
                              <Save className="mr-2 h-4 w-4" />
                              {isSaving ? "保存中..." : "保存更改"}
                        </Button>
                  </div>
                  <Tabs defaultValue="password" className="space-y-4">
                        <TabsList className="grid grid-cols-2 md:grid-cols-4">
                              <TabsTrigger value="password"><Key className="mr-2 h-4 w-4" />密码策略</TabsTrigger>
                              <TabsTrigger value="login"><User className="mr-2 h-4 w-4" />登录安全</TabsTrigger>
                              <TabsTrigger value="2fa"><Smartphone className="mr-2 h-4 w-4" />双因素认证</TabsTrigger>
                              <TabsTrigger value="access"><Globe className="mr-2 h-4 w-4" />访问控制</TabsTrigger>
                        </TabsList>
                        <TabsContent value="password">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>密码策略设置</CardTitle>
                                          <CardDescription>设置系统密码的复杂度和安全要求</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                          <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                      <Label>密码最小长度</Label>
                                                      <span className="font-mono text-sm">{settings.password_min_length}</span>
                                                </div>
                                                <Slider
                                                      value={[parseInt(settings.password_min_length, 10)]}
                                                      onValueChange={(v) => handleSettingChange("password_min_length", v[0])}
                                                      min={8} max={20} step={1}
                                                />
                                          </div>
                                          <div className="space-y-2">
                                                <Label>密码复杂度要求</Label>
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                      <div className="flex items-center space-x-2">
                                                            <Switch id="require-uppercase" checked={settings.password_require_uppercase === "true"} onCheckedChange={(c) => handleSettingChange("password_require_uppercase", c)} />
                                                            <Label htmlFor="require-uppercase">必须包含大写字母</Label>
                                                      </div>
                                                      <div className="flex items-center space-x-2">
                                                            <Switch id="require-lowercase" checked={settings.password_require_lowercase === "true"} onCheckedChange={(c) => handleSettingChange("password_require_lowercase", c)} />
                                                            <Label htmlFor="require-lowercase">必须包含小写字母</Label>
                                                      </div>
                                                      <div className="flex items-center space-x-2">
                                                            <Switch id="require-numbers" checked={settings.password_require_numbers === "true"} onCheckedChange={(c) => handleSettingChange("password_require_numbers", c)} />
                                                            <Label htmlFor="require-numbers">必须包含数字</Label>
                                                      </div>
                                                      <div className="flex items-center space-x-2">
                                                            <Switch id="require-special" checked={settings.password_require_special === "true"} onCheckedChange={(c) => handleSettingChange("password_require_special", c)} />
                                                            <Label htmlFor="require-special">必须包含特殊字符</Label>
                                                      </div>
                                                </div>
                                          </div>
                                    </CardContent>
                              </Card>
                        </TabsContent>
                        <TabsContent value="login">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>登录安全设置</CardTitle>
                                          <CardDescription>管理用户登录的安全限制和策略</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                          <div className="space-y-2">
                                                <Label htmlFor="max-attempts">登录尝试失败次数限制</Label>
                                                <Input id="max-attempts" type="number" value={settings.login_max_attempts} onChange={(e) => handleSettingChange("login_max_attempts", e.target.value)} />
                                          </div>
                                          <div className="space-y-2">
                                                <Label htmlFor="lockout-duration">账户锁定时间（分钟）</Label>
                                                <Input id="lockout-duration" type="number" value={settings.login_lockout_duration} onChange={(e) => handleSettingChange("login_lockout_duration", e.target.value)} />
                                          </div>
                                          <div className="space-y-2">
                                                <Label htmlFor="session-timeout">会话超时时间（分钟）</Label>
                                                <Input id="session-timeout" type="number" value={settings.session_timeout} onChange={(e) => handleSettingChange("session_timeout", e.target.value)} />
                                          </div>
                                    </CardContent>
                              </Card>
                        </TabsContent>
                        <TabsContent value="2fa">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>双因素认证 (2FA)</CardTitle>
                                          <CardDescription>为整个系统启用或禁用双因素身份验证</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex items-center space-x-2 pt-4">
                                          <Switch id="2fa-enabled" checked={settings.two_fa_enabled === "true"} onCheckedChange={(c) => handleSettingChange("two_fa_enabled", c)} />
                                          <Label htmlFor="2fa-enabled">为所有用户强制启用双因素认证</Label>
                                    </CardContent>
                              </Card>
                        </TabsContent>
                        <TabsContent value="access">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>访问控制</CardTitle>
                                          <CardDescription>限制可以访问此系统的IP地址</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2 pt-4">
                                          <Label htmlFor="ip-allow-list">IP 地址白名单</Label>
                                          <Textarea id="ip-allow-list" value={settings.access_ip_allow_list} onChange={(e) => handleSettingChange("access_ip_allow_list", e.target.value)} rows={5} />
                                          <p className="text-sm text-muted-foreground">每行一个IP地址或CIDR地址块。使用 `0.0.0.0/0` 允许所有地址。</p>
                                    </CardContent>
                              </Card>
                        </TabsContent>
                  </Tabs>
            </div>
      );
} 