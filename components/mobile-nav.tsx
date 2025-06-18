"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MainNav } from "@/components/main-nav"

export function MobileNav() {
      const [open, setOpen] = React.useState(false)
      const { data: session } = useSession()
      const userRole = session?.user?.role

      return (
            <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                        <Button
                              variant="ghost"
                              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                              <Menu className="h-6 w-6" />
                              <span className="sr-only">Toggle Menu</span>
                        </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="pr-0">
                        <Link href="/" className="flex items-center">
                              <span className="font-bold">Shadow</span>
                        </Link>
                        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                              <div className="flex flex-col space-y-3">
                                    <MainNav userRole={userRole} mobile={true} />
                              </div>
                        </div>
                  </SheetContent>
            </Sheet>
      )
} 