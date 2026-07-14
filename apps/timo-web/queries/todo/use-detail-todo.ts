"use client";

import { useGetTodoDetail } from "@/api/generated/endpoints/todo/todo";

export interface UseDetailTodoParams {
  todoId: number;
  date: string;
}

export const useDetailTodo = ({ todoId, date }: UseDetailTodoParams) =>
  useGetTodoDetail(todoId, { date });
