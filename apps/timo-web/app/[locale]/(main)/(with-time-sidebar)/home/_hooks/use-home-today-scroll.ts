"use client";

import { useEffect, useRef } from "react";

type ScrollToTodayListener = () => void;

const listeners = new Set<ScrollToTodayListener>();

const TODAY_CARD_SELECTOR = '[data-today="true"]';

/**
 * days 배열이 과거→오늘→미래 순서를 유지하므로, 오늘 카드를 배열 맨 앞으로
 * 옮기는 대신 실제 오늘 카드의 위치로 스크롤해 오늘이 좌측 기준으로 보이게 한다.
 * scrollIntoView의 inline:"start"는 조상 요소의 margin/position이나 수동
 * 좌표 계산과 무관하게 브라우저가 직접 정렬 위치를 계산하므로 더 안전하다.
 */
export const scrollContainerToToday = (
  container: HTMLElement | null,
  behavior: ScrollBehavior = "auto",
): void => {
  if (!container) {
    return;
  }

  const todayElement =
    container.querySelector<HTMLElement>(TODAY_CARD_SELECTOR);

  if (!todayElement) {
    container.scrollTo({ left: 0, behavior });
    return;
  }

  todayElement.scrollIntoView({ behavior, inline: "start", block: "nearest" });
};

export const triggerScrollToToday = (): void => {
  listeners.forEach((listener) => listener());
};

export const useHomeTodayScrollRef = <
  T extends HTMLElement,
>(): React.RefObject<T | null> => {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const listener: ScrollToTodayListener = () => {
      scrollContainerToToday(containerRef.current, "smooth");
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return containerRef;
};
