import { ICategory, IService } from "@/lib/types";
import { cookies } from "next/headers";

export const getServices = async (): Promise<IService[]> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    throw new Error("User Not Logged In!");
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["services"],
    },
  });
    const data = await res.json();
    
  return data.data as IService[];
};

export const getCategories = async (): Promise<ICategory[]> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["categories"],
    },
  });
  const data: ICategory[] = await res.json();
  console.log("Category: ", JSON.stringify(data));
  return data;
};
