import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { getServices } from "../_actions/serviceAction";
import { SearchX } from "lucide-react";
import { ServiceCard } from "./ServicesCard";

export async function ServiceList() {
    const services = await getServices();
    // const categories = await getCategories();
    // console.log("categories: ", categories)
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
                {services.length > 0 ? (
                    services.map((service) => {
                        return (
                            <ServiceCard
                                key={service.id}
                                service={service}
                            />
                        );
                    })
                ) : (
                    <Empty>
                        <EmptyMedia variant="icon">
                            <SearchX />
                        </EmptyMedia>
                        <EmptyTitle>No services found</EmptyTitle>
                        <EmptyDescription>Try adjusting your filters or search term.</EmptyDescription>
                    </Empty>
                )}
            </div>

        </div>
    )
}