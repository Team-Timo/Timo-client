import type { TodayTodoCardContainerProps } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoCardContainer";

export const todayTodoMock: TodayTodoCardContainerProps = {
  title: "티모 하이와프 작업하기",
  isDone: false,
  isDraggable: true,
  timerStatus: "RUNNING",
  toolbar: {
    date: "7/22",
    time: "2:00:00",
    priority: "urgent",
    tag: "업무",
    memo: false,
    repeat: true,
  },
  subTodos: [
    { id: "1", text: "티모 타이머 명시 제작하기", isDone: true },
    { id: "2", text: "티모 타이머 명시 제작하기", isDone: false },
  ],
};

export const todayTodoMocks: (TodayTodoCardContainerProps & { id: string })[] =
  [
    {
      id: "1",
      title: "디자인 시스템 컴포넌트 정리하기",
      isDone: false,
      isDraggable: true,
      timerStatus: "STOPPED",
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
      timerStatus: "STOPPED",
      toolbar: {
        date: "7/8",
        time: "1:00:00",
        priority: "medium",
        tag: "완료",
        memo: false,
        repeat: false,
      },
      subTodos: [],
    },
    {
      id: "3",
      title: "서브투두 없는 단순 카드",
      isDone: false,
      timerStatus: "STOPPED",
      toolbar: {
        date: "7/8",
        time: "0:30:00",
        priority: "high",
        memo: true,
        repeat: false,
      },
      subTodos: [],
    },
  ];
