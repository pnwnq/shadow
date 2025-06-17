import { db } from "@/lib/prisma"
import { DocumentClient } from "./document-client"

export const revalidate = 0 // force dynamic page

export default async function DocumentsPage() {
  const documents = await db.document.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      uploader: {
        select: {
          name: true,
        },
      },
    },
  })

  // TODO: Fetch real categories and tags from the database
  const categories = [
    { id: "tech", name: "技术文件" },
    { id: "study", name: "学习资料" },
    { id: "project", name: "项目文件" },
    { id: "manual", name: "设备手册" },
    { id: "template", name: "文件模板" },
    { id: "other", name: "其他" },
  ]
  const tags = ["机器人", "计算机视觉", "ROS", "Python"]

  return <DocumentClient initialDocuments={documents} categories={categories} tags={tags} />
}
