import * as React from "react";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export const TakaIcon = React.forwardRef<SVGSVGElement, LucideProps>(
    ({ className, strokeWidth = 2, size = 24, ...props }, ref) => {
        return (
            <svg
                ref={ref}
                xmlns="http://w3.org"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("lucide lucide-taka decrease-default-effects", className)}
                {...props}
            >
                {/* The main structural vertical spine on the left */}
                <path d="M6 3v18" />

                {/* The upper loop segment */}
                <path d="M6 3h10a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1-3.5 3.5H6" />

                {/* The lower fluid curving tail of the Taka character */}
                <path d="M6 11.5c4 0 7.5 1 7.5 4.5s-2.5 5-6.5 5" />

                {/* The signature horizontal divider slash across the middle body */}
                <path d="M6 11.5h9" />
            </svg>
        );
    }
);

TakaIcon.displayName = "TakaIcon";
