import { arrayMove } from "@dnd-kit/sortable";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

/**
 * 완료된 투두는 이동시킬 수 없으므로, fromIndex가 완료된 투두를 가리키면 원본을 그대로 반환한다.
 */
export const reorderTodos = (
  todos: Todo[],
  fromIndex: number,
  toIndex: number,
): Todo[] => {
  if (todos[fromIndex]?.completed) {
    return todos;
  }

  return arrayMove(todos, fromIndex, toIndex).map((todo, index) => ({
    ...todo,
    sortOrder: index,
  }));
};
