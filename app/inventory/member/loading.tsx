import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

export default function InventoryMemberLoading() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px] mt-2" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      {/* 快速操作卡片骨架 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[200px] mt-1" />
              </CardHeader>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
      </div>

      {/* 搜索和筛选骨架 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* 标签页骨架 */}
      <div>
        <Skeleton className="h-10 w-full mb-4" />

        {/* 物品列表骨架 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader className="p-4 pb-0">
                  <Skeleton className="h-6 w-[150px]" />
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-2 flex justify-between">
                  <Skeleton className="h-10 w-[100px]" />
                  <Skeleton className="h-10 w-[100px]" />
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      {/* 最近借用历史骨架 */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>

        <Skeleton className="h-[300px] w-full rounded-md" />
      </div>
    </div>
  )
}
