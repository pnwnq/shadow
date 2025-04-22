import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="relative rounded-xl bg-muted/50 p-6">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-2 text-center md:text-left">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
