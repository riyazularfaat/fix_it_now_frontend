/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

type LoginState = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
};

export type RegisteredUser = {
  id: string;
  name: string;
  email: string;
  activeStatus: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: string;
    profilePhoto: string | null;
    bio: string | null;
    userId: string;
  } | null;
};

export type RegisterState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: {
    user: RegisteredUser;
  };
};

export const loginAction = async (
  redirectTo: string,
  prevState: LoginState,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      path: "/",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
    });

    refresh();

    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirect(redirectTo);
    }

    const jwtDecoder = jwt.decode(result.data.accessToken) as JwtPayload;
    if (jwtDecoder.role === "CUSTOMER") redirect("/dashboard");
    else if (jwtDecoder.role === "ADMIN") redirect("/admin-dashboard");
    else if (jwtDecoder.role === "TECHNICIAN")
      redirect("/technician-dashboard");
  }

  return result;
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = formData.get("password");
  const profilePhoto = formData.get("profilePhoto");
  const bio = formData.get("bio");
  const role = formData.get("role");

  const payload = {
    name,
    email,
    password,
    ...(profilePhoto && { profilePhoto }),
    ...(bio && { bio }),
    ...(role && { role }),
  };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Registration failed.",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "Unable to connect to the registration service.",
    };
  }

  redirect("/login");
};
