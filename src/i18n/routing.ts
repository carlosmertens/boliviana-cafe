import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en", "es"],
  defaultLocale: "de",
  // First-time visitors (no NEXT_LOCALE cookie yet) always get the default
  // locale, regardless of their browser's Accept-Language — we don't want
  // to guess. Once a visitor picks a language via the switcher, next-intl
  // writes the NEXT_LOCALE cookie automatically, and src/proxy.ts reads it
  // back on their next visit.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
