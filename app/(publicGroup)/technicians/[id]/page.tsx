// import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BadgeCheck, Briefcase} from "lucide-react";

import {
  getServicesByTechnician,
  getTechnicianById,
} from "../../_actions/publicActions";
import { formatCurrency } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";
import { RatingStars } from "@/components/shared/rating-stars";

// 🟢 ALIGNMENT FIX: Matched split map logic strategy to synchronize initials output structure with layout patterns
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const technician = await getTechnicianById(id);
  return {
    title: technician
      ? `${technician.name} | FixItNow`
      : "Technician | FixItNow",
  };
}

export default async function TechnicianProfilePage({
  params
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ serviceId?: string }>;
}) {
  const { id } = await params;
  // const { serviceId } = await searchParams;

  const [technician, services] = await Promise.all([
    getTechnicianById(id),
    getServicesByTechnician(id),
    getMe(),
  ]);

  if (!technician) notFound();

  // const canBook = me?.success && me?.data?.role === "CUSTOMER";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <Avatar className="size-20">
              <AvatarImage src={technician.avatarUrl || undefined} alt="" />
              <AvatarFallback className="text-lg bg-primary/5 text-primary font-medium">
                {initials(technician.name ?? "?")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {technician.name}
                </h1>
                {technician.isVerified === "VERIFIED" && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <BadgeCheck className="size-3.5" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {/* 🟢 ALIGNMENT FIX: Swapped with RatingStars template layout rules */}
                <span className="flex items-center gap-1.5">
                  <RatingStars rating={technician.rating ?? 0} />
                  <span className="font-semibold text-foreground ml-0.5">
                    {technician.rating?.toFixed(1) ?? "0.0"}
                  </span>
                  <span>({technician.reviewCount ?? 0} reviews)</span>
                </span>

                <span className="flex items-center gap-1">
                  <Briefcase className="size-4" />
                  {technician.yearsExperience ?? 0} years experience
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(technician.skills ?? []).map((skill) => (
                  <Badge key={skill} variant="secondary" className="capitalize border bg-muted/60 text-muted-foreground font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {technician.bio || "This technician hasn't added a bio yet."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services offered</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {services.length > 0 ? (
                services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between gap-4 rounded-lg border p-4 hover:border-primary/20 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{service.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-foreground">
                      {formatCurrency(service.price, service.currency ?? "USD")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  This technician hasn&apos;t listed any services yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="lg:sticky lg:top-20">
            <CardHeader>
              <CardTitle>Book this technician</CardTitle>
            </CardHeader>

            {/* <CardContent>
              {canBook ? (
                services.length > 0 ? (
                  <BookingForm
                    technicianId={id}
                    services={services}
                    defaultServiceId={serviceId}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    This technician has no bookable services yet.
                  </p>
                )
              ) : me?.success ? (
                <p className="text-sm text-muted-foreground italic">
                  Only customer accounts can request bookings.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">
                    Sign in as a customer to request a booking with{" "}
                    {technician.name}.
                  </p>
                  <Button asChild className="w-full">
                    <Link href={`/login?redirectTo=/technicians/${id}`} className="flex items-center justify-center gap-2">
                      <LogIn className="size-4" />
                      Sign in to book
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
