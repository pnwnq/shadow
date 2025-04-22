import type React from "react"
import Link from "next/link"
import { Microscope } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 md:left-12 md:top-12">
        <Microscope className="h-6 w-6" />
        <span className="text-xl font-bold">Shadow</span>
      </Link>
      {children}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>由Shadow小组开发和维护</p>
      </div>
    </div>
  )
}
