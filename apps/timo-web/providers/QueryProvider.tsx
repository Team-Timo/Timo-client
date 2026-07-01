"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { queryClient } from "@/api/query-client";

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(() =>
        import("@tanstack/react-query-devtools").then(
          (m) => m.ReactQueryDevtools,
        ),
      )
    : () => null;

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
