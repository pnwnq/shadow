import { z } from "zod";

// Schema for creating an item category
export const createItemCategorySchema = z.object({
      name: z.string().min(1, { message: "分类名称不能为空" }).max(100),
      description: z.string().max(500).optional(),
});

// Schema for updating an item category
export const updateItemCategorySchema = z.object({
      name: z.string().min(1, { message: "分类名称不能为空" }).max(100).optional(),
      description: z.string().max(500).optional(),
});

// Schema for creating an item
export const createItemSchema = z.object({
      name: z.string().min(1, "名称不能为空"),
      model: z.string().optional(),
      serialNumber: z.string().optional(),
      purchaseDate: z.coerce.date().optional(),
      price: z.coerce.number().positive("价格必须为正数").optional(),
      location: z.string().optional(),
      notes: z.string().optional(),
      categoryId: z.string().cuid("无效的分类 ID"),
      ownerId: z.string().cuid("无效的用户 ID").optional(),
});

// Schema for updating an item
export const updateItemSchema = createItemSchema.partial();

// Schema for borrowing/returning an item
export const itemActionSchema = z.object({
      userId: z.string().cuid({ message: "无效的用户 ID" }),
      details: z.record(z.any()).optional(), // For any extra details in the log
}); 