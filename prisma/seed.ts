import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Clean up existing data
  await prisma.user.deleteMany({});
  await prisma.communityCategory.deleteMany({});
  // Add other model cleanups if necessary, e.g., await prisma.account.deleteMany({});

  console.log("Old data cleaned up.");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Create Super Admin
  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });
  console.log("Created Super Admin (admin@example.com)");

  // 2. Create Pending User
  await prisma.user.create({
    data: {
      name: "Pending User",
      email: "pending@example.com",
      password: hashedPassword,
      role: Role.MEMBER,
      status: UserStatus.PENDING,
      emailVerified: new Date(),
    },
  });
  console.log("Created Pending User (pending@example.com)");

  // 3. Create Normal Member
  await prisma.user.create({
    data: {
      name: "Normal Member",
      email: "user@example.com",
      password: hashedPassword,
      role: Role.MEMBER,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });
  console.log("Created Normal Member (user@example.com)");

  // 4. Create Community Categories
  await prisma.communityCategory.createMany({
    data: [
      { name: '技术问答', description: '关于编程、硬件、软件等技术问题的讨论区。' },
      { name: '资源分享', description: '分享有用的文章、工具、数据集、学习资源等。' },
      { name: '项目展示', description: '展示你的个人项目、课程设计、竞赛作品等。' },
      { name: '日常吹水', description: '轻松愉快地聊聊学习、生活、兴趣爱好。' },
    ],
  });
  console.log("Created community categories.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 