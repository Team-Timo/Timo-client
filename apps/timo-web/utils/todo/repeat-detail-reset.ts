import type { RepeatFrequency } from "@repo/timo-design-system/ui";

export interface GetRepeatDetailsResetParams<TDay> {
  currentFrequency: RepeatFrequency | "NONE";
  nextFrequency: RepeatFrequency;
  isRepeatActive: boolean;
  emptyDay: TDay;
}

export const getRepeatDetailsReset = <TDay>({
  currentFrequency,
  nextFrequency,
  isRepeatActive,
  emptyDay,
}: GetRepeatDetailsResetParams<TDay>): {
  weekdays: string[];
  day: TDay;
} | null => {
  if (isRepeatActive && currentFrequency === nextFrequency) return null;

  return { weekdays: [], day: emptyDay };
};
