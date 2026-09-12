/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { ICategory, IService, ITechnicianSummary} from "@/lib/types";

// Helper helper function to extract accessToken matching serviceActions.ts exactly
const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    throw new Error("User Not Logged In!");
  }

  return {
    "Content-Type": "application/json",
    Cookie: `accessToken=${accessToken}`,
  };
};

export interface ServiceFilters {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}


export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories?limit=100`, {
      method: "GET",
      headers,
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["categories"],
      },
    });

    const result = await res.json();
    return result.data ?? [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export const getServices = async (filters: ServiceFilters = {}): Promise<IService[]> => {
  try {
    const headers = await getAuthHeaders();

    const queryParams = new URLSearchParams({
      searchTerm: filters.search || "",
      categoryId: filters.categoryId || "",
      page: String(filters.page ?? 1),
      limit: String(filters.limit ?? 24),
    });

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services?${queryParams.toString()}`, {
      method: "GET",
      headers,
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["services"],
      },
    });

    const result = await res.json();
    const raw = result.data;
    let list: IService[] = Array.isArray(raw) ? raw : (raw?.data ?? []);


    list = list.map((s: any) => ({
      ...s,
      price: Number(s.price),
      currency: typeof s.currency === "string" ? s.currency.trim() : s.currency,
    }));


    if (filters.categoryId) list = list.filter((s) => s.categoryId === filters.categoryId);
    if (filters.search) {
      const term = filters.search.toLowerCase();
      list = list.filter(
        (s) => s.title.toLowerCase().includes(term) || s.description?.toLowerCase().includes(term)
      );
    }
    if (filters.minPrice !== undefined) list = list.filter((s) => s.price >= filters.minPrice!);
    if (filters.maxPrice !== undefined) list = list.filter((s) => s.price <= filters.maxPrice!);

    return list;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
};


export const getServiceById = async (id: string): Promise<IService | null> => {
  const services = await getServices({ limit: 100 });
  return services.find((s) => s.id === id) ?? null;
};


function normalizeTechnician(u: any): ITechnicianSummary {
  const profile = u.profile ?? {};
  return {
    id: u.id,
    userId: u.id,
    name: u.name,
    email: u.email,
    avatarUrl: profile.profilePhoto ?? null,
    photoUrl: profile.profilePhoto ?? null,
    bio: profile.bio ?? null,
    skills: profile.skills ?? [],
    hourlyRate: Number(profile.hourlyRate ?? 0),
    yearsExperience: profile.yearsExperience ?? 0,
    isVerified: profile.isVerified,
    rating: Number(profile.avgRating ?? 0),
    reviewCount: profile.totalReviews ?? 0,
  };
}

export const getTechnicians = async (): Promise<{
  technicians: ITechnicianSummary[];
  requiresAuth: boolean;
}> => {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/customers/technicians`, {
      method: "GET",
      headers,
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { technicians: [], requiresAuth: true };
    }

    const users = result.data?.users ?? [];
    return {
      technicians: users.map(normalizeTechnician),
      requiresAuth: false,
    };
  } catch (error) {
    console.error("Failed to fetch technicians:", error);
    return { technicians: [], requiresAuth: true };
  }
};


export const getTechnicianById = async (id: string): Promise<ITechnicianSummary | null> => {
  const { technicians } = await getTechnicians();
  return technicians.find((t) => t.id === id) ?? null;
};


export const getServicesByTechnician = async (technicianId: string): Promise<IService[]> => {
  const services = await getServices({ limit: 100 });
  return services.filter((s) => s.technicianId === technicianId);
};
