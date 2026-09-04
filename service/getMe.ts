"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  try {
    const decodedToken = jwt.decode(accessToken) as
      | (JwtPayload & { role?: string })
      | null;
    const role = decodedToken?.role?.toUpperCase();
    const profilePath =
      role === "TECHNICIAN"
        ? "/api/technicians/me"
        : role === "CUSTOMER"
          ? "/api/customers/me"
          : "/api/auth/admin/profile";

    const res = await fetch(`${process.env.BACKEND_API_URL}${profilePath}`, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: "Session expired or invalid token",
      };
    }

    const result = await res.json();

    return result.success
      ? result
      : {
          success: false,
          data: null,
          message: result.message || "Unable to fetch user profile",
        };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return {
      success: false,
      data: null,
      message: "An error occurred while fetching the user.",
    };
  }
};
