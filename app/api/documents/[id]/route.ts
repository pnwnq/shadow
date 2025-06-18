import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { db } from "@/lib/prisma"
import { auth } from "@/auth"
import { del } from '@vercel/blob'
import { Role } from "@prisma/client"

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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Document ID is required", { status: 400 });
    }

    const documentToDelete = await db.document.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!documentToDelete) {
      return new NextResponse("Document not found", { status: 404 });
    }

    // Check if the user is the owner or an admin
    const isOwner = documentToDelete.uploaderId === session.user.id;
    const isAdmin = session.user.role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Delete from Vercel Blob storage
    if (documentToDelete.url) {
      await del(documentToDelete.url);
    }

    // Delete from database
    await db.document.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error("[DOCUMENT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 