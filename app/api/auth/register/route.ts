import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, studentId, major } = body;

    // 基本的输入验证
    if (!email || !name || !password) {
      return new NextResponse('缺少邮箱、姓名或密码', { status: 400 });
    }

    // 检查用户是否已存在
    const exist = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exist) {
      return new NextResponse('该邮箱已被注册', { status: 409 });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        studentId,
        major,
      },
    });

    // 返回新创建的用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    console.error("【注册API错误】", error);
    return new NextResponse('服务器内部错误', { status: 500 });
  }
} 