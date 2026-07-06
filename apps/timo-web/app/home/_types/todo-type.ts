export type TodoPriority = "URGENT" | "HIGH" | "MEDIUM" | "LOW";
export type TodoTimerStatus = "RUNNING" | "STOPPED";

export interface TodoTag {
  tagId: number;
  name: string;
}

export interface Todo {
  todoId: number;
  icon: string;
  title: string;
  completed: boolean;
  durationSeconds: number;
  priority: TodoPriority;
  tag: TodoTag;
  hasMemo: boolean;
  isRepeated: boolean;
  timerStatus: TodoTimerStatus;
  sortOrder: number;
  subtaskTotalCount: number;
  subtaskCompletedCount: number;
}
