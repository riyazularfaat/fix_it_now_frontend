import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full max-w-md" />
            <div className="grid gap-5 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-52 w-full rounded-xl" />
                ))}
            </div>
        </div>
    )
}
