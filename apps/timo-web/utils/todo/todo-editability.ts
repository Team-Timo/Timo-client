import type { TodoDetailResponseTimerStatus } from "@/generated/models";

export const canEditTodo = (completed: boolean) => !completed;

export const canEditTodoDetails = (
  completed: boolean,
  timerStatus: TodoDetailResponseTimerStatus,
) => canEditTodo(completed) && timerStatus !== "RUNNING";
