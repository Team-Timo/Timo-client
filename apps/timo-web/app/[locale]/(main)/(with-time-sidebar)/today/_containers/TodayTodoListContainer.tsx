"use client";

import { IconGraphic, TODO_ICON_VALUES } from "@repo/timo-design-system/ui";

import type { TodoIconValue } from "@repo/timo-design-system/ui";

import { TodayDateHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayDateHeaderContainer";
import { TodayTodoCardContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoCardContainer";
import { useTodayTodoList } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_hooks/useTodayTodoList";
import { useToday } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_queries/use-today";
import { DetailTodoModalContainer } from "@/containers/todo-modal/detail/DetailTodoModalContainer";
import { formatDate } from "@/utils/date/date";
import { convertDurationToTimeText } from "@/utils/duration/convert-duration-to-time-text";

const renderTodoIcon = (icon: string | undefined) => {
  if (icon == null || !(TODO_ICON_VALUES as readonly string[]).includes(icon)) {
    return undefined;
  }
  return (
    <div className="flex size-6 shrink-0 items-center justify-center">
      <IconGraphic icon={icon as TodoIconValue} />
    </div>
  );
};

export const TodayTodoListContainer = () => {
  const { data } = useToday();
  const {
    todos,
    runningTodoId,
    handlePlay,
    handleCheck,
    handleDelete,
    handleSubTodoCheck,
  } = useTodayTodoList(data.todos);

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="flex h-full flex-col gap-2">
      <TodayDateHeaderContainer
        completedCount={completedCount}
        totalCount={todos.length}
      />
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1 pb-4">
        {todos.map((todo) => (
          <DetailTodoModalContainer
            key={todo.todoId}
            todoId={todo.todoId}
            date={todo.date.slice(0, 10)}
            onTogglePlay={() => handlePlay(todo.todoId)}
            onDelete={() => handleDelete(todo.todoId)}
          >
            {(openDetailTodoModal) => (
              <TodayTodoCardContainer
                title={todo.title}
                isDone={todo.completed}
                icon={renderTodoIcon(todo.icon)}
                timerStatus={
                  runningTodoId === todo.todoId ? "RUNNING" : "STOPPED"
                }
                toolbar={{
                  date: formatDate(todo.date),
                  dateValue: new Date(todo.date),
                  time: convertDurationToTimeText(todo.durationSeconds),
                  priority: todo.priority,
                  tag: todo.tag?.name,
                  hasMemo: todo.hasMemo,
                  hasRepeat: todo.isRepeated,
                }}
                subTodos={todo.subtasks.map((s) => ({
                  id: s.subtaskId,
                  text: s.content,
                  isDone: s.completed,
                }))}
                onCardClick={openDetailTodoModal}
                onPlay={() => handlePlay(todo.todoId)}
                onCheck={() => handleCheck(todo.todoId)}
                onSubTodoCheck={(id) => handleSubTodoCheck(todo.todoId, id)}
              />
            )}
          </DetailTodoModalContainer>
        ))}
      </div>
    </div>
  );
};
