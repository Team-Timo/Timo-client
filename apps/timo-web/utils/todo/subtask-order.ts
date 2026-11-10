import { arrayMove } from "@dnd-kit/sortable";

export interface SubtaskReorderResult<T> {
  items: T[];
  newIndex: number;
}

/**
 * 드래그한 하위 태스크를 옮긴 목록과, 서버에 보낼 미완료 그룹 내 newIndex를 계산합니다.
 * 서버는 미완료 하위 태스크끼리만 순서를 바꿀 수 있으므로, 옮기는 항목이나 놓을 위치의 항목이
 * 이동 불가(완료 등)면 null을 반환합니다.
 *
 * @param items - 현재 화면 순서의 하위 태스크 목록
 * @param fromIndex - 드래그한 항목의 인덱스
 * @param toIndex - 놓은 위치의 인덱스
 * @param isMovable - 미완료 그룹에 속해 순서를 바꿀 수 있는 항목인지 판단하는 함수
 * @returns 옮긴 목록과 미완료 그룹 기준 newIndex, 이동할 수 없으면 null
 */
export const reorderSubtasks = <T>(
  items: T[],
  fromIndex: number,
  toIndex: number,
  isMovable: (item: T) => boolean,
): SubtaskReorderResult<T> | null => {
  const moved = items[fromIndex];
  const target = items[toIndex];
  if (moved === undefined || target === undefined) return null;
  if (!isMovable(moved) || !isMovable(target)) return null;

  const reordered = arrayMove(items, fromIndex, toIndex);
  const newIndex = reordered.filter(isMovable).indexOf(moved);

  return { items: reordered, newIndex };
};
