"use client";

import { useEffect, useRef } from "react";

type ScrollToTodayListener = () => void;

const listeners = new Set<ScrollToTodayListener>();

export const triggerScrollToToday = (): void => {
  listeners.forEach((listener) => listener());
};

export const useHomeTodayScrollRef = <
  T extends HTMLElement,
>(): React.RefObject<T | null> => {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const listener: ScrollToTodayListener = () => {
      containerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return containerRef;
};
