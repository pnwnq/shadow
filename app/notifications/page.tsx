"use client"

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { NovuProvider, Inbox } from '@novu/nextjs';

export default function NotificationsPage() {
  const { data: session, status } = useSession({ required: true });

  useEffect(() => {
    // 确保用户已认证后再同步订阅者信息
    if (status === 'authenticated') {
      fetch('/api/novu', {
        method: 'POST',
      }).catch((e) => console.error('Failed to sync subscriber with Novu', e));
    }
  }, [status]);

  // 在加载会话或必要ID尚未准备好时显示加载状态
  if (status === 'loading' || !process.env.NEXT_PUBLIC_NOVU_APP_ID || !session?.user?.id) {
    return (
      <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <div className="text-muted-foreground">Loading notifications...</div>
      </div>
    );
  }

  return (
    <NovuProvider
      subscriberId={session.user.id}
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID}
    >
      {/* 这是一个全页面的通知收件箱视图 */}
      <div className="mx-auto max-w-4xl p-4">
        <Inbox />
      </div>
    </NovuProvider>
  );
}
