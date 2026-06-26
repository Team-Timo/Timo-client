"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <h1>문제가 발생했어요</h1>
        <p>잠시 후 다시 시도해주세요.</p>
        <button onClick={reset}>다시 시도</button>
      </body>
    </html>
  );
}
