import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Clean up existing data in a specific order to avoid constraint violations
  await prisma.itemLog.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.itemCategory.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.communityCategory.deleteMany({});
  // Add other model cleanups if necessary, e.g., await prisma.account.deleteMany({});

  console.log("Old data cleaned up.");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Create Super Admin
  const superAdmin = await prisma.user.create({
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

  // 5. Create Item Categories
  const electronicsCategory = await prisma.itemCategory.create({
    data: { name: '电子设备', description: '实验室的各类电子模块、开发板、传感器等。' },
  });
  const toolsCategory = await prisma.itemCategory.create({
    data: { name: '工具耗材', description: '各种手动工具、电动工具及日常耗材。' },
  });
  console.log("Created item categories.");

  // 6. Create Sample Items
  await prisma.item.create({
    data: {
      name: '树莓派 4B',
      model: '4GB RAM',
      serialNumber: 'RASPI4B-4GB-001',
      price: 350.0,
      location: 'A-01-C',
      status: 'IN_STOCK',
      notes: '已预装 Raspberry Pi OS, 包含 32GB SD 卡。',
      categoryId: electronicsCategory.id,
      ownerId: superAdmin.id,
    },
  });

  await prisma.item.create({
    data: {
      name: 'ESP32-S3 开发板',
      model: 'N16R8',
      serialNumber: 'ESP32S3-N16R8-005',
      price: 80.0,
      location: 'A-01-D',
      status: 'BORROWED',
      notes: '带有 WiFi 和蓝牙功能。',
      categoryId: electronicsCategory.id,
      ownerId: superAdmin.id,
      borrowedById: superAdmin.id, // Example: borrowed by admin
    },
  });

  await prisma.item.create({
    data: {
      name: '热熔胶枪',
      model: 'XYZ-20W',
      price: 25.0,
      location: 'TOOL-RACK-1',
      status: 'IN_STOCK',
      categoryId: toolsCategory.id,
      ownerId: superAdmin.id,
    },
  });

  await prisma.item.create({
    data: {
      name: 'U盘',
      model: 'SanDisk 64GB',
      serialNumber: 'SANDISK-64-USB-001',
      price: 60.0,
      location: 'A-01-E',
      status: 'IN_STOCK',
      categoryId: electronicsCategory.id,
      ownerId: superAdmin.id,
      nfcTagId: 'U盘',
    },
  });

  console.log("Created sample items.");

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