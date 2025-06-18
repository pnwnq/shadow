import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalNav } from "@/components/global-nav"
import { AuthProvider } from "@/components/auth-provider"
import Providers from "@/components/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shadow实验室管理系统",
  description: "全方位的实验室数字化管理解决方案",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Providers>
              <div className="relative flex min-h-screen flex-col">
                <GlobalNav />
                <div className="flex-1">{children}</div>
              </div>
            </Providers>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
