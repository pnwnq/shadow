import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  { id: "tech", name: "技术文件" },
  { id: "study", name: "学习资料" },
  { id: "project", name: "项目文件" },
  { id: "manual", name: "设备手册" },
  { id: "template", name: "文件模板" },
  { id: "other", name: "其他" },
];

async function main() {
  console.log("开始填充分类数据...");
  for (const category of categories) {
    const upsertedCategory = await prisma.category.upsert({
      where: { id: category.id },
      update: { name: category.name },
      create: { id: category.id, name: category.name },
    });
    console.log(`已创建或更新分类: ${upsertedCategory.name}`);
  }
  console.log("分类数据填充完成。");

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