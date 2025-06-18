import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 左侧聊天区域骨架 */}
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>

          {/* 聊天界面骨架 */}
          <div className="border rounded-lg p-6 flex-1 flex flex-col">
            <div className="pb-3 mb-4">
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex-1 mb-4 space-y-4">
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-20 w-64 rounded-lg" />
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex gap-3 max-w-[80%] flex-row-reverse">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-12 w-48 rounded-lg" />
                </div>
              </div>

              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-16 w-72 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>

        {/* 右侧功能区域骨架 */}
        <div className="w-full md:w-80 space-y-6">
          {/* 常见问题骨架 */}
          <div className="border rounded-lg p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* AI 功能介绍骨架 */}
          <div className="border rounded-lg p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </div>
          </div>

          {/* 学习资源骨架 */}
          <div className="border rounded-lg p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-12" />
              </div>

              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-12" />
              </div>

              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-12" />
              </div>

              <Skeleton className="h-4 w-40 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
