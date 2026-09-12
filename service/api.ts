/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import type { ApiResponse } from "@/lib/types";

type ServerFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrl(path: string, query?: ServerFetchOptions["query"]) {
  const url = new URL(
    path.startsWith("/") ? path : `/${path}`,
    getBackendUrl(),
  );

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

/**
 * Server-only fetch helper. Forwards the httpOnly accessToken cookie to the
 * backend exactly like getMe.ts does, and normalizes the response into a
 * consistent { success, message, data } envelope.
 */
export async function serverFetch<T = unknown>(
  path: string,
  options: ServerFetchOptions = {},
): Promise<ApiResponse<T>> {
  const { body, query, headers, ...rest } = options;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(buildUrl(path, query), {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    let result: any = null;
    try {
      result = await res.json();
    } catch {
      result = null;
    }

    if (!res.ok || !result) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || `Request failed with status ${res.status}`,
        data: result?.data,
      };
    }

    return {
      success: result.success ?? true,
      statusCode: res.status,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("[v0] serverFetch error:", error);
    return {
      success: false,
      message: "Unable to reach the server. Please try again.",
    };
  }
}
