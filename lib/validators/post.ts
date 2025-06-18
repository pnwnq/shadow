import { z } from "zod";
import { CommunityPostType } from "@prisma/client";

export const PostValidator = z.object({
      title: z
            .string()
            .min(3, { message: "标题必须至少包含 3 个字符" })
            .max(128, { message: "标题不能超过 128 个字符" }),
      categoryId: z.string(),
      content: z.any(),
      type: z.nativeEnum(CommunityPostType),
});

export type PostCreationRequest = z.infer<typeof PostValidator>; 