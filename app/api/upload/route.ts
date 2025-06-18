import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";

export async function POST(request: Request): Promise<NextResponse> {
  // Log headers for debugging
  console.log("Received request headers:", Object.fromEntries(request.headers));

  const session = await auth();
  if (!session || !session.user?.id) {
    console.error("Upload attempt without authentication.");
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId = session.user.id;
  console.log(`Authenticated user: ${userId}`);

  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const title = form.get("title") as string | null;
    const category = form.get("category") as string | null;
    const description = form.get("description") as string | null;

    if (!file) {
      console.error("API Error: No file found in formData.");
      return new NextResponse("No file provided", { status: 400 });
    }

    if (!title || !category) {
      return new NextResponse("Missing required fields: title or category", { status: 400 });
    }

    console.log(`File received: ${file.name}, size: ${file.size}, type: ${file.type}`);

    const blob = await put(file.name, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: true,
    });

    console.log("File uploaded to Vercel Blob:", blob);

    // 文件上传成功后，在数据库中创建记录
    const document = await db.document.create({
      data: {
        title: title,
        fileName: file.name,
        description: description,
        url: blob.url,
        type: file.type,
        size: file.size,
        category: category,
        uploaderId: userId,
      },
    });

    console.log("Document record created in DB:", document);

    return NextResponse.json(blob);
  } catch (error) {
    console.error("--- UPLOAD FAILED ---");
    console.error(error); // Log the full error object
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ message: "Error uploading file", error: error.message }), { status: 500 });
    }
    return new NextResponse(JSON.stringify({ message: "An unknown error occurred" }), { status: 500 });
  }
}