// import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css" // Use the new globals.css
// import { siteConfig } from "@/config/site" // Metadata will be replaced
import { absoluteUrl, cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import type React from "react"

// Comment out Inter font loading for now
// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

// Replace metadata with V0's metadata
export const metadata: Metadata = {
  title: "Shadow 实验室管理系统",
  description: "让实验室管理不再是负担，提高运营效率，降低学习门槛",
  generator: 'v0.dev'
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // Update lang attribute to zh-CN
    <html lang="zh-CN" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased", // Keep existing base classes
          // fontSans.variable, // Comment out fontSans variable
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
