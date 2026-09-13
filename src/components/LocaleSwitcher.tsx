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
      className="rounded border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
    >
      {routing.locales.map((code) => (
        <option key={code} value={code}>
          {localeLabels[code]}
        </option>
      ))}
    </select>
  );
}
