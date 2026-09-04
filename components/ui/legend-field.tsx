import * as React from "react"

import { cn } from "@/lib/utils"

function LegendField({
    className,
    ...props
}: React.ComponentProps<"fieldset">) {
    return (
        <fieldset
            data-slot="legend-field"
            className={cn(
                "group/legend-field relative flex w-full min-w-0 items-center rounded-lg border border-input px-2.5 outline-none transition-colors hover:border-muted-foreground/60 has-[[data-slot=legend-field-control]:focus-visible]:border-ring has-[[data-slot][aria-invalid=true]]:border-destructive has-disabled:opacity-50 has-disabled:hover:border-input",
                className
            )}
            {...props}
        />
    )
}

function LegendFieldLegend({
    className,
    ...props
}: React.ComponentProps<"legend">) {
    return (
        <legend
            data-slot="legend-field-legend"
            className={cn(
                "-ml-1 px-1.5 text-xs font-medium text-muted-foreground group-has-[[data-slot][aria-invalid=true]]/legend-field:text-destructive",
                className
            )}
            {...props}
        />
    )
}

function LegendFieldInput({
    className,
    ...props
}: React.ComponentProps<"input">) {
    return (
        <input
            data-slot="legend-field-control"
            className={cn(
                "h-8 w-full min-w-0 rounded-none border-0 bg-transparent p-0 -mt-1 text-base text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
            )}
            {...props}
        />
    )
}

export { LegendField, LegendFieldLegend, LegendFieldInput }
