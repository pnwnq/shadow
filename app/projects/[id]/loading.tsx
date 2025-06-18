import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <Skeleton className="h-8 w-96 mb-6" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-9 w-24" />
        </div>
        <Skeleton className="h-5 w-48" />
      </div>

      <Skeleton className="h-4 w-full" />

      <Skeleton className="h-10 w-full" />

      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-lg" />

        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-80 w-full rounded-lg" />
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>

        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    </div>
  )
}
