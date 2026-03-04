

export interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export interface AxiosErrorLike {
  response?: {
    data?: ApiErrorResponse | string;
    status?: number;
  };
}

export const getErrorMessage = (
  err: unknown,
  defaultMsg: string
): string => {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    (err as AxiosErrorLike).response
  ) {
    const data = (err as AxiosErrorLike).response!.data;

    if (typeof data === "string") {
      return data;
    }

    if (data && typeof data === "object" && "message" in data) {
      return (data as ApiErrorResponse).message ?? defaultMsg;
    }
  }

  return defaultMsg;
};
