/**
 *  scripts/trigger.ts
 *
 *  这是一个用于从后端触发Novu测试通知的脚本。
 *  执行 `pnpm novu:trigger` 来运行它。
 *
 *  该脚本会：
 *  1. 从数据库中获取第一个用户作为通知的接收者。
 *  2. 使用Novu SDK向该用户发送一条通知。
 *  3. 这会在您的Novu仪表盘中自动创建一个名为 'test-workflow' 的通知工作流。
 */
import { Novu } from '@novu/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const novu = new Novu(process.env.NOVU_API_KEY!);

async function main() {
      console.log('正在查找第一个用户作为测试接收者...');

      // 1. 获取第一个用户作为订阅者
      const subscriber = await prisma.user.findFirst();

      if (!subscriber || !subscriber.id) {
            console.error('错误：在数据库中找不到任何用户。请先运行 `pnpm db:seed` 来填充测试数据。');
            return;
      }

      console.log(`找到用户: ${subscriber.name} (ID: ${subscriber.id})`);
      console.log('正在触发Novu通知...');

      try {
            // 2. 触发通知 - 使用新的通用工作流
            const result = await novu.trigger('generic-notification', {
                  to: {
                        subscriberId: subscriber.id,
                  },
                  payload: {
                        // 动态传入我们想要在模板中显示的内容
                        content: `欢迎回来, ${subscriber.name}! 这是通过通用工作流发送的一条测试通知。`,
                  },
            });

            console.log('Novu API 响应:', result.data);
            console.log('✅ 通知触发成功！');
            console.log("请登录该用户账号，检查应用的通知铃铛和 /notifications 页面。");

      } catch (error) {
            console.error('触发Novu通知时出错:');
            if (error instanceof Error) {
                  console.error(error.message);
            }
            const anyError = error as any;
            if (anyError.response?.data) {
                  console.error('详细信息:', anyError.response.data);
            }
      }
}

main()
      .catch((e) => {
            console.error(e);
            process.exit(1);
      })
      .finally(async () => {
            await prisma.$disconnect();
      });
