import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
      const email = '2228214645@qq.com';
      const newPassword = 'password123';

      console.log(`正在为用户 ${email} 重置密码...`);

      const user = await prisma.user.findUnique({
            where: { email },
      });

      if (!user) {
            console.error(`错误：未找到用户 ${email}`);
            return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
      });

      console.log(`✅ 成功！用户 ${email} 的密码已被重置为: ${newPassword}`);
}

main()
      .catch((e) => {
            console.error(e);
            process.exit(1);
      })
      .finally(async () => {
            await prisma.$disconnect();
      }); 