"use client";

import { useState } from "react";

import type { ReactNode } from "react";

import {
  TodayTodoCard,
  type SubTodo,
  type TodayTodoCardToolbar,
} from "@/app/[locale]/(main)/today/_components/TodayTodoCard";

export interface TodayTodoCardContainerProps {
  title: string;
  isDone: boolean;
  subTodos: SubTodo[];
  toolbar: TodayTodoCardToolbar;
  timerStatus: "RUNNING" | "PAUSED" | "STOPPED";
  isDraggable?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
  onCheck?: () => void;
  onPlay?: () => void;
  onDelete?: () => void;
  onSubTodoCheck?: (id: string) => void;
}

export const TodayTodoCardContainer = ({
  title,
  isDone: initialIsDone,
  isDraggable = false,
  icon,
  onIconClick,
  subTodos: initialSubTodos,
  toolbar,
  timerStatus,
  onCheck,
  onPlay,
  onDelete,
  onSubTodoCheck,
}: TodayTodoCardContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(timerStatus === "RUNNING");
  const [isDone, setIsDone] = useState(initialIsDone);
  const [subTodos, setSubTodos] = useState(initialSubTodos);

  const isDimmed = isDone && !isHovered;

  const handleCheck = () => {
    const next = !isDone;
    setIsDone(next);
    if (next && isPlaying) {
      setIsPlaying(false);
      onPlay?.();
    }
    onCheck?.();
  };

  const handlePlay = () => {
    if (!isDone) {
      setIsPlaying((prev) => !prev);
      onPlay?.();
    }
  };

  const handleSubTodoCheck = (id: string) => {
    setSubTodos((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isDone: !s.isDone } : s)),
    );
    onSubTodoCheck?.(id);
  };

  return (
    <TodayTodoCard
      title={title}
      isDone={isDone}
      isDimmed={isDimmed}
      isPlaying={isPlaying}
      isDraggable={isDraggable}
      icon={icon}
      onIconClick={onIconClick}
      subTodos={subTodos}
      toolbar={toolbar}
      onCheck={handleCheck}
      onPlay={handlePlay}
      onDelete={onDelete ?? (() => {})}
      onSubTodoCheck={handleSubTodoCheck}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};
