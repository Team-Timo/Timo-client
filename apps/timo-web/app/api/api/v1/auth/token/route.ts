import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// next.config.js의 rewrites()는 백엔드가 내려주는 Set-Cookie 헤더 2개(refreshToken, sessionId)를
// 하나의 문자열로 합쳐버려서 브라우저가 파싱하지 못해 둘 다 유실된다.
// 이 라우트 핸들러가 직접 프록시하면서 getSetCookie()로 각각을 분리해 내려준다.
export async function POST(request: NextRequest) {
  const body = await request.text();

  const backendResponse = await fetch(`${apiBaseUrl}/api/v1/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const responseBody = await backendResponse.text();
  const response = new NextResponse(responseBody, {
    status: backendResponse.status,
    headers: {
      "Content-Type":
        backendResponse.headers.get("content-type") ?? "application/json",
    },
  });

  for (const cookie of backendResponse.headers.getSetCookie()) {
    response.headers.append("set-cookie", cookie);
  }

  return response;
}
