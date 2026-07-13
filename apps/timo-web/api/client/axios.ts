import axios, { AxiosError } from "axios";

import type { BaseResponseAuthReissueResponse } from "@/api/generated/models";

import { parseApiError } from "@/api/error/api-error";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// refreshToken 쿠키가 Path=/auth로 스코프돼 있어서 /api/v1/auth가 아닌 /auth로 요청해야 쿠키가 실린다.
const REISSUE_URL = "/auth/reissue";
const retriedRequests = new WeakSet<object>();
let reissuePromise: Promise<string | undefined> | null = null;

// AuthGuardProvider 등 다른 곳에서도 재발급이 필요하면 이 함수를 재사용해야 한다.
// 생성된 useReissue() 훅은 /api/v1/auth/reissue(=baseURL 결합 시 /api/api/v1/auth/reissue)로 요청해
// 쿠키 Path(/auth)와 어긋나 refreshToken이 실리지 않는다.
export const reissueAccessToken = () => {
  if (!reissuePromise) {
    reissuePromise = instance
      // instance의 baseURL("/api")이 붙으면 /api/auth/reissue가 되어 쿠키 Path(/auth)와 어긋나므로
      // 이 요청만 baseURL을 비워 실제로 /auth/reissue로 나가게 한다.
      .post<BaseResponseAuthReissueResponse>(REISSUE_URL, undefined, {
        baseURL: "",
      })
      .then(({ data }) => {
        const reissueData = data.data;
        if (reissueData)
          useAuthStore.getState().setAccessToken(reissueData.accessToken);
        return reissueData?.accessToken;
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
        window.location.href = ROUTES.LOGIN;
      } catch {
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(parseApiError(error));
  },
);
