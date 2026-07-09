export interface StatisticsMonthSummary {
  totalRecordMinutes: number;
  activeDayCount: number;
  averageRecordedMinutes: number;
  completedTodoCount: number;
  totalTodoCount: number;
}

export interface StatisticsDayDetail {
  date: string;
  totalRecordMinutes: number;
  todos: StatisticsTodoRecord[];
}

export interface StatisticsTodoRecord {
  todoId: number;
  title: string;
  actualTimeMinutes: number;
  estimatedTimeMinutes: number;
  tagName: string | null;
}
