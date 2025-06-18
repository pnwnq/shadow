import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function POST(request: Request): Promise<NextResponse> {
  // Log headers for debugging
  console.log("Received request headers:", Object.fromEntries(request.headers));

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    console.error("Upload attempt without authentication.");
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId = session.user.id;
  console.log(`Authenticated user: ${userId}`);

  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const name = form.get("name") as string | null;
    const category = form.get("category") as string | null;
    const description = form.get("description") as string | null;

    if (!file) {
      console.error("API Error: No file found in formData.");
      return new NextResponse("No file provided", { status: 400 });
    }

    if (!name) {
      console.error("API Error: No name found in formData.");
      return new NextResponse("No name provided", { status: 400 });
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
        name: name,
        url: blob.url,
        type: blob.contentType,
        size: file.size,
        uploaderId: userId,
        categoryId: category,
        description: description,
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