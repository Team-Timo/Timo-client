export type TodoPriorityTypes = "URGENT" | "HIGH" | "MEDIUM" | "LOW";
export type TodoTimerStatusTypes = "RUNNING" | "STOPPED";
export type TodoTagName =
  | "DAILY_LIFE"
  | "WORK"
  | "EXERCISE"
  | "ASSIGNMENT"
  | "ADDITIONAL";

export interface TodoTag {
  tagId: number;
  name: TodoTagName;
}

export interface TodoSubtask {
  subtaskId: number;
  content: string;
  completed: boolean;
}

export interface Todo {
  todoId: number;
  icon: string;
  title: string;
  completed: boolean;
  durationSeconds: number;
  priority: TodoPriorityTypes;
  tag: TodoTag;
  hasMemo: boolean;
  isRepeated: boolean;
  timerStatus: TodoTimerStatusTypes;
  sortOrder: number;
  subtasks: TodoSubtask[];
}
