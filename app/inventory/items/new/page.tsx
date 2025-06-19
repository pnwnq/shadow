import { db } from "@/lib/prisma";
import { ItemForm } from "@/components/inventory/item-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateItemPage = async () => {
      const categories = await db.itemCategory.findMany();

      return (
            <div className="flex-1 space-y-4 p-4 md:p-8">
                  <Card>
                        <CardHeader>
                              <CardTitle>添加新物品</CardTitle>
                        </CardHeader>
                        <CardContent>
                              <ItemForm categories={categories} />
                        </CardContent>
                  </Card>
            </div>
      );
};

export default CreateItemPage; 