import { z } from "zod";

export const CommentValidator = z.object({
      postId: z.string(),
      content: z.string().min(1, { message: "评论不能为空。" }),
      replyToId: z.string().optional(),
});

export type CommentCreationRequest = z.infer<typeof CommentValidator>; 