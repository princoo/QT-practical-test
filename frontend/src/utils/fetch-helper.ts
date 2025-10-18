"use server";
import { ApiResponse } from "@/lib/types/response";
import { handleError, handleResponse } from "./response-handlers";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const { next: callerNext, ...rest } = options ?? {};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      {
        next: { revalidate: 30, ...(callerNext || {}) },
        ...rest,
      }
    );
    return await handleResponse<T>(res);
  } catch (error) {
    return handleError(error);
  }
}
