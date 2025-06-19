import { db } from "@/lib/prisma";
import { ItemForm } from "@/components/inventory/item-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

const EditItemPage = async ({ params }: { params: { id: string } }) => {
      const item = await db.item.findUnique({
            where: {
                  id: params.id,
            },
      });

      if (!item) {
            notFound();
      }

      const categories = await db.itemCategory.findMany();

      return (
            <div className="flex-1 space-y-4 p-4 md:p-8">
                  <Card>
                        <CardHeader>
                              <CardTitle>编辑物品: {item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                              <ItemForm initialData={item} categories={categories} />
                        </CardContent>
                  </Card>
            </div>
      );
};

export default EditItemPage; 