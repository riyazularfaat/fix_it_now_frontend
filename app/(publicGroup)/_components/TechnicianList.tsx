"use client"

import * as React from "react"
import { SearchX } from "lucide-react"

import { ITechnicianSummary } from "@/lib/types"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { TechnicianCard } from "./TechnicianCard"

interface TechnicianListProps {
    technicians: ITechnicianSummary[]
}

export function TechnicianList({ technicians }: TechnicianListProps) {
    return (
        <div className="space-y-8 w-full">
            {/* Responsiveness configuration grid matching ServiceList rules */}
            {technicians.length > 0 ? (
                <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
                    {technicians.map((technician) => (
                        <TechnicianCard
                            key={technician.id}
                            technician={technician}
                        />
                    ))}
                </div>
            ) : (
                /* Layout aligned with empty structural templates */
                <Empty className="border rounded-xl p-12 bg-card text-center">
                    <EmptyMedia variant="icon" className="mx-auto text-muted-foreground/60">
                        <SearchX className="size-8" />
                    </EmptyMedia>
                    <EmptyTitle className="mt-4 text-lg font-semibold">
                        No Technicians Available
                    </EmptyTitle>
                    <EmptyDescription className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                        We couldn&apos;t track down any active professional profiles. Try adjusting your search query filters.
                    </EmptyDescription>
                </Empty>
            )}
        </div>
    )
}
