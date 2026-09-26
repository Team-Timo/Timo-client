const OVERTIME_BASE_KEY = "timo:overtime-base";

const isBrowser = typeof window !== "undefined";

export interface OvertimeBase {
  timerId: number;
  baseSeconds: number;
}

const isOvertimeBase = (value: unknown): value is OvertimeBase => {
  if (typeof value !== "object" || value === null) return false;

  const { timerId, baseSeconds } = value as Record<string, unknown>;
  return Number.isFinite(timerId) && Number.isFinite(baseSeconds);
};

/**
 * 진행 중인 타이머의 초과시간 시작 기준값을 sessionStorage에서 가져옵니다.
 *
 * @returns 저장된 타이머 ID와 기준값(초), 없거나 서버 환경이면 null
 */
export const getOvertimeBase = (): OvertimeBase | null => {
  if (!isBrowser) return null;

  const raw = window.sessionStorage.getItem(OVERTIME_BASE_KEY);
  if (raw === null) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isOvertimeBase(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

/**
 * 진행 중인 타이머의 초과시간 시작 기준값을 sessionStorage에 저장합니다.
 *
 * @param timerId - 초과시간이 시작된 타이머 ID
 * @param baseSeconds - 초과시간이 시작된 시점의 경과 초
 */
export const setOvertimeBase = (timerId: number, baseSeconds: number): void => {
  if (!isBrowser) return;

  window.sessionStorage.setItem(
    OVERTIME_BASE_KEY,
    JSON.stringify({ timerId, baseSeconds }),
  );
};
