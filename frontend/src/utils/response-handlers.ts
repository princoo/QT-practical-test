import { ApiResponse, ErrorResponse } from "@/lib/types/response";

export const handleResponse = async <T>(
  res: Response
): Promise<ApiResponse<T>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = null;

  try {
    data = await res.json();
  } catch {
    // no JSON or empty response
  }

  if (!res.ok) {
    const message = data?.message ?? "An unknown error occurred";
    return { success: false, message };
  }

  return {
    success: true,
    data: data?.data,
    message: data?.message,
  };
};

export const handleError = (error: unknown): ErrorResponse => {
  const message =
    error instanceof Error ? error.message : "An unknown error occurred";
  return { success: false, message };
};
