"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import {
  getActiveTimer,
  getGetActiveTimerQueryKey,
} from "@/api/generated/endpoints/timer/timer";
import { activeTimerSchema } from "@/types/timer-type";

export const useActiveTimer = () => {
  const query = useQuery({
    queryKey: getGetActiveTimerQueryKey(),
    queryFn: ({ signal }) => getActiveTimer(undefined, signal),
    select: ({ data }) => (data ? activeTimerSchema.parse(data) : undefined),
    refetchOnMount: "always",
  });

  const { data, dataUpdatedAt } = query;
  const isRunning = data?.status === "RUNNING";

  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => setTick((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning, dataUpdatedAt]);

  const tickedData = useMemo(() => {
    if (!data || !isRunning) return data;

    const elapsedSinceFetch = Math.floor((Date.now() - dataUpdatedAt) / 1000);

    return {
      ...data,
      elapsedSeconds: data.elapsedSeconds + elapsedSinceFetch,
      remainingSeconds: Math.max(0, data.remainingSeconds - elapsedSinceFetch),
    };
    // tick은 값 자체가 아니라 매 초 재계산을 트리거하기 위한 용도로만 의존성에 둔다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRunning, dataUpdatedAt, tick]);

  return { ...query, data: tickedData };
};
