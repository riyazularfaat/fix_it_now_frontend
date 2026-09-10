/* eslint-disable react-hooks/static-components */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getCategoryIcon } from "@/lib/get-category-icon";
import { getCurrencyIcon } from "@/lib/getCurrencyIcon";
import { IService } from "@/lib/types";
import { Clock } from "lucide-react";

type ServiceProb = {
    service: IService,
    // category: ICategory
}

export async function ServiceCard({service}: ServiceProb) {
    const Icon = getCategoryIcon(service.category?.name ?? service.title);
    const currencyIcon = getCurrencyIcon(service.currency);
    return (
        <Card className="h-full transition-shadow group-hover:shadow-md">
            <CardHeader className="flex flex-row items-start justify-between gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5 items-center" />
                </span>
                <Badge variant={service.serviceStatus ? "default" : "destructive"} className="text-xs">
                    {service.serviceStatus ? "Active" : "Inactive"}
                </Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-balance">{service.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t pt-4">
                <span className="text-sm font-semibold text-foreground">
                    {service.price } {currencyIcon}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                        {service.priceType === "HOURLY" ? "/ hr" : "starting"}
                    </span>
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {service.duration} min
                </span>
            </CardFooter>
        </Card>
    )
}