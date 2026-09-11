import type { Metadata } from "next"
import { ShieldCheck, Users, Wrench } from "lucide-react"

export const metadata: Metadata = {
    title: "About us | FixItNow",
    description: "Learn about FixItNow's mission to connect homeowners with trusted technicians.",
}

export default function AboutPage() {
    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight">About FixItNow</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
                FixItNow connects homeowners with verified, background-checked technicians for repairs,
                installs, and maintenance. We handle scheduling, secure payments, and quality assurance
                so you can focus on getting the job done right.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                    {
                        icon: ShieldCheck,
                        title: "Verified professionals",
                        description: "Every technician is reviewed before they can accept jobs.",
                    },
                    {
                        icon: Wrench,
                        title: "Any home job",
                        description: "From electrical to plumbing to networking, we cover it all.",
                    },
                    {
                        icon: Users,
                        title: "Community driven",
                        description: "Reviews from real customers help you choose with confidence.",
                    },
                ].map((item) => (
                    <div key={item.title} className="flex flex-col gap-2">
                        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <item.icon className="size-5" />
                        </span>
                        <h2 className="font-semibold">{item.title}</h2>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
