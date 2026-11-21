import type { DetailTodoSubtaskInput } from "@/components/todo-modal/detail/DetailTodoTaskFields";
import type { TodoSubtask } from "@/schemas/todo/todo-schema";

/**
 * 다시 불러온 서버 하위 태스크를 열려 있는 상세 모달의 입력 목록에 반영합니다.
 * 저장된 항목은 완료 여부를 맞추고, 아직 subtaskId가 없는 항목은 저장된 서버 항목과 연결합니다.
 * 수정 API는 신규 하위 태스크를 맨 뒤에 추가하므로, 어떤 입력에도 연결되지 않은 서버 항목을
 * 순서대로 보며 내용이 같은 입력에 subtaskId를 채웁니다.
 *
 * @param inputs - 현재 화면의 하위 태스크 입력 목록
 * @param subtasks - 서버에서 다시 불러온 하위 태스크 목록
 * @returns 완료 여부와 subtaskId를 반영한 입력 목록, 바뀐 항목이 없으면 원본 목록
 */
export const syncDetailSubtaskInputs = (
  inputs: DetailTodoSubtaskInput[],
  subtasks: TodoSubtask[],
): DetailTodoSubtaskInput[] => {
  const linkedIds = new Set(
    inputs.flatMap((input) =>
      input.subtaskId === null ? [] : [input.subtaskId],
    ),
  );
  const unlinkedSubtasks = subtasks.filter(
    (subtask) => !linkedIds.has(subtask.subtaskId),
  );

  let hasChanges = false;
  const nextInputs = inputs.map((input) => {
    if (input.subtaskId === null) {
      const matchIndex = unlinkedSubtasks.findIndex(
        (subtask) => subtask.content === input.value.trim(),
      );
      const [matched] =
        matchIndex === -1 ? [] : unlinkedSubtasks.splice(matchIndex, 1);
      if (!matched) return input;

      hasChanges = true;
      return {
        ...input,
        subtaskId: matched.subtaskId,
        completed: matched.completed,
      };
    }

    const serverSubtask = subtasks.find(
      (subtask) => subtask.subtaskId === input.subtaskId,
    );
    if (!serverSubtask || serverSubtask.completed === input.completed) {
      return input;
    }

    hasChanges = true;
    return { ...input, completed: serverSubtask.completed };
  });

  return hasChanges ? nextInputs : inputs;
};
