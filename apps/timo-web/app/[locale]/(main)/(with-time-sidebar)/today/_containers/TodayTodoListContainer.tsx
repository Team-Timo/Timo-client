"use client";

import { TodayDateHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayDateHeaderContainer";
import { TodayTodoCardContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoCardContainer";
import { useTodayTodoList } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_hooks/useTodayTodoList";
import { convertDurationToTimeText } from "@/utils/convert-duration-to-time-text";
import { formatDate } from "@/utils/date";

const PRIORITY_MAP = {
  URGENT: "VERY_HIGH",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
} as const;

export const TodayTodoListContainer = () => {
  const {
    todos,
    runningTodoId,
    handlePlay,
    handleCheck,
    handleDelete,
    handleAddTodo,
    handleSubTodoCheck,
  } = useTodayTodoList();

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="flex h-full flex-col gap-2">
      <TodayDateHeaderContainer
        completedCount={completedCount}
        totalCount={todos.length}
        onCreateTodo={handleAddTodo}
      />
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1 pb-4">
        {todos.map((todo) => (
          <TodayTodoCardContainer
            key={todo.todoId}
            title={todo.title}
            isDone={todo.completed}
            timerStatus={runningTodoId === todo.todoId ? "RUNNING" : "STOPPED"}
            toolbar={{
              date: formatDate(todo.date),
              time: convertDurationToTimeText(todo.durationSeconds),
              priority: PRIORITY_MAP[todo.priority],
              tag: todo.tag?.name,
              hasMemo: todo.hasMemo,
              hasRepeat: todo.isRepeated,
            }}
            subTodos={todo.subtasks.map((s) => ({
              id: s.subtaskId,
              text: s.content,
              isDone: s.completed,
            }))}
            onPlay={() => handlePlay(todo.todoId)}
            onCheck={() => handleCheck(todo.todoId)}
            onDelete={() => handleDelete(todo.todoId)}
            onSubTodoCheck={(id) => handleSubTodoCheck(todo.todoId, id)}
          />
        ))}
      </div>
    </div>
  );
};
