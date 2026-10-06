import { useEffect } from "react";

import { hasOpenFloatingLayer } from "./floating-layer-registry";

/**
 * Escape 키 입력 시 콜백을 실행한다. 모달·드로어 등 오버레이 레이어를 닫는 용도로 쓴다.
 * 위에 떠 있는 다른 floating layer(Dropdown 등)가 있으면 그쪽이 먼저 닫히도록 양보한다.
 * @param isActive Escape 리스너를 등록할지 여부 (열려 있을 때만 true)
 * @param onEscape Escape 키 입력 시 실행할 콜백
 */
export const useEscapeKey = (isActive: boolean, onEscape: () => void): void => {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (hasOpenFloatingLayer()) return;
      onEscape();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isActive, onEscape]);
};
