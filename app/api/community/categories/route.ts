import { db } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
      try {
            const categories = await db.communityCategory.findMany()
            return NextResponse.json(categories)
      } catch (error) {
            return new NextResponse("Could not fetch categories", { status: 500 })
      }
} 