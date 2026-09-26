import * as Sentry from "@sentry/nextjs";
import axios, { AxiosError } from "axios";

import type { BaseResponseAuthReissueResponse } from "@/generated/models";

import { ROUTES } from "@/constants/routes";
import { parseApiError } from "@/http/api-error";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { hasOtherTabsOpen } from "@/utils/auth/tab-presence";
import { getAccessToken } from "@/utils/auth/token-manager";

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
    const tokenBeforeReissue = getAccessToken();

    reissuePromise = instance
      .post<BaseResponseAuthReissueResponse>(REISSUE_URL)
      .then(({ data }) => {
        const reissueData = data.data;
        if (reissueData)
          useAuthStore.getState().setAccessToken(reissueData.accessToken);
        return reissueData?.accessToken;
      })
      .catch((error) => {
        const tokenAfterReissue = getAccessToken();
        if (tokenAfterReissue && tokenAfterReissue !== tokenBeforeReissue) {
          useAuthStore.getState().setAccessToken(tokenAfterReissue);
          return tokenAfterReissue;
        }

        if (
          process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT !== "local" &&
          hasOtherTabsOpen()
        ) {
          Sentry.captureException(error);
        }
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
        window.location.href = ROUTES.LOGIN;
      } catch {
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(parseApiError(error));
  },
);
