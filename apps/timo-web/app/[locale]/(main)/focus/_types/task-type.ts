export interface FocusTaskSubtask {
  subtaskId: number;
  content: string;
  completed: boolean;
}

export interface FocusTask {
  taskId: number;
  title: string;
  completed: boolean;
  scheduledDate: Date;
  durationSeconds: number;
  isRunning: boolean;
  subtasks: FocusTaskSubtask[];
  memo?: string;
}
