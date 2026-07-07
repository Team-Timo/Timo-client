import type { TodayTodoCardProps } from "@/app/[locale]/(main)/today/_components/TodayTodoCard";

export const todayTodoMock: TodayTodoCardProps = {
  title: "디자인 시스템 컴포넌트 정리하기",
  isDraggable: true,
  toolbar: {
    date: "7/8",
    time: "10:00",
    priority: "urgent",
    tag: "작업",
    memo: true,
    repeat: false,
  },
  subTodos: [
    { id: "1-1", text: "색상 토큰 정리", isDone: true },
    { id: "1-2", text: "타이포그래피 스펙 문서화", isDone: false },
  ],
};

export const todayTodoMocks: (TodayTodoCardProps & { id: string })[] = [
  {
    id: "1",
    title: "디자인 시스템 컴포넌트 정리하기",
    isDraggable: true,
    toolbar: {
      date: "7/8",
      time: "10:00",
      priority: "urgent",
      tag: "작업",
      memo: true,
      repeat: false,
    },
    subTodos: [
      { id: "1-1", text: "색상 토큰 정리", isDone: true },
      { id: "1-2", text: "타이포그래피 스펙 문서화", isDone: false },
    ],
  },
  {
    id: "2",
    title: "완료된 할 일 예시",
    isDone: true,
    isDraggable: true,
    toolbar: { date: "7/8", tag: "완료" },
  },
  {
    id: "3",
    title: "서브투두 없는 단순 카드",
    toolbar: { priority: "high", memo: true },
  },
];
