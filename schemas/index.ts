import * as z from 'zod';

export const LoginSchema = z.object({
      email: z.string().email({
            message: '请输入有效的邮箱地址',
      }),
      password: z.string().min(1, {
            message: '密码不能为空',
      }),
}); 