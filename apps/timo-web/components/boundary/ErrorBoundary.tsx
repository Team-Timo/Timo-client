"use client";

import * as Sentry from "@sentry/nextjs";
import { Component } from "react";

import type { ErrorInfo, ReactNode } from "react";

export type ErrorFallbackTypes =
  | ReactNode
  | ((error: Error, reset: () => void) => ReactNode);

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ErrorFallbackTypes;
}

interface ErrorBoundaryState {
  error: Error | null;
}

const toError = (value: unknown): Error =>
  value instanceof Error ? value : new Error(String(value));

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    Sentry.captureException(toError(error), {
      contexts: { react: { componentStack: errorInfo.componentStack } },
    });
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      return typeof fallback === "function"
        ? fallback(error, this.reset)
        : fallback;
    }

    return children;
  }
}
