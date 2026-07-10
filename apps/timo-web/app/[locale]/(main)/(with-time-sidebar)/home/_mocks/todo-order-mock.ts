const MOCK_LATENCY_MS = 300;

export interface ReorderTodoParams {
  todoId: number;
  newIndex: number;
}

/**
 * PATCH /todos/{todoId}/order 를 흉내내는 mock 함수.
 * 실제 API 연동 시 이 함수만 axios 클라이언트 호출로 교체하면 된다.
 */
export const patchTodoOrderMock = async ({
  todoId,
  newIndex,
}: ReorderTodoParams): Promise<ReorderTodoParams> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

  return { todoId, newIndex };
};
