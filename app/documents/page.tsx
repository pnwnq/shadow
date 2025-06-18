import { db } from "@/lib/prisma"
import { DocumentClient } from "./document-client"

export const revalidate = 0 // force dynamic page

export default async function DocumentsPage() {
  const documentsPromise = db.document.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      uploader: {
        select: {
          name: true,
        },
      },
      category: true,
    },
  });

  const categoriesPromise = db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // TODO: Fetch real tags from the database
  const tagsPromise = db.document.findMany({
    select: {
      tags: true,
    },
    distinct: ["tags"],
  });

  const [documents, categories, tagsResult] = await Promise.all([
    documentsPromise,
    categoriesPromise,
    tagsPromise,
  ]);

  const tags = [...new Set(tagsResult.map(item => item.tags).flat())];

  return <DocumentClient initialDocuments={documents} categories={categories} tags={tags} />
}
