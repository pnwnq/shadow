import { novu } from '@/lib/novu';

/**
 * 封装所有与发送通知相关的服务
 */
export class NotificationService {
      /**
       * 发送一条通用的站内通知
       * @param recipientUserId 接收者的用户ID (必须与我们系统中的User.id一致)
       * @param content 通知的具体内容 (支持纯文本)
       */
      public static async sendInAppNotification(
            recipientUserId: string,
            content: string,
      ) {
            try {
                  await novu.trigger('generic-notification', {
                        to: {
                              subscriberId: recipientUserId,
                        },
                        payload: {
                              content: content,
                        },
                  });
                  console.log(`Successfully triggered notification for user: ${recipientUserId}`);
            } catch (error) {
                  console.error(`Error sending notification to user ${recipientUserId}:`, error);
                  // 在生产环境中，这里应该有更健壮的错误处理和日志记录
            }
      }

      // 未来可以扩展更多特定类型的通知方法
      /**
       * 例如: 发送一个带有点击链接的通知
       * @param recipientUserId 接收者ID
       * @param content 通知内容
       * @param url 点击通知后跳转的URL
       */
      // public static async sendInAppNotificationWithUrl(
      //   recipientUserId: string,
      //   content: string,
      //   url: string,
      // ) {
      //   // 这需要您在Novu后台的generic-notification模板中添加对URL的处理
      //   // 例如，将整个通知体包裹在 <a href="{{payload.url}}">...</a> 中
      //   await novu.trigger('generic-notification', {
      //     to: { subscriberId: recipientUserId },
      //     payload: { content, url },
      //   });
      // }
}

/**
 * --- 如何在你的代码中使用 ---
 * 
 * 1. 导入服务:
 * import { NotificationService } from '@/lib/services/notification.service';
 * 
 * 2. 在任何需要发送通知的后端逻辑中调用:
 * 
 *  // 示例：在一个文档被分享后
 *  async function shareDocument(documentId: string, sharedWithUserId: string) {
 *    // ... 执行分享文档的数据库操作 ...
 * 
 *    // 操作成功后，发送通知
 *    const documentTitle = "《关于xxx的研究报告》";
 *    const sharerName = "张三";
 *    await NotificationService.sendInAppNotification(
 *      sharedWithUserId,
 *      `${sharerName} 与您分享了文档: ${documentTitle}`
 *    );
 *  }
 * 
 */ 