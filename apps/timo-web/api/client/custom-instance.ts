import type { AxiosError, AxiosRequestConfig } from "axios";

import { instance } from "@/api/client/axios";

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> =>
  instance({ ...config, ...options }).then((response) => response.data);

export type ErrorType<TError> = AxiosError<TError>;
export type BodyType<TBodyData> = TBodyData;
