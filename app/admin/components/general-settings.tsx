"use client";

import { useState, useEffect, useTransition } from "react";
import {
      Clock,
      Database,
      HardDrive,
      Mail,
      Save,
      Server,
      Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

const initialSettings = {
      general_system_name: "Shadow实验室管理系统",
      general_system_description: "宁波工程学院机器人实验室综合管理系统",
      general_admin_email: "admin@example.com",
      general_timezone: "Asia/Shanghai",
      general_date_format: "yyyy-MM-dd",
      mail_driver: "smtp",
      mail_host: "smtp.example.com",
      mail_port: "587",
      mail_encryption: "tls",
      mail_username: "noreply@example.com",
      mail_password: "",
      storage_driver: "local",
      storage_max_upload_size: "10", // in MB
      maintenance_mode_enabled: "false",
};

export function GeneralSettings() {
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
                        toast({ title: "系统设置已成功保存" });
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
                  <Tabs defaultValue="general" className="space-y-4">
                        <TabsList className="grid grid-cols-2 md:grid-cols-5">
                              <TabsTrigger value="general"><Settings className="mr-2 h-4 w-4" />基本设置</TabsTrigger>
                              <TabsTrigger value="storage"><HardDrive className="mr-2 h-4 w-4" />存储设置</TabsTrigger>
                              <TabsTrigger value="backup"><Database className="mr-2 h-4 w-4" />备份恢复</TabsTrigger>
                              <TabsTrigger value="maintenance"><Server className="mr-2 h-4 w-4" />系统维护</TabsTrigger>
                        </TabsList>

                        <TabsContent value="general">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>基本设置</CardTitle>
                                          <CardDescription>配置系统的基本信息和默认值</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                          <div className="space-y-2">
                                                <Label htmlFor="sys-name">系统名称</Label>
                                                <Input id="sys-name" value={settings.general_system_name} onChange={(e) => handleSettingChange("general_system_name", e.target.value)} />
                                          </div>
                                          <div className="space-y-2">
                                                <Label htmlFor="sys-desc">系统描述</Label>
                                                <Textarea id="sys-desc" value={settings.general_system_description} onChange={(e) => handleSettingChange("general_system_description", e.target.value)} />
                                          </div>
                                    </CardContent>
                              </Card>
                        </TabsContent>

                        <TabsContent value="storage">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>存储设置</CardTitle>
                                          <CardDescription>管理文件上传和存储驱动</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                          <div className="space-y-2">
                                                <Label>存储驱动</Label>
                                                <Select value={settings.storage_driver} onValueChange={(v) => handleSettingChange("storage_driver", v)}>
                                                      <SelectTrigger><SelectValue /></SelectTrigger>
                                                      <SelectContent>
                                                            <SelectItem value="local">本地存储</SelectItem>
                                                            <SelectItem value="s3">Amazon S3</SelectItem>
                                                            <SelectItem value="oss">阿里云 OSS</SelectItem>
                                                      </SelectContent>
                                                </Select>
                                          </div>
                                          <div className="space-y-2">
                                                <Label>最大文件上传大小（MB）</Label>
                                                <Input type="number" value={settings.storage_max_upload_size} onChange={(e) => handleSettingChange("storage_max_upload_size", e.target.value)} />
                                          </div>
                                    </CardContent>
                              </Card>
                        </TabsContent>

                        <TabsContent value="backup">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>备份与恢复</CardTitle>
                                          <CardDescription>管理系统数据备份</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                          <Button>立即备份数据库</Button>
                                    </CardContent>
                              </Card>
                        </TabsContent>

                        <TabsContent value="maintenance">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>系统维护</CardTitle>
                                          <CardDescription>管理系统维护模式</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex items-center space-x-2">
                                          <Switch id="maintenance-mode" checked={settings.maintenance_mode_enabled === "true"} onCheckedChange={(c) => handleSettingChange("maintenance_mode_enabled", c)} />
                                          <Label htmlFor="maintenance-mode">启用维护模式</Label>
                                    </CardContent>
                              </Card>
                        </TabsContent>
                  </Tabs>
            </div>
      );
} 