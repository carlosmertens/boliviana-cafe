import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const LOCALE_COOKIE = "NEXT_LOCALE";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  // For unprefixed paths (e.g. "/"), honor a returning visitor's saved
  // language before falling back to next-intl's default-locale behavior
  // (localeDetection is off, so it would otherwise always pick "de").
  if (!hasLocalePrefix) {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    if (
      saved &&
      routing.locales.includes(saved as (typeof routing.locales)[number])
    ) {
      const url = request.nextUrl.clone();
      url.pathname = `/${saved}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
