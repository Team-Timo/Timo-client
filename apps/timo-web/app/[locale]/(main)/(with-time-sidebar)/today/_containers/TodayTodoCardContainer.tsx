"use client";

import { useState } from "react";

import type { TodoTimerStatusTypes } from "@/api/common/todo-schema";
import type { ReactNode } from "react";

import {
  TodayTodoCard,
  type SubTodo,
  type TodayTodoCardToolbar,
} from "@/app/[locale]/(main)/today/_components/TodayTodoCard";

export interface TodayTodoCardContainerProps {
  title: string;
  isCompleted: boolean;
  subTodos: SubTodo[];
  toolbar: TodayTodoCardToolbar;
  timerStatus: TodoTimerStatusTypes;
  isPlayHighlighted: boolean;
  icon?: ReactNode;
  onCardClick?: () => void;
  onToggleCompleted?: (completed: boolean) => void;
  onTogglePlay?: () => void;
  onSubTodoCheck?: (id: number) => void;
}

export const TodayTodoCardContainer = ({
  title,
  isCompleted,
  icon,
  subTodos,
  toolbar,
  timerStatus,
  isPlayHighlighted,
  onCardClick,
  onToggleCompleted,
  onTogglePlay,
  onSubTodoCheck,
}: TodayTodoCardContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const isPlaying = timerStatus === "RUNNING";
  const isDimmed = isCompleted && !isHovered;

  return (
    <TodayTodoCard
      title={title}
      isDone={isCompleted}
      isDimmed={isDimmed}
      isPlaying={isPlaying}
      isPlayHighlighted={isPlayHighlighted}
      icon={icon}
      subTodos={subTodos}
      toolbar={toolbar}
      onCardClick={onCardClick}
      onCheck={() => onToggleCompleted?.(!isCompleted)}
      onPlay={() => onTogglePlay?.()}
      onSubTodoCheck={(id) => onSubTodoCheck?.(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};
