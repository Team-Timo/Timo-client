import { Checkbox, PlayButton } from "@repo/timo-design-system/ui";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

export interface DetailTodoTaskFieldsProps {
  todo: Todo;
}

export const DetailTodoTaskFields = ({ todo }: DetailTodoTaskFieldsProps) => {
  return (
    <div className="mt-3 flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox checked={todo.completed} onChange={() => {}} />
          <p className="typo-headline-b-14 text-timo-black min-w-0 truncate">
            {todo.title}
          </p>
        </div>

        <PlayButton
          variant={todo.timerStatus === "RUNNING" ? "stop" : "play"}
          size="lg"
          disabled={todo.completed}
          onClick={() => {}}
        />
      </div>

      {todo.subtasks.length > 0 && (
        <div className="flex flex-col">
          {todo.subtasks.map((subtask) => (
            <div key={subtask.subtaskId} className="flex items-center gap-2">
              <Checkbox checked={subtask.completed} onChange={() => {}} />
              <p className="typo-body-r-12 text-timo-gray-700 min-w-0 truncate">
                {subtask.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
