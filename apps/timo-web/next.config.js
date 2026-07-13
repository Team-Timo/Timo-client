/* global process */
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/timo-design-system"],
  async rewrites() {
    // next typegen 등 빌드 외 명령도 next.config.js를 로드하므로,
    // env 체크는 rewrites()가 실제로 호출될 때(빌드/서버 시작)까지 미룬다.
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl)
      throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/:path*`,
      },
      // refreshToken/sessionId 쿠키가 Path=/auth로 스코프돼 있어서,
      // 재발급 요청은 /api/v1/auth가 아닌 /auth 경로로 보내야 쿠키가 실린다.
      {
        source: "/auth/:path*",
        destination: `${apiBaseUrl}/api/v1/auth/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withSentryConfig(withNextIntl(nextConfig), {
  org: "timo-client",
  project: "timo-web",
  authToken: process.env["SENTRY_AUTH_TOKEN"],
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
});
