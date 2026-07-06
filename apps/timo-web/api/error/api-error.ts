import axios from "axios";

import { ApiErrorResponse, apiErrorSchema } from "@/api/schema/response";

export class ApiError extends Error {
  readonly status: number;
  readonly errorCode: string;
  readonly path: string;
  readonly timestamp: string;

  constructor(response: ApiErrorResponse) {
    super(response.message);
    this.name = "ApiError";
    this.status = response.status;
    this.errorCode = response.errorCode;
    this.path = response.path;
    this.timestamp = response.timestamp;
  }
}

export function parseApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const parsed = apiErrorSchema.safeParse(error.response?.data);

    if (parsed.success) {
      return new ApiError(parsed.data);
    }
  }

  return new ApiError({
    timestamp: new Date().toISOString(),
    status: 0,
    errorCode: "UNKNOWN_ERROR",
    message:
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.",
    path: "",
  });
}
