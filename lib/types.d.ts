import 'next-auth';
import { Role, UserStatus } from '@prisma/client';

declare module 'next-auth' {
  /**
   * 扩展 User 类型以包含数据库中的自定义字段
   */
  interface User {
    id: string;
    role?: Role;
    status?: UserStatus;
  }

  /**
   * 扩展 Session 类型以在 session.user 中包含自定义字段
   */
  interface Session {
    user: User & {
      id: string;
      role?: Role;
      status?: UserStatus;
    };
  }
}

declare module 'next-auth/jwt' {
  /**
   * 扩展 JWT 类型以包含自定义字段
   */
  interface JWT {
    id: string;
    role?: Role;
    status?: UserStatus;
  }
} 