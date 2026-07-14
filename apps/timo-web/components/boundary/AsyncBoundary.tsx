import { Suspense, type ReactNode } from "react";

import {
  ErrorBoundary,
  type ErrorFallbackTypes,
} from "@/components/boundary/ErrorBoundary";

interface AsyncBoundaryProps {
  children: ReactNode;
  pendingFallback?: ReactNode;
  errorFallback?: ErrorFallbackTypes;
}

export const AsyncBoundary = ({
  children,
  pendingFallback = null,
  errorFallback,
}: AsyncBoundaryProps) => {
  const content = <Suspense fallback={pendingFallback}>{children}</Suspense>;

  if (!errorFallback) {
    return content;
  }

  return <ErrorBoundary fallback={errorFallback}>{content}</ErrorBoundary>;
};
