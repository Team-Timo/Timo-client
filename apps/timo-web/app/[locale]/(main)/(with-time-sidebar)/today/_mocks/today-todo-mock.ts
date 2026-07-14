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
  {
    todoId: 4,
    icon: "ICON_4",
    title: "API 연동 명세서 작성",
    completed: false,
    date: "2026-07-09",
    durationSeconds: 7200,
    priority: "HIGH",
    tag: { tagId: 3, name: "개발" },
    hasMemo: false,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 3,
    subtasks: [
      { subtaskId: 3, content: "엔드포인트 목록 정리", completed: false },
      { subtaskId: 4, content: "요청/응답 스펙 작성", completed: false },
    ],
  },
  {
    todoId: 5,
    icon: "ICON_5",
    title: "주간 회의 준비",
    completed: false,
    date: "2026-07-09",
    durationSeconds: 2700,
    priority: "MEDIUM",
    tag: { tagId: 4, name: "회의" },
    hasMemo: true,
    isRepeated: true,
    timerStatus: "STOPPED",
    sortOrder: 4,
    subtasks: [{ subtaskId: 5, content: "안건 정리", completed: true }],
  },
  {
    todoId: 6,
    icon: "ICON_6",
    title: "코드 리뷰 완료하기",
    completed: false,
    date: "2026-07-09",
    durationSeconds: 5400,
    priority: "URGENT",
    tag: { tagId: 1, name: "작업" },
    hasMemo: false,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 5,
    subtasks: [],
  },
  {
    todoId: 7,
    icon: "ICON_7",
    title: "스토리북 스토리 작성",
    completed: true,
    date: "2026-07-09",
    durationSeconds: 4500,
    priority: "LOW",
    tag: { tagId: 3, name: "개발" },
    hasMemo: false,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 6,
    subtasks: [
      { subtaskId: 6, content: "Button 스토리", completed: true },
      { subtaskId: 7, content: "Modal 스토리", completed: true },
    ],
  },
  {
    todoId: 8,
    icon: "ICON_8",
    title: "퍼포먼스 이슈 분석",
    completed: false,
    date: "2026-07-09",
    durationSeconds: 9000,
    priority: "HIGH",
    tag: { tagId: 3, name: "개발" },
    hasMemo: true,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 7,
    subtasks: [
      { subtaskId: 8, content: "Lighthouse 측정", completed: false },
      { subtaskId: 9, content: "번들 사이즈 확인", completed: false },
      { subtaskId: 10, content: "리렌더링 최적화", completed: false },
    ],
  },
];
