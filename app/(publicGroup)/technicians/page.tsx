import Link from "next/link"
import type { Metadata } from "next"
import { LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { getTechnicians } from "../_actions/publicActions"
import { TechnicianList } from "../_components/TechnicianList"

export const metadata: Metadata = {
    title: "Find technicians | FixItNow",
    description: "Browse verified technicians ready to help with your next job.",
}

export default async function TechniciansPage() {
    const { technicians, requiresAuth } = await getTechnicians()

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-1.5">
                <h1 className="text-3xl font-bold tracking-tight">Find technicians</h1>
                <p className="text-muted-foreground">
                    Compare skills, rates, and ratings from our verified professionals.
                </p>
            </div>

            {requiresAuth ? (
                <Empty className="border">
                    <EmptyMedia variant="icon">
                        <LogIn />
                    </EmptyMedia>
                    <EmptyTitle>Sign in to browse technicians</EmptyTitle>
                    <EmptyDescription>
                        Create a free customer account or sign in to see the full list of verified
                        technicians and their availability.
                    </EmptyDescription>
                    <div className="mt-2 flex gap-3">
                        <Button asChild>
                            <Link href="/login?redirectTo=/technicians">
                                Sign in
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/register">
                                Create account
                            </Link>
                        </Button>
                    </div>
                </Empty>
            ) : (
                <TechnicianList technicians={technicians} />
            )}
        </div>
    )
}
