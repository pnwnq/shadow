import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function BorrowHistoryLoading() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-8 w-[150px]" />
      </div>

      {/* 搜索和筛选骨架 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* 标签页骨架 */}
      <Skeleton className="h-10 w-full" />

      {/* 历史记录列表骨架 */}
      <div className="space-y-4 mt-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Skeleton className="w-full md:w-[120px] h-[120px] rounded-md flex-shrink-0" />

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <Skeleton className="h-6 w-[200px]" />
                      <Skeleton className="h-6 w-[100px]" />
                    </div>

                    <Skeleton className="h-4 w-[150px] mt-1" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mt-3">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-full md:col-span-2 mt-1" />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Skeleton className="h-9 w-[100px]" />
                      <Skeleton className="h-9 w-[100px]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
