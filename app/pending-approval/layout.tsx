import React from 'react';

interface PendingApprovalLayoutProps {
      children: React.ReactNode;
}

export default function PendingApprovalLayout({ children }: PendingApprovalLayoutProps) {
      return (
            <div className="h-full">
                  {children}
            </div>
      );
} 