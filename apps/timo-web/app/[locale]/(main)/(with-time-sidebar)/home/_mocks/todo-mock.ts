import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import {
  formatDateKey,
  getToday,
  isSameDate,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";

type TodoTemplate = Omit<Todo, "todoId">;

/** 오늘 날짜 컬럼의 세로 스크롤 동작을 시각적으로 확인하기 위한 투두 개수 */
const SCROLL_TEST_TODO_COUNT = 10;

const TODO_TEMPLATES: TodoTemplate[] = [
  {
    icon: "ICON_3",
    title: "티모 하이와프 작업하기",
    completed: false,
    durationSeconds: 7200,
    priority: "HIGH",
    tag: { tagId: 3, name: "work" },
    hasMemo: false,
    isRepeated: true,
    timerStatus: "RUNNING",
    sortOrder: 0,
    subtasks: [],
  },
  {
    icon: "ICON_1",
    title: "앱잼 1차 과제 제출",
    completed: false,
    durationSeconds: 5400,
    priority: "VERY_HIGH",
    tag: { tagId: 1, name: "assignment" },
    hasMemo: true,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 1,
    subtasks: [
      {
        subtaskId: 1,
        content: "티모 하이파이 열심히 제작하기",
        completed: false,
      },
    ],
  },
  {
    icon: "ICON_2",
    title: "운동하기",
    completed: true,
    durationSeconds: 1800,
    priority: "LOW",
    tag: { tagId: 4, name: "exercise" },
    hasMemo: false,
    isRepeated: true,
    timerStatus: "STOPPED",
    sortOrder: 2,
    subtasks: [],
  },
  {
    icon: "ICON_4",
    title: "독서 30분",
    completed: false,
    durationSeconds: 1800,
    priority: "MEDIUM",
    tag: { tagId: 5, name: "additional" },
    hasMemo: true,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 3,
    subtasks: [],
  },
  {
    icon: "ICON_5",
    title: "저녁 약속 준비",
    completed: false,
    durationSeconds: 3600,
    priority: "MEDIUM",
    tag: { tagId: 2, name: "dailyLife" },
    hasMemo: false,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 4,
    subtasks: [],
  },
];

export const getTodoMocksByDate = (date: Date): Todo[] => {
  const dateKeyDigits = formatDateKey(date).replaceAll("-", "");
  const templateCount = isSameDate(date, getToday())
    ? SCROLL_TEST_TODO_COUNT
    : (date.getDate() % TODO_TEMPLATES.length) + 1;

  return Array.from({ length: templateCount }, (_, index) => {
    // index % TODO_TEMPLATES.length는 항상 유효한 범위 내 인덱스이다
    const template = TODO_TEMPLATES[index % TODO_TEMPLATES.length]!;

    return {
      ...template,
      title:
        templateCount > TODO_TEMPLATES.length
          ? `${template.title} ${index + 1}`
          : template.title,
      sortOrder: index,
      todoId: Number(`${dateKeyDigits}${index}`),
    };
  });
};
