import { Button } from "@/components/ui/button"

export default async function Page() {
  return (
    <div className="flex min-h-svh flex-col font-sans">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          Your Trusted Home Service Platform
        </span>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Reliable home repairs,{" "}
          <span className="text-primary">booked in minutes</span>
        </h1>
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Browse qualified technicians, compare ratings and prices, and book the
          right professional for your job. Resize the window to see the
          navigation adapt across devices.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">Browse services</Button>
          <Button size="lg" variant="outline">
            Become a technician
          </Button>
        </div>
      </main>
    </div>
  )
}
