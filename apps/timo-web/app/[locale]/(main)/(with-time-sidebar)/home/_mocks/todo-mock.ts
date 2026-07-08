import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { formatDateKey } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";

type TodoTemplate = Omit<Todo, "todoId">;

const TODO_TEMPLATES: TodoTemplate[] = [
  {
    icon: "ICON_3",
    title: "티모 하이와프 작업하기",
    completed: false,
    durationSeconds: 7200,
    priority: "HIGH",
    tag: { tagId: 3, name: "업무" },
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
    priority: "URGENT",
    tag: { tagId: 1, name: "과제" },
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
    tag: { tagId: 4, name: "운동" },
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
    tag: { tagId: 5, name: "기타" },
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
    tag: { tagId: 2, name: "일상" },
    hasMemo: false,
    isRepeated: false,
    timerStatus: "STOPPED",
    sortOrder: 4,
    subtasks: [],
  },
];

export const getTodoMocksByDate = (date: Date): Todo[] => {
  const dateKeyDigits = formatDateKey(date).replaceAll("-", "");
  const templateCount = (date.getDate() % TODO_TEMPLATES.length) + 1;

  return TODO_TEMPLATES.slice(0, templateCount).map((template, index) => ({
    ...template,
    todoId: Number(`${dateKeyDigits}${index}`),
  }));
};
