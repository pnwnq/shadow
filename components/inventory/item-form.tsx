"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import {
      Popover,
      PopoverContent,
      PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Item, ItemCategory } from "@prisma/client";
import { createItemSchema, updateItemSchema } from "@/schemas/item";
import { toast } from "sonner";
import { useEffect } from "react";

interface ItemFormProps {
      initialData?: Item | null;
      categories: ItemCategory[];
}

type ItemFormValues = z.infer<typeof createItemSchema>;

export function ItemForm({ initialData, categories }: ItemFormProps) {
      const router = useRouter();
      const formSchema = initialData ? updateItemSchema : createItemSchema;

      const form = useForm<ItemFormValues>({
            resolver: zodResolver(formSchema),
            defaultValues: initialData || {
                  name: "",
                  model: "",
                  serialNumber: "",
                  purchaseDate: undefined,
                  price: undefined,
                  location: "",
                  notes: "",
                  categoryId: "",
            },
      });

      useEffect(() => {
            if (initialData) {
                  form.reset({
                        ...initialData,
                        name: initialData.name ?? '',
                        model: initialData.model ?? '',
                        serialNumber: initialData.serialNumber ?? '',
                        location: initialData.location ?? '',
                        notes: initialData.notes ?? '',
                        price: initialData.price ?? undefined,
                        purchaseDate: initialData.purchaseDate ? new Date(initialData.purchaseDate) : undefined,
                  });
            }
      }, [initialData, form]);

      const isLoading = form.formState.isSubmitting;

      const onSubmit = async (values: ItemFormValues) => {
            try {
                  if (initialData) {
                        await fetch(`/api/items/${initialData.id}`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(values),
                        });
                        toast.success("物品更新成功");
                  } else {
                        await fetch("/api/items", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(values),
                        });
                        toast.success("物品添加成功");
                  }
                  router.push("/inventory");
                  router.refresh();
            } catch (error) {
                  toast.error("操作失败，请重试");
                  console.error(error);
            }
      };

      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>物品名称 *</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="例如：树莓派 4B" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>物品分类 *</FormLabel>
                                                <Select
                                                      onValueChange={field.onChange}
                                                      defaultValue={field.value}
                                                >
                                                      <FormControl>
                                                            <SelectTrigger>
                                                                  <SelectValue placeholder="选择一个分类" />
                                                            </SelectTrigger>
                                                      </FormControl>
                                                      <SelectContent>
                                                            {categories.map((category) => (
                                                                  <SelectItem key={category.id} value={category.id}>
                                                                        {category.name}
                                                                  </SelectItem>
                                                            ))}
                                                      </SelectContent>
                                                </Select>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="model"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>型号</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="例如：4GB RAM" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="serialNumber"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>序列号</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="例如：RASPI-4B-UNIQUE-SN" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>价格 (元)</FormLabel>
                                                <FormControl>
                                                      <Input type="number" placeholder="例如：350.00" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>存放位置</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="例如：A-01-C 储物柜" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="purchaseDate"
                                    render={({ field }) => (
                                          <FormItem className="flex flex-col">
                                                <FormLabel>购入日期</FormLabel>
                                                <Popover>
                                                      <PopoverTrigger asChild>
                                                            <FormControl>
                                                                  <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                              "w-full pl-3 text-left font-normal",
                                                                              !field.value && "text-muted-foreground"
                                                                        )}
                                                                  >
                                                                        {field.value ? (
                                                                              format(field.value, "PPP")
                                                                        ) : (
                                                                              <span>选择一个日期</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                  </Button>
                                                            </FormControl>
                                                      </PopoverTrigger>
                                                      <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                  mode="single"
                                                                  selected={field.value}
                                                                  onSelect={field.onChange}
                                                                  initialFocus
                                                            />
                                                      </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                          <FormItem className="md:col-span-2">
                                                <FormLabel>备注</FormLabel>
                                                <FormControl>
                                                      <Textarea
                                                            placeholder="例如：已预装 Raspberry Pi OS, 包含 32GB SD 卡。"
                                                            className="resize-none"
                                                            {...field}
                                                      />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                              {isLoading ? "保存中..." : initialData ? "保存更改" : "创建物品"}
                        </Button>
                  </form>
            </Form>
      );
} 