"use client";

import { useEffect } from "react";

/**
 * 도메인 이전 전 PWA로 설치됐던 구버전 서비스워커가 사용자 브라우저에 남아
 * 캐시된 구버전 페이지를 계속 서빙하는 문제를 막기 위해,
 * 현재 origin에 등록된 서비스워커와 캐시를 전부 정리한다.
 */
export const ServiceWorkerCleanup = () => {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });

    if (!("caches" in window)) return;

    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  }, []);

  return null;
};
