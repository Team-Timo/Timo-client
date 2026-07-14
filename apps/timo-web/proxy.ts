import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";
const KOREA_COUNTRY_CODE = "KR";
const KOREAN_LOCALE = "ko";
const FALLBACK_LOCALE = "en";

const intlMiddleware = createMiddleware(routing);

const hasLocalePrefix = (pathname: string): boolean =>
  routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

/**
 * 로케일 쿠키가 없는 첫 방문에 한해 접속 국가(Vercel 지오 헤더)로 기본 로케일을 정한다.
 * 이미 쿠키가 있거나 URL에 로케일이 명시된 경우는 next-intl의 기본 동작을 따른다.
 */
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!request.cookies.has(LOCALE_COOKIE_NAME) && !hasLocalePrefix(pathname)) {
    const country = request.headers.get("x-vercel-ip-country");
    const geoLocale =
      country === KOREA_COUNTRY_CODE ? KOREAN_LOCALE : FALLBACK_LOCALE;
    const targetPath = pathname === "/" ? "" : pathname;

    const redirectUrl = new URL(
      `/${geoLocale}${targetPath}${request.nextUrl.search}`,
      request.url,
    );
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(LOCALE_COOKIE_NAME, geoLocale, { path: "/" });
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
