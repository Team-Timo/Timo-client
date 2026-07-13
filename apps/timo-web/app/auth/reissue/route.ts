import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// next.config.js의 rewrites()는 Set-Cookie 헤더가 여러 개일 때 하나로 합쳐버려서
// 브라우저가 파싱하지 못해 refreshToken/sessionId가 둘 다 유실된다.
// 이 라우트 핸들러가 직접 프록시하면서 getSetCookie()로 각각을 분리해 내려준다.
export async function POST(request: NextRequest) {
  const backendResponse = await fetch(`${apiBaseUrl}/api/v1/auth/reissue`, {
    method: "POST",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
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
