"use client";

import { useState } from "react";

import { TodayTodoCard } from "./_components/TodayTodoCard";

const INITIAL_SUB_TODOS = [
  { id: "1", text: "PlayButton 토글 구현", isDone: false },
  { id: "2", text: "CreateTodoToolbar 작업", isDone: true },
];

export default function TodayPage() {
  const [isDone, setIsDone] = useState(false);
  const [subTodos, setSubTodos] = useState(INITIAL_SUB_TODOS);

  const handleSubTodoCheck = (id: string) => {
    setSubTodos((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, isDone: !sub.isDone } : sub,
      ),
    );
  };

  return (
    <div className="max-w-xl p-8">
      <TodayTodoCard
        title="디자인 시스템 컴포넌트 작업"
        isDone={isDone}
        isDraggable
        toolbar={{
          date: "26.07.07",
          time: "09:00",
          priority: "urgent",
          tag: "과제",
          memo: true,
          repeat: true,
        }}
        subTodos={subTodos}
        onCheck={() => setIsDone((prev) => !prev)}
        onSubTodoCheck={handleSubTodoCheck}
      />
    </div>
  );
}
