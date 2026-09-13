"use client";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeLabels: Record<string, string> = {
  de: "Deutsch",
  en: "English",
  es: "Español",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(event) =>
        router.replace(pathname, { locale: event.target.value })
      }
      className="border-boliviana-navy/20 text-boliviana-navy rounded-full border bg-transparent px-3 py-1.5 text-sm font-medium"
    >
      {routing.locales.map((code) => (
        <option key={code} value={code}>
          {localeLabels[code]}
        </option>
      ))}
    </select>
  );
}
