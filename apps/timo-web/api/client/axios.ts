import axios, { AxiosError } from "axios";

import type { BaseResponseAuthReissueResponse } from "@/api/generated/models";

import { parseApiError } from "@/api/error/api-error";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/auth/useAuthStore";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseURL)
  throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");

export const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const REISSUE_URL = "/api/v1/auth/reissue";
const retriedRequests = new WeakSet<object>();
let reissuePromise: Promise<string | undefined> | null = null;

const reissueAccessToken = () => {
  if (!reissuePromise) {
    reissuePromise = instance
      .post<BaseResponseAuthReissueResponse>(REISSUE_URL)
      .then(({ data }) => {
        const accessToken = data.data?.accessToken;
        if (accessToken) useAuthStore.getState().setAccessToken(accessToken);
        return accessToken;
      })
      .catch((error) => {
        useAuthStore.getState().clearAccessToken();
        throw error;
      })
      .finally(() => {
        reissuePromise = null;
      });
  }
  return reissuePromise;
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const isReissueRequest = originalRequest?.url === REISSUE_URL;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !isReissueRequest &&
      !retriedRequests.has(originalRequest)
    ) {
      retriedRequests.add(originalRequest);
      try {
        const newAccessToken = await reissueAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch {
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(parseApiError(error));
  },
);
