const OPEN_TABS_KEY = "openTabs";
const HEARTBEAT_INTERVAL_MS = 5000;
// 백그라운드 탭은 setInterval이 강하게 스로틀링될 수 있어(브라우저에 따라 최대 1분 이상),
// heartbeat 주기보다 훨씬 여유 있게 잡아 비활성 탭도 "열려있음"으로 인식되게 합니다.
const TAB_TTL_MS = 60000;

const isBrowser = typeof window !== "undefined";

let tabId: string | null = null;

const getTabId = (): string => {
  if (!tabId) {
    tabId = crypto.randomUUID();
  }
  return tabId;
};

type TabRegistry = Record<string, number>;

const readRegistry = (): TabRegistry => {
  try {
    const raw = window.localStorage.getItem(OPEN_TABS_KEY);
    return raw ? (JSON.parse(raw) as TabRegistry) : {};
  } catch {
    return {};
  }
};

const writeRegistry = (registry: TabRegistry): void => {
  try {
    window.localStorage.setItem(OPEN_TABS_KEY, JSON.stringify(registry));
  } catch {
    // localStorage 접근 불가 시 무시 (조용히 실패)
  }
};

/**
 * TTL이 지난(=beforeunload 없이 종료된 탭의) 항목을 걷어낸 레지스트리를 반환합니다.
 * heartbeat마다 호출해 죽은 탭 항목이 localStorage에 무한정 쌓이지 않게 합니다.
 */
const filterStaleEntries = (registry: TabRegistry): TabRegistry => {
  const now = Date.now();
  return Object.fromEntries(
    Object.entries(registry).filter(
      ([, lastSeenAt]) => now - lastSeenAt <= TAB_TTL_MS,
    ),
  );
};

/**
 * 현재 탭의 생존 여부를 localStorage 탭 레지스트리에 주기적으로 기록합니다 (heartbeat).
 * beforeunload로 정상 종료 시 자신의 항목을 지우고, 크래시 등으로 정리가 유실돼도
 * TAB_TTL_MS가 지나면 hasOtherTabsOpen에서 자동으로 무시됩니다.
 *
 * @returns heartbeat 타이머와 이벤트 리스너를 해제하는 cleanup 함수
 */
export const startTabPresenceHeartbeat = (): (() => void) => {
  if (!isBrowser) return () => {};

  const id = getTabId();

  const beat = () => {
    const registry = filterStaleEntries(readRegistry());
    registry[id] = Date.now();
    writeRegistry(registry);
  };

  beat();
  const intervalId = window.setInterval(beat, HEARTBEAT_INTERVAL_MS);

  const cleanup = () => {
    window.clearInterval(intervalId);
    const registry = readRegistry();
    delete registry[id];
    writeRegistry(registry);
  };

  window.addEventListener("beforeunload", cleanup);

  return () => {
    window.removeEventListener("beforeunload", cleanup);
    cleanup();
  };
};

/**
 * 현재 탭 외에 최근 TAB_TTL_MS 이내 heartbeat를 기록한 다른 탭이 있는지 확인합니다.
 * accessToken 재발급 실패가 멀티탭 경합 때문인지, 단일 탭에서의 자연 만료인지
 * 구분하는 용도로 사용합니다 (경합은 최소 2개 탭이 있어야만 발생할 수 있음).
 *
 * @returns 다른 탭이 열려 있으면 true
 */
export const hasOtherTabsOpen = (): boolean => {
  if (!isBrowser) return false;

  const id = getTabId();
  const registry = readRegistry();
  const now = Date.now();

  return Object.entries(registry).some(
    ([otherTabId, lastSeenAt]) =>
      otherTabId !== id && now - lastSeenAt <= TAB_TTL_MS,
  );
};
