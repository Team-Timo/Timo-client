interface TodoTag {
  tagId: number;
  name: string;
}

interface TodoSubtask {
  subtaskId: number;
  content: string;
  completed: boolean;
}

export interface TodoMock {
  todoId: number;
  icon: string;
  title: string;
  completed: boolean;
  date: string;
  durationSeconds: number;
  priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW";
  tag: TodoTag | null;
  hasMemo: boolean;
  isRepeated: boolean;
  timerStatus: "RUNNING" | "PAUSED" | "STOPPED";
  sortOrder: number;
  subtasks: TodoSubtask[];
}

export const todayTodoMocks: TodoMock[] = [
  {
    todoId: 1,
    icon: "ICON_1",
    title: "디자인 시스템 컴포넌트 정리하기",
    completed: false,
    date: "2026-07-09",
    durationSeconds: 36000,
    priority: "URGENT",
    tag: { tagId: 1, name: "작업" },
    hasMemo: true,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 0,
    subtasks: [
      { subtaskId: 1, content: "색상 토큰 정리", completed: true },
      { subtaskId: 2, content: "타이포그래피 스펙 문서화", completed: false },
    ],
  },
  {
    todoId: 2,
    icon: "ICON_2",
    title: "완료된 할 일 예시",
    completed: true,
    date: "2026-07-09",
    durationSeconds: 3600,
    priority: "MEDIUM",
    tag: { tagId: 2, name: "완료" },
    hasMemo: false,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 1,
    subtasks: [],
  },
  {
    todoId: 3,
    icon: "ICON_3",
    title: "서브투두 없는 단순 카드",
    completed: false,
    date: "2026-07-09",
    durationSeconds: 1800,
    priority: "HIGH",
    tag: null,
    hasMemo: true,
    isRepeated: true,
    timerStatus: "STOPPED",
    sortOrder: 2,
    subtasks: [],
  },
];
