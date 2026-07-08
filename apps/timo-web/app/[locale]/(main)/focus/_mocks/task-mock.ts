import type { FocusTask } from "@/app/[locale]/(main)/focus/_types/task-type";

export const focusTaskMock: FocusTask = {
  taskId: 1,
  title: "앱잼 1차 과제 제출",
  completed: false,
  scheduledDate: new Date(2026, 6, 1),
  durationSeconds: 7200,
  isRunning: false,
  subtasks: [
    { subtaskId: 1, content: "기획서 작성하기", completed: false },
    { subtaskId: 2, content: "와이어프레임 그리기", completed: true },
  ],
  memo: "회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기회의 전까지 초안 공유하기",
};
