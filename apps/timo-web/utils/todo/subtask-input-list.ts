export interface SubtaskInputEntry {
  id: number;
  value: string;
}

export interface SubtaskInputListChange {
  entries: SubtaskInputEntry[];
  focusIndex: number | null;
}

/**
 * Enter 입력 시 하위 태스크 입력 필드를 추가한다. 마지막 필드에서 값이 있고
 * 최대 개수를 넘지 않을 때만 새 필드를 추가하며, 그 외에는 원본 목록을 그대로 반환한다.
 * @param entries - 현재 하위 태스크 입력 목록
 * @param index - Enter가 입력된 필드의 인덱스
 * @param createEntry - 새로 추가할 입력 엔트리를 생성하는 함수
 * @param maxCount - 허용되는 최대 입력 필드 개수
 * @returns 갱신된 입력 목록과 포커스를 이동할 인덱스(변경 없으면 null)
 */
export const addSubtaskInputOnEnter = (
  entries: SubtaskInputEntry[],
  index: number,
  createEntry: () => SubtaskInputEntry,
  maxCount: number,
): SubtaskInputListChange => {
  const isLastField = index === entries.length - 1;
  const hasValue = Boolean(entries[index]?.value.trim());
  const canAddMore = entries.length < maxCount;

  if (!isLastField || !hasValue || !canAddMore) {
    return { entries, focusIndex: null };
  }

  return {
    entries: [...entries, createEntry()],
    focusIndex: entries.length,
  };
};

/**
 * Backspace 입력 시 빈 하위 태스크 입력 필드를 이전 필드로 병합(삭제)한다.
 * 필드가 비어 있고 이전 필드가 존재할 때만 제거하며, 그 외에는 원본 목록을 그대로 반환한다.
 * @param entries - 현재 하위 태스크 입력 목록
 * @param index - Backspace가 입력된 필드의 인덱스
 * @returns 갱신된 입력 목록과 포커스를 이동할 인덱스(변경 없으면 null)
 */
export const removeSubtaskInputOnBackspace = (
  entries: SubtaskInputEntry[],
  index: number,
): SubtaskInputListChange => {
  const isFieldEmpty = entries[index]?.value === "";
  const canMergeIntoPrevious = index > 0;

  if (!isFieldEmpty || !canMergeIntoPrevious) {
    return { entries, focusIndex: null };
  }

  return {
    entries: entries.filter((_, i) => i !== index),
    focusIndex: index - 1,
  };
};
