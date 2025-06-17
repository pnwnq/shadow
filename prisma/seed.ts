import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = '2228214645@qq.com';

  console.log(`开始为用户 ${adminEmail} 提升权限...`);

  // 查找用户
  const user = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!user) {
    console.error(`错误：未找到邮箱为 ${adminEmail} 的用户。`);
    return;
  }

  // 更新用户的角色和状态
  const updatedUser = await prisma.user.update({
    where: { email: adminEmail },
    data: {
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  console.log('权限提升成功！');
  console.log('用户信息更新为:');
  console.log(updatedUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 