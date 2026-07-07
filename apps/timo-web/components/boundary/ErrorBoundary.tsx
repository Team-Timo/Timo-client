"use client";

import { Component } from "react";

import type { ReactNode } from "react";

type ErrorFallback =
  | ReactNode
  | ((error: Error, reset: () => void) => ReactNode);

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ErrorFallback;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
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
