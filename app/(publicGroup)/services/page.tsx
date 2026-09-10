import { Suspense } from "react";
import { ServiceList } from "../_components/ServiceList";

export default async function ServicesPage() {
  
  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <div className="space-y-2 mb-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight">Our Available Services</h1>
        <p className="text-muted-foreground">Select and purchase our scalable high-performance solutions directly.</p>
      </div>

      <Suspense>
        <ServiceList />
      </Suspense>
    </div>
  );
}
