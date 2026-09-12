"use client"

import * as React from "react"
import Link from "next/link"
import { BadgeCheck } from "lucide-react"

import { formatCurrency } from "@/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ITechnicianSummary } from "@/lib/types"
import { RatingStars } from "@/components/shared/rating-stars"

interface TechnicianCardProps {
    technician: ITechnicianSummary
}

function initials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
}

export function TechnicianCard({ technician }: TechnicianCardProps) {
    return (
        <Link href={`/technicians/${technician.id}`} className="group block h-full">
            <Card className="h-full border transition-all duration-200 ease-in-out hover:border-primary/30 hover:shadow-md bg-card text-card-foreground">
                <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <Avatar className="size-11 ring-offset-background transition-transform group-hover:scale-105">
                        <AvatarImage src={technician.avatarUrl || undefined} alt={`${technician.name || 'Technician'} profile image`} />
                        <AvatarFallback className="bg-primary/5 text-primary text-sm font-medium">
                            {initials(technician.name ?? "?")}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex min-w-0 flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                            <h3 className="truncate text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                {technician.name}
                            </h3>
                            {technician.isVerified === "VERIFIED" && (
                                <BadgeCheck className="size-4 shrink-0 text-primary fill-primary/10" />
                            )}
                        </div>

                        {/* Corrected Rating Component System */}
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <RatingStars rating={technician.rating ?? 0} />
                            <span className="font-medium text-foreground ml-0.5">
                                {technician.rating?.toFixed(1) ?? "0.0"}
                            </span>
                            <span className="text-xs text-muted-foreground/80">
                                ({technician.reviewCount ?? 0})
                            </span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 pb-4">
                    <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed min-h-10">
                        {technician.bio || "No professional overview summary detailed yet."}
                    </p>

                    {/* Skills Array Tags Container */}
                    <div className="flex flex-wrap gap-1.5">
                        {(technician.skills ?? []).slice(0, 3).map((skill) => (
                            <Badge
                                key={skill}
                                variant="secondary"
                                className="capitalize text-[11px] font-medium tracking-wide border bg-muted/60 text-muted-foreground"
                            >
                                {skill}
                            </Badge>
                        ))}
                        {(technician.skills ?? []).length === 0 && (
                            <span className="text-xs text-muted-foreground/60 italic">General Repair</span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t bg-muted/5 px-6 py-3.5 mt-auto">
                    <div className="text-sm font-semibold text-foreground">
                        {formatCurrency(technician.hourlyRate ?? 0)}
                        <span className="ml-0.5 text-xs font-normal text-muted-foreground"> / hr</span>
                    </div>
                    <div className="text-xs font-medium text-muted-foreground tracking-wide bg-muted/40 px-2 py-0.5 rounded border">
                        {technician.yearsExperience ?? 0} yrs exp
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
