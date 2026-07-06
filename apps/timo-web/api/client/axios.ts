import axios from "axios";

import { parseApiError } from "@/api/error/api-error";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseURL)
  throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");

export const instance = axios.create({
  baseURL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: 추후 인증 방식 확정 후 status(401 등) 기반 사이드 이펙트(리다이렉트 등) 추가
    return Promise.reject(parseApiError(error));
  },
);
