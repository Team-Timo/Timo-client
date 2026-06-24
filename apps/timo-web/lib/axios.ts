import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    // 추후 인증 방식 확정 후 에러 핸들링 추가
    return Promise.reject(error);
  },
);
