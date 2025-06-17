import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { db } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: "Document ID is required" }, { status: 400 })
  }

  try {
    const document = await db.document.findUnique({
      where: {
        id: id,
      },
    })

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    return NextResponse.json(document)
  } catch (error) {
    console.error("Error fetching document:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 