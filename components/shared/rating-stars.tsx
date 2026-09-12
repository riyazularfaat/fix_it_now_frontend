"use client"

import * as React from "react"
import { Star } from "lucide-react"

interface IRatingStarsProps {
    rating: number;
    maxStars?: number;
}

export function RatingStars({ rating, maxStars = 5 }: IRatingStarsProps) {
    const validRating = Math.max(0, Math.min(rating, maxStars));

    return (
        <div className="flex items-center gap-0.5" aria-label={`Rating: ${validRating} out of ${maxStars} stars`}>
            <svg className="absolute size-0" width="0" height="0">
                <defs>
                    <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="50%" stopColor="currentColor" className="text-yellow-400" />
                        <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>

            {Array.from({ length: maxStars }).map((_, index) => {
                const starNumber = index + 1;

                if (validRating >= starNumber) {
                    return (
                        <Star
                            key={index}
                            className="size-3.5 fill-yellow-400 text-yellow-500"
                        />
                    );
                }

                if (validRating > starNumber - 1 && validRating < starNumber) {
                    return (
                        <Star
                            key={index}
                            className="size-3.5 text-yellow-500"
                            style={{ fill: "url(#half-star-gradient)" }}
                        />
                    );
                }

                return (
                    <Star
                        key={index}
                        className="size-3.5 text-yellow-500 fill-none"
                    />
                );
            })}
        </div>
    );
}
